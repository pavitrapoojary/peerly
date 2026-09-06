// js/app.js - Main Bootstrap for Peerly MVP Prototype

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Peerly — Campus Marketplace Prototype...");
  
  // Initialize Hash Router
  Router.init();
  Router.handleRouteChange();
});
