
# Liquidity Simulator - Developer Handover & Migration Guide

**Current Status:** The code currently resides in an AI Playground environment.
**Goal:** Move the code to a local computer, set up a professional React environment, and deploy it to the web.

---

## Part 1: Prerequisites
Before starting, ensure you have these installed on your computer:
1.  **Node.js** (Version 18 or higher) - [Download Here](https://nodejs.org/)
2.  **VS Code** (Recommended Code Editor) - [Download Here](https://code.visualstudio.com/)

---

## Part 2: Setup Project Structure

1.  Create a new folder on your Desktop named `liquidity-simulator`.
2.  Open **VS Code**.
3.  Go to **File > Open Folder...** and select your new `liquidity-simulator` folder.

---

## Part 3: Create Configuration Files
Create these files in the **root** (main folder) of your project.

### 1. `package.json`
*Defines the project dependencies.*
```json
{
  "name": "liquidity-simulator",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.12.0",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.4"
  }
}
```

### 2. `vite.config.ts`
*Configures the build tool.*
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 3. `tailwind.config.js`
*Configures the Design System (Colors, Fonts).*
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          400: '#94a3b8',
          500: '#64748b',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
        },
        emerald: {
          300: '#6ee7b7',
        },
        rose: {
          300: '#f9a8d4',
          500: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'hero': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
```

### 4. `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### 6. `index.html` (Production Version)
*Note: This is different from the Preview version. It uses `/src/index.tsx`.*
```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Liquidity Position Simulator</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    </style>
  </head>
  <body class="bg-slate-950 text-slate-50">
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

---

## Part 4: Create Source Code
Create a folder named `src` in your project root. Inside `src`, create a folder named `components`.

### 1. `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #020617;
  font-family: 'Inter', sans-serif;
}
```

### 2. `src/index.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. App Files
(Copy these from the AI Chat history into the `src` folder)
*   `src/App.tsx`
*   `src/constants.ts`
*   `src/types.ts`
*   `src/components/Icon.tsx`
*   `src/components/Controls.tsx`
*   `src/components/ChartComponents.tsx`

---

## Part 5: Install & Deploy

### Install Libraries
Open the VS Code Terminal and run:
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Deploy to Vercel
1.  Push your `liquidity-simulator` folder to **GitHub**.
2.  Go to **Vercel.com**, Click "Add New Project".
3.  Import your GitHub repo.
4.  Click **Deploy**.
