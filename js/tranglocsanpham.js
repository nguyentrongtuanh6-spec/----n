window.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll("#categoryFilter button");
  const productItems = document.querySelectorAll(".product-item");
  const genderInputs = document.querySelectorAll(".gender");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const stockOnly = document.getElementById("stockOnly");
  const ratingToggle = document.getElementById("ratingToggle");
  const grid = document.getElementById("productGrid");
  const categoryPageMap = {
    "Nhẫn": "./tranglocsanpham.html",
    "Dây chuyền": "./tranglocdaychuyen.html",
    "Bông tai": "./tranglocbongtai.html",
    "Vòng tay": "./tranglocvongtay.html",
    "Charm": "./trangloccharm.html",
  };

  const defaultActiveButton = document.querySelector(
    "#categoryFilter button.active"
  );
  let activeCategory = defaultActiveButton?.dataset.category || "Nhẫn";
  let minRating = 4;

  function formatVnd(value) {
    return Number(value).toLocaleString("vi-VN") + "đ";
  }

  function selectedGenders() {
    return Array.from(genderInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function renderEmptyState(show) {
    const oldState = grid.querySelector(".no-result");
    if (oldState) {
      oldState.remove();
    }

    if (show) {
      const empty = document.createElement("p");
      empty.className = "no-result";
      empty.textContent = "Không tìm thấy sản phẩm phù hợp với bộ lọc.";
      grid.appendChild(empty);
    }
  }

  function applyFilter() {
    const genders = selectedGenders();
    const maxPrice = Number(priceRange.value);
    const onlyStock = stockOnly.checked;

    let visibleCount = 0;

    productItems.forEach((item) => {
      const category = item.dataset.category;
      const gender = item.dataset.gender;
      const rate = Number(item.dataset.rate || 0);
      const stock = Number(item.dataset.stock || 0);
      const price = Number(item.dataset.price || 0);

      const categoryOk = category === activeCategory;
      const genderOk = genders.length === 0 || genders.includes(gender);
      const rateOk = rate >= minRating;
      const stockOk = !onlyStock || stock > 0;
      const priceOk = price <= maxPrice;

      const match = categoryOk && genderOk && rateOk && stockOk && priceOk;
      item.classList.toggle("hidden", !match);

      if (match) {
        visibleCount += 1;
      }
    });

    renderEmptyState(visibleCount === 0);
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const categoryName = this.dataset.category;
      const targetPage = categoryPageMap[categoryName];

      if (targetPage) {
        const currentPath = window.location.pathname.replace(/\\/g, "/");
        const targetPath = targetPage.replace("./", "/");

        if (!currentPath.endsWith(targetPath)) {
          window.location.href = targetPage;
          return;
        }
      }

      categoryButtons.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      activeCategory = this.dataset.category;
      applyFilter();
    });
  });

  priceRange.addEventListener("input", function () {
    priceValue.textContent = formatVnd(this.value);
    applyFilter();
  });

  genderInputs.forEach((input) => {
    input.addEventListener("change", applyFilter);
  });

  stockOnly.addEventListener("change", applyFilter);

  ratingToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    minRating = this.classList.contains("active") ? 4 : 0;
    applyFilter();
  });

  document.querySelectorAll(".favorite").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      this.classList.toggle("active");
    });
  });

  ratingToggle.classList.add("active");
  applyFilter();
});
