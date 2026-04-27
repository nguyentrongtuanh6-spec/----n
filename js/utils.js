/**
 * Custom Alert & Confirmation System - Aurora
 */

window.Aurora = {
  /**
   * Show a custom alert
   * @param {string} title - Title of the alert
   * @param {string} message - Message body
   * @param {string} type - 'success', 'error', 'warning'
   * @returns {Promise} - Resolves when closed
   */
  showAlert: function(title, message, type = "success") {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "custom-alert-overlay";
      
      const iconClass = type === "success" ? "fa-check" : (type === "error" ? "fa-xmark" : "fa-exclamation");
      
      overlay.innerHTML = `
        <div class="custom-alert-box">
          <div class="alert-icon ${type}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <div class="alert-title">${title}</div>
          <div class="alert-message">${message}</div>
          <div class="alert-buttons">
            <button class="btn-alert btn-alert-confirm">Đóng</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      
      const closeBtn = overlay.querySelector(".btn-alert-confirm");
      closeBtn.focus();
      
      const close = () => {
        overlay.style.opacity = "0";
        overlay.querySelector(".custom-alert-box").style.transform = "translateY(20px) scale(0.9)";
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
          resolve();
        }, 300);
      };
      
      closeBtn.addEventListener("click", close);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });
    });
  },

  /**
   * Show a custom confirmation dialog
   * @param {string} title - Title
   * @param {string} message - Message
   * @param {string} confirmText - Text for confirm button
   * @param {string} cancelText - Text for cancel button
   * @returns {Promise<boolean>} - Resolves to true if confirmed, false otherwise
   */
  showConfirm: function(title, message, confirmText = "Xác nhận", cancelText = "Hủy") {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "custom-alert-overlay";
      
      overlay.innerHTML = `
        <div class="custom-alert-box">
          <div class="alert-icon warning">
            <i class="fa-solid fa-question"></i>
          </div>
          <div class="alert-title">${title}</div>
          <div class="alert-message">${message}</div>
          <div class="alert-buttons">
            <button class="btn-alert btn-alert-cancel">${cancelText}</button>
            <button class="btn-alert btn-alert-confirm">${confirmText}</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      
      const confirmBtn = overlay.querySelector(".btn-alert-confirm");
      const cancelBtn = overlay.querySelector(".btn-alert-cancel");
      confirmBtn.focus();
      
      const close = (result) => {
        overlay.style.opacity = "0";
        overlay.querySelector(".custom-alert-box").style.transform = "translateY(20px) scale(0.9)";
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
          resolve(result);
        }, 300);
      };
      
      confirmBtn.addEventListener("click", () => close(true));
      cancelBtn.addEventListener("click", () => close(false));
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close(false);
      });
    });
  }
};
