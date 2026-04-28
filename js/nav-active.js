window.addEventListener("DOMContentLoaded", function () {
  var userIconLink = document.querySelector('.header-icons a[title*="i kho"]');
  if (userIconLink) {
    var isLogged = localStorage.getItem("auroraUser");
    userIconLink.setAttribute(
      "href",
      isLogged ? "./trangcanhan.html" : "./trangdangnhap.html"
    );
  }

  var navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  if (!navLinks.length) return;

  var currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  var currentFile = currentPath.split("/").pop() || "";

  navLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  var exactMatch = navLinks.find(function (link) {
    var href = (link.getAttribute("href") || "").toLowerCase();
    return currentFile && href.endsWith(currentFile);
  });

  if (exactMatch) {
    exactMatch.classList.add("active");
    return;
  }

  var pageToMenu = {
    "tranglocnhannam.html": "nhẫn",
    "tranglocnhannu.html": "nhẫn",
    "tranglocdaychuyen.html": "dây chuyền",
    "tranglocbongtai.html": "bông tai",
    "tranglocvongtay.html": "vòng tay",
    "trangloccharm.html": "charm",
    "tranggioithieu.html": "giới thiệu",
    "trangsucbo.html": "trang sức bộ",
    "trangsucdoi.html": "trang sức đôi"
  };

  var targetMenuText = pageToMenu[currentFile];
  if (!targetMenuText) return;

  navLinks.forEach(function (link) {
    var label = (link.textContent || "").trim().toLowerCase();
    if (label === targetMenuText) {
      link.classList.add("active");
    }
  });

  // --- QUẢN LÝ GIỎ HÀNG (GLOBAL UPDATE) ---
});
