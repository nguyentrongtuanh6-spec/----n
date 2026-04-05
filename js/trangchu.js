window.addEventListener("DOMContentLoaded", function () {
  const welcomeBar = document.getElementById("welcomeBar");
  if (!welcomeBar) {
    return;
  }

  const userRaw = localStorage.getItem("auroraUser");
  const accessMode = sessionStorage.getItem("auroraAccess");

  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      if (user.fullName) {
        welcomeBar.textContent =
          "Xin chào " +
          user.fullName +
          "! Khám phá các mẫu trang sức mới hôm nay.";
      }
    } catch (error) {
      welcomeBar.textContent = "Xin chào! Chúc bạn mua sắm vui vẻ tại AURORA.";
    }
  } else if (accessMode === "guest") {
    welcomeBar.textContent =
      "Bạn đang xem với vai trò khách. Vẫn có thể khám phá toàn bộ sản phẩm tại AURORA.";
  }
});
