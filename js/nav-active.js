window.addEventListener("DOMContentLoaded", function () {
  const userIconLink = document.querySelector('a[title="Tài khoản"]');
  if (userIconLink) {
    const isLogged = localStorage.getItem("auroraUser");
    if (isLogged) {
      userIconLink.setAttribute("href", "./trangcanhan.html");
    } else {
      userIconLink.setAttribute("href", "./trangdangnhap.html");
    }
  }

  const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  if (!navLinks.length) return;

  const currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  const currentFile = currentPath.split("/").pop() || "";

  const pageToMenu = {
    "tranglocnhannam.html": "nhẫn",
    "tranglocnhannu.html": "nhẫn",
    "tranglocdaychuyen.html": "dây chuyền",
    "tranglocbongtai.html": "bông tai",
    "tranglocvongtay.html": "vòng tay",
    "trangloccharm.html": "charm",
    "tranggioithieu.html": "giới thiệu",
    "lienhe.html": "liên hệ",
  };

  const targetMenuText = pageToMenu[currentFile];
  if (!targetMenuText) return;

  navLinks.forEach(function (link) {
    const label = (link.textContent || "").trim().toLowerCase();
    if (label === targetMenuText) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
