# Codebase Overview - SDO Alangilan Website

This document provides a comprehensive overview of the **SDO Alangilan** codebase. It outlines the project's layout, key modules, routing mechanism, styling setup, and notes several critical bugs that should be resolved to ensure the application functions correctly and builds reliably.

---

## Directory Structure

Here is a high-level map of the codebase:

```
sdo-website/
├── public/                  # Static assets served at the root path
├── src/                     # Main source code
│   ├── assets/              # Images (e.g., logo.jpg, heroimage.jpg)
│   ├── components/          # Reusable UI components
│   │   ├── ContactForm/     # ContactForm component and logic
│   │   ├── Footer/          # Footer component and styles
│   │   └── Navbar/          # Navbar component and styles
│   ├── layout/              # Layout templates (MainLayout)
│   ├── pages/               # Page components stacked on the main landing page
│   │   ├── About.jsx        # About Section
│   │   ├── Contact.jsx      # Contact Section & Form modal launcher
│   │   ├── Home.jsx         # Hero Section
│   │   ├── Initiatives.jsx  # Initiatives Section
│   │   └── SDG.jsx          # Sustainable Development Goals Section
│   ├── App.css              # Main tailwind imports
│   ├── App.jsx              # Routing definition
│   ├── index.css            # Base stylesheet (currently empty)
│   └── main.jsx             # React application entry point
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite bundler configuration
└── README.md                # General info boilerplate
```

---

## Technical Stack & Configuration

1. **Frontend Library**: React 19 (`react` & `react-dom` version `^19.2.6`).
2. **Routing**: React Router DOM v7 (`^7.16.0`) using `createBrowserRouter` and `RouterProvider`.
3. **Styling**: Tailwind CSS v4 (`^4.3.0`) integrated via `@tailwindcss/vite`.
   - Tailwind is imported in [App.css](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/App.css) using `@import "tailwindcss";`.
   - Global stylesheet [index.css](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/index.css) and component CSS files are currently blank.
4. **Bundler**: Vite v8 (`^8.0.12`) with the new Tailwind compiler plugin.

---

## Architecture & Layout Flow

The application is structured as a **Single Page Application (SPA) Landing Page**:
- **Router Configuration**: Defined in [App.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/App.jsx). It defines a single parent route `/` that renders [MainLayout.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/layout/MainLayout.jsx).
- **Layout Stacking**: Under `MainLayout`, the `<Outlet />` renders the index page children:
  1. `<Home />` (Hero Section)
  2. `<About />` (Core Mission Section)
  3. `<SDG />` (UN Sustainable Development Goals Section)
  4. `<Initiatives />` (Local Actions Section)
  5. `<Contact />` (Call-to-action & Form Section)
- **Navigation**: The [Navbar.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/Navbar/Navbar.jsx) provides hash anchors (`#home`, `#about`, `#sdgs`, `#initiatives`, `#contact`) to scroll to each section on the single landing page.

---

## Identified Bugs & Code Improvements

During codebase exploration, the following issues were identified:

### 1. React Child-Function Bug in Navbar Link
- **File**: [Navbar.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/Navbar/Navbar.jsx#L37-L45)
- **Issue**: 
  Inside the desktop navigation mapping:
  ```javascript
  <a
    key={item.name}
    href={item.path}
    className="..."
  >
    {item.name}
    {({ isActive }) => (
      <>
        {item.name}
        {/* Active Underline Effect */}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B5E20] rounded-full" />
        )}
      </>
    )}
  </a>
  ```
  Standard HTML `<a>` tags in React do not support a callback function as a child. This will render the function string directly onto the page, breaking visual design or causing react warnings/errors.
- **Fix**: Replace the children function or use `NavLink` from `react-router-dom` with the `end` property if state tracking is desired.

### 2. Invalid Input Event Handler in Contact Form
- **File**: [ContactForm.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/ContactForm/ContactForm.jsx#L13)
- **Issue**:
  ```javascript
  const handleChange = (e) => {
    const { name, value } = e.value;
    ...
  ```
  In React standard form events, the input element values are located in `e.target` rather than `e.value`. Trying to destructure `e.value` (which is `undefined`) will throw a runtime error (`TypeError: Cannot read properties of undefined (reading 'name')`) whenever a user types into any form input.
- **Fix**: Change it to `const { name, value } = e.target;`.

### 3. Missing / Incorrect Key in Initiatives Map
- **File**: [Initiatives.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/pages/Initiatives.jsx#L33-L34)
- **Issue**:
  ```javascript
  {acts.map((acts) => (
    <div key={acts.id} className="flex flex-col">
  ```
  - The map callback parameter `acts` shadows the outer array variable `acts`, which can lead to readability issues.
  - The item object has no `.id` property (only `category`, `title`, `description`, `badgeColor`). Therefore, `key={acts.id}` evaluates to `key={undefined}`.
- **Fix**: Rename the parameter to `act` and use a unique property or key index (e.g. `key={act.title}`).

### 4. Windows-style Backslashes in Asset Paths
- **File**: [Navbar.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/Navbar/Navbar.jsx#L21) and [Footer.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/Footer/Footer.jsx#L22)
- **Issue**:
  The image tags specify: `src="src\assets\logo.jpg"`. Backslashes may work on Windows filesystems but can break when hosted in standard web/unix-like environments or in some browsers.
- **Fix**: Use forward slashes `src/assets/logo.jpg` or import the asset directly.

### 5. Duplicate `src` Attributes in Footer
- **File**: [Footer.jsx](file:///c:/Users/HP%20LAPTOP%2015s/sdo-website/src/components/Footer/Footer.jsx#L20-L24)
- **Issue**:
  ```javascript
  <img
    className="h-10 w-10 rounded-[50%]"
    src="src\assets\logo.jpg"
    src={logo}
  ></img>
  ```
  The `img` tag specifies `src` twice.
- **Fix**: Remove `src="src\assets\logo.jpg"` and keep only `src={logo}` which properly references the imported logo file.
