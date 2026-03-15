 # project overview

This is the frontend interface for a next-generation Supply Chain & Logistics Optimization Platform. Specifically designed for the industrial landscape of Tamil Nadu, this platform addresses visibility gaps in the automotive belt (Oragadam/Sriperumbudur) and optimizes port-to-warehouse logistics for Chennai and Ennore Ports.

 # Technical Stack
1. Core Framework
React 18.3.1 - Main UI framework
TypeScript - For type-safe code (.tsx files)
Vite 6.3.5 - Build tool and dev server (fast modern bundler)

2. Routing
React Router 7.13.0 - Client-side routing with Data mode pattern
Separate routes for driver (/driver/*) and admin (/admin/*) interfaces

3. Styling
Tailwind CSS 4.1.12 - Utility-first CSS framework
@tailwindcss/vite - Vite plugin for Tailwind v4
Custom CSS variables in /src/styles/theme.css for design tokens

4. UI Component Libraries
Radix UI - Headless accessible components (accordion, dialog, dropdown, etc.)
Material UI (@mui/material) - Additional component library
Lucide React - Icon library
Vaul - Drawer component
Sonner - Toast notifications

5. Additional Libraries
react-hook-form - Form state management
Recharts - Charts and data visualization
Motion (formerly Framer Motion) - Animations
date-fns - Date manipulation
canvas-confetti - Celebration effects
react-dnd - Drag and drop
clsx & tailwind-merge - Conditional class names

 # Key Features Implemented

1. Real-Time Port-to-Warehouse Tracker
Live Dashboard: Visual representation of container movement from DP World / Chennai Port Trust to inland warehouses.

IoT Integration UI: Displays live telemetry data (GPS, humidity, and temperature) for high-value automotive components.

2. Inventory Health Index (IHI) Visualization
Predictive Alerts: Dynamic UI cards that change color (Green/Amber/Red) based on predicted stock-outs.

Warehouse Digital Twin: A 2D/3D layout visualization of pallet positions and AMR (Autonomous Mobile Robot) status.

3. Last-Mile Delivery Orchestration
Route Map: Integrated Map interface showing optimized paths for EV fleets, avoiding Chennai’s MTC traffic bottlenecks.

Geofencing Status: Visual indicators for when a shipment enters a designated industrial zone.

# Mobile Experience
The frontend is fully responsive and optimized for mobile viewing (as designed in Figma).

Offline-Ready UI: Includes indicators for Offline Geotagging capabilities, allowing field agents at the Ennore Port to log data without active internet.

Haptic Feedback: Interactive buttons designed for rugged industrial tablets and handheld scanners.




  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
