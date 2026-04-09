document.addEventListener("DOMContentLoaded", () => {
  const updatedTime = document.getElementById("updatedTime");
  if (updatedTime) {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    updatedTime.textContent = `Dữ liệu kinh doanh cập nhật đến ${hh}:${mm} hôm nay.`;
  }

  const donut = document.querySelector(".donut");
  if (donut) {
    const percent = Number(donut.dataset.percent || "75");
    const normalized = Math.max(0, Math.min(100, percent));
    donut.style.setProperty("--p", `${normalized}`);
  }
});
