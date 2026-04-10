document.addEventListener("DOMContentLoaded", function () {
  const updatedTime = document.getElementById("updatedTime");
  const searchInput = document.querySelector('header input[type="text"]');
  const tableRows = Array.from(document.querySelectorAll("tbody tr"));
  const periodButton = document.getElementById("periodBtn");
  const periodLabel = document.getElementById("periodLabel");

  const periods = ["7 Ngày qua", "15 Ngày qua", "30 Ngày qua"];
  let periodIndex = 1;

  function updateClockLabel() {
    if (!updatedTime) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    updatedTime.textContent = `Dữ liệu kinh doanh cập nhật đến ${hh}:${mm} hôm nay.`;
  }

  function filterTable(keyword) {
    tableRows.forEach((row) => {
      const rowText = (row.textContent || "").toLowerCase();
      row.style.display = rowText.includes(keyword) ? "" : "none";
    });
  }

  updateClockLabel();

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      const keyword = event.target.value.trim().toLowerCase();
      filterTable(keyword);
    });
  }

  if (periodButton && periodLabel) {
    periodButton.addEventListener("click", function () {
      periodIndex = (periodIndex + 1) % periods.length;
      periodLabel.textContent = periods[periodIndex];

      alert(`Đã chuyển bộ lọc thời gian: ${periods[periodIndex]}`);
    });
  }

  const ctaButton = Array.from(document.querySelectorAll("button")).find(
    (item) => item.textContent.includes("Tạo sản phẩm mới"),
  );
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      window.location.href = "./trangchitiet.html";
    });
  }

  const logoutLink = Array.from(document.querySelectorAll("a")).find((item) =>
    item.textContent.includes("Đăng xuất"),
  );
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      const confirmed = confirm("Bạn muốn đăng xuất khỏi trang quản trị?");
      if (confirmed) {
        window.location.href = "./trangdangnhap.html";
      }
    });
  }
});
