window.addEventListener("DOMContentLoaded", function () {
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
