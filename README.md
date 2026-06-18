# finance-tracker

A modern and responsive Expense Tracker web application that helps users manage their personal finances by tracking income and expenses in real-time. Built using HTML, CSS, and JavaScript with Local Storage support for persistent data.

![HTML](https://img.shields.io/badge/HTML5-Structure-orange)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow)

---

## 📌 Overview

Expense Tracker is a lightweight personal finance management application that enables users to:

* Add income and expense transactions
* Categorize transactions
* View real-time balance updates
* Monitor total income and expenses
* Store transaction history locally
* Delete unwanted transactions
* Access data even after page refresh using Local Storage

---

## ✨ Features

### Financial Management

* Add Income Transactions
* Add Expense Transactions
* Automatic Balance Calculation
* Income & Expense Summary

### Transaction Organization

* Categorized Transactions
* Transaction History Timeline
* Date Tracking
* Emoji-Based Categories

### Modern User Interface

* Responsive Design
* Glassmorphism UI
* Smooth Animations
* Interactive Buttons
* Mobile-Friendly Layout

### Data Persistence

* Local Storage Integration
* Data Retention After Refresh
* No Backend Required

### User Experience

* Toast Notifications
* Keyboard Support (Enter Key Submission)
* Form Validation
* Delete Transaction Animation
* Dynamic Balance Updates

---

## 🛠️ Technologies Used

- HTML5 
- CSS3 
- JavaScript (ES6)
- Local Storage API

---

## 📁 Project Structure

```bash
Expense-Tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Application Workflow

### Add Transaction

1. Select Income or Expense
2. Enter Description
3. Enter Amount
4. Select Category
5. Click Add Transaction

### Automatic Updates

* Balance updates instantly
* Income total recalculates
* Expense total recalculates
* Transaction list refreshes automatically

---

## Data Storage

This application uses the browser's Local Storage API.

Stored data includes:

```javascript
{
  id: "unique-id",
  type: "income/expense",
  desc: " ",
  amount:  ,
  category: " ",
  date: " "
}
```

Data remains available until manually cleared from the browser.

---

## Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

## Future Enhancements

* Monthly Reports
* Expense Charts & Graphs
* Export to PDF, Excel
* Search & Filter Transactions
* Budget Planning Module
* User Authentication
* Cloud Data Sync
* Dark/Light Theme Toggle

---


## Getting Started

1. Clone the Repository

```bash
git clone https://github.com/fahique-malma/finance-tracker.git
```

2. Navigate to Project Folder

```bash
cd finance-tracker
```

3. Open the Application

Open `index.html` in your browser.

---

## 👨‍💻 Author

**Mohammed Fahique**
Software Engineer | Frontend Developer 

### ⭐ If you found this project useful, please give it a Star on GitHub!
