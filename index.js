import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app/app.jsx";


const container = document.getElementById('assemble-giving-app');
const root = createRoot(container);
console.log("Assemble Giving 1.0")

root.render(<App />);