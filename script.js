let transactions = JSON.parse(localStorage.getItem("txs") || "[]");
let currentType = "income";

const catIcons = {
  "default-income": "💚",
  "default-expense": "🔴",
};

function setType(type) {
  currentType = type;
  const incBtn = document.getElementById("btn-income");
  const expBtn = document.getElementById("btn-expense");
  const subBtn = document.getElementById("submit-btn");

  if (type === "income") {
    incBtn.className = "toggle-btn active-income";
    expBtn.className = "toggle-btn";
    subBtn.className = "submit-btn income-btn";
    subBtn.textContent = "+ Add Income";
  } else {
    incBtn.className = "toggle-btn";
    expBtn.className = "toggle-btn active-expense";
    subBtn.className = "submit-btn expense-btn";
    subBtn.textContent = "− Add Expense";
  }
}

function formatCurrency(n) {
  return (
    "₹" +
    Math.abs(n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function updateSummary() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const balEl = document.getElementById("balance");
  balEl.textContent = (balance < 0 ? "-" : "") + formatCurrency(balance);
  balEl.style.color = balance < 0 ? "var(--expense)" : "#fff";
  balEl.classList.remove("bump");
  void balEl.offsetWidth;
  balEl.classList.add("bump");

  document.getElementById("income-total").textContent = formatCurrency(income);
  document.getElementById("expense-total").textContent =
    formatCurrency(expense);

  const count = transactions.length;
  document.getElementById("tx-count").textContent =
    count + (count === 1 ? " entry" : " entries");
}

function renderList() {
  const list = document.getElementById("tx-list");
  if (transactions.length === 0) {
    list.innerHTML = `<div class="empty-state">
        <div class="empty-icon">💸</div>
        <div class="empty-text">No transactions yet.<br>Add your first one!</div>
      </div>`;
    return;
  }

  list.innerHTML = [...transactions]
    .reverse()
    .map(
      (tx) => `
      <div class="tx-item" id="tx-${tx.id}">
        <div class="tx-stripe ${tx.type === "income" ? "inc" : "exp"}"></div>
        <div class="tx-icon ${tx.type === "income" ? "inc" : "exp"}">${getCatEmoji(tx.category, tx.type)}</div>
        <div class="tx-info">
          <div class="tx-name">${escHtml(tx.desc)}</div>
          <div class="tx-date">${tx.category ? escHtml(tx.category.replace(/^.*?\s/, "")) + " · " : ""}${formatDate(tx.date)}</div>
        </div>
        <div class="tx-amount ${tx.type === "income" ? "inc" : "exp"}">
          ${tx.type === "income" ? "+" : "−"}${formatCurrency(tx.amount)}
        </div>
        <button class="tx-delete" onclick="deleteTransaction('${tx.id}')" title="Delete">✕</button>
      </div>
    `,
    )
    .join("");
}

function getCatEmoji(cat, type) {
  if (!cat) return type === "income" ? "💚" : "💸";
  const match = cat.match(/^(\S+)/);
  return match ? match[1] : type === "income" ? "💚" : "💸";
}

function escHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function addTransaction() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const cat = document.getElementById("category").value;

  if (!desc) {
    showToast("⚠️ Please enter a description.");
    shake("desc");
    return;
  }
  if (!amount || amount <= 0) {
    showToast("⚠️ Enter a valid amount.");
    shake("amount");
    return;
  }

  transactions.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type: currentType,
    desc,
    amount,
    category: cat,
    date: new Date().toISOString(),
  });

  save();
  updateSummary();
  renderList();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";

  showToast(
    currentType === "income" ? "✅ Income added!" : "✅ Expense added!",
  );
}

function deleteTransaction(id) {
  const el = document.getElementById("tx-" + id);
  if (el) {
    el.classList.add("removing");
    setTimeout(() => {
      transactions = transactions.filter((t) => t.id !== id);
      save();
      updateSummary();
      renderList();
    }, 300);
  }
}

function save() {
  localStorage.setItem("txs", JSON.stringify(transactions));
}

function shake(id) {
  const el = document.getElementById(id);
  el.style.animation = "none";
  void el.offsetWidth;
  el.style.animation = "shake 0.4s ease";
}

const style = document.createElement("style");
style.textContent = `@keyframes shake {
    0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}
  }`;
document.head.appendChild(style);

let toastTimer;
function showToast(msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  clearTimeout(toastTimer);

  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);

  toastTimer = setTimeout(() => {
    t.classList.add("hide");
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    (document.activeElement.id === "desc" ||
      document.activeElement.id === "amount")
  ) {
    addTransaction();
  }
});

updateSummary();
renderList();