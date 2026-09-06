// js/components/toast.js - Toast Notification Utility

const Toast = {
  show(message, type = "info", duration = 3500) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconHtml = Icons.info(18, "#FFFFFF");
    if (type === "success") iconHtml = Icons.checkCircle(18, "#2DBFA0");
    else if (type === "warning") iconHtml = Icons.alertCircle(18, "#F5A742");

    toast.innerHTML = `
      <span style="display:flex;align-items:center;">${iconHtml}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "all 0.3s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  },

  success(msg, duration) {
    this.show(msg, "success", duration);
  },

  info(msg, duration) {
    this.show(msg, "info", duration);
  },

  warning(msg, duration) {
    this.show(msg, "warning", duration);
  }
};
