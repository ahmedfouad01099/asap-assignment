# StockSync Pro: ASAP Assignment

A high-performance **React Native** inventory & CRM application powered by **SQLite**. Optimized for clean architecture (SoC), real-time persistence, and premium UI.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (>=20) & Yarn
- CocoaPods (for iOS)

### 2. Installation
```sh
yarn install
cd ios && pod install && cd ..
```

### 3. Run Application
```sh
# Start Metro
yarn start

# Run on Device/Simulator
yarn ios 
# OR
yarn android
```

---

## 🔑 Interviewer Credentials
The login screen is **pre-filled** for your convenience. Simply tap **"Login to Dashboard"** to enter.
- **Email:** `admin@asap.com`
- **Password:** `password123`

---

## ✨ The "Happy Flow" (Walkthrough)
To see the full power of the app's integration, follow this flow:

1.  **Dashboard**: View real-time stats (Items, Invoices, Customers) fetched directly from SQLite.
2.  **Add Item**: Go to **Items Tab** → **Add Item**. Create a product (e.g., "iPhone 15") with a quantity of **50**.
3.  **Create Sale**: Go to the **Sales Tab** → **(+) Add Invoice**. 
    - Select a Customer.
    - Add your new "iPhone 15".
    - Complete the sale.
4.  **Auto-Stock Update**: Return to **Items Tab** → **Inventory**. 
    - You will see the stock has **automatically decremented** (e.g., from 50 to 49).
    - Status badges (Healthy/Low/Out) update instantly based on the new count.
5.  **Themes**: Toggle between Light and Dark mode to see the dynamic design system.

---

## 🏛️ Architecture & Tech Stack
- **Architecture**: Strict **Separation of Concerns (SoC)**. Every screen uses a dedicated custom hook (e.g., `useInventory`, `useCreateSaleInvoice`) to decouple business logic from UI.
- **Database**: `react-native-sqlite-storage` with a relational schema (Categories, Items, Customers, Invoices).
- **Navigation**: React Navigation (Native Stack + Bottom Tabs).
- **State**: React Context API + Custom Database Hooks.
