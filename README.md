# Liquidity Position Simulator

A professional DeFi simulation dashboard built with **React**, **Tailwind CSS**, and **Recharts**. This application simulates Uniswap V3 concentrated liquidity positions, allowing users to estimate fees, visualize price ranges, and analyze liquidity distribution.

## Features
*   **Interactive Price Charts:** Area charts with dynamic Y-axis scaling and gradient fills.
*   **Liquidity Density:** Bar charts showing liquidity distribution curves.
*   **Strategy Controls:** Quick-select buttons (Narrow, Balanced, Wide) and percentage adjusters.
*   **Fee Estimation:** Project returns based on historical data backtesting.
*   **Production Design:** Strictly typed "Slate & Amber" design system for a premium dark-mode feel.

## Tech Stack
*   **Frontend:** React 18 (Vite)
*   **Styling:** Tailwind CSS (Class-based, Custom Config)
*   **Visualization:** Recharts
*   **Icons:** Lucide React + Custom SVGs

## Quick Start (Developers)

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Project Structure
*   `src/App.tsx`: Main application logic and state management.
*   `src/components/`: Reusable UI components (Charts, Controls, Icons).
*   `src/constants.ts`: Mock data generators (Price history, Volume, Liquidity curves).
*   `src/types.ts`: TypeScript interfaces.

## Design System
The app uses a specific color palette defined in `tailwind.config.js`.
*   **Backgrounds:** `slate-950` (Main), `slate-900` (Cards)
*   **Primary Accent:** `amber-400`
*   **Secondary Accent:** `emerald-300` (for "Active/Positive" states)
*   **Typography:** Inter font family

## Deployment
This project is optimized for deployment on **Vercel**.
1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Vite build settings are auto-detected.
