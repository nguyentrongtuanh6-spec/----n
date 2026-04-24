window.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("categoryList");
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPriceLabel");
  const ratingButtons = document.querySelectorAll(".rating-btn");
  const genderInputs = document.querySelectorAll("input[name='gender']");
  const inStockOnlyInput = document.getElementById("inStockOnly");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const grid = document.getElementById("filterProductGrid");
  const resultCount = document.getElementById("resultCount");
  const filterTitle = document.getElementById("filterTitle");
  const paginationWrap = document.getElementById("paginationWrap");

  const pageRoutes = { ring: "./tranglocnhannam.html", necklace: "./tranglocdaychuyen.html", earring: "./tranglocbongtai.html", bracelet: "./tranglocvongtay.html", charm: "./trangloccharm.html" };

  const products = [
    { id: 1101, detailId: 1, name: "Charm bạc nữ hình ngôi sao", image: "../ảnh/Ảnh chụp màn hình/1.png", price: "320.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 1 },
    { id: 1102, detailId: 2, name: "Charm nam mặt khiên cá tính", image: "../ảnh/Ảnh chụp màn hình/54.png", price: "410.000đ", gender: "Nam", rating: 4.2, inStock: true, order: 2 },
    { id: 1103, detailId: 3, name: "Charm nữ cánh bướm đá hồng", image: "../ảnh/Ảnh chụp màn hình/14.png", price: "365.000đ", gender: "Nữ", rating: 4.4, inStock: true, order: 3 },
    { id: 1104, detailId: 4, name: "Charm nam hình lưỡi neo", image: "../ảnh/Ảnh chụp màn hình/55.png", price: "450.000đ", gender: "Nam", rating: 4.3, inStock: true, discount: "-2%", order: 4 },
    { id: 1105, detailId: 5, name: "Charm nữ trái tim đôi AURORA", image: "../ảnh/Ảnh chụp màn hình/56.png", price: "390.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 5 },
    { id: 1106, detailId: 6, name: "Charm nam mặt đá xanh", image: "../ảnh/Ảnh chụp màn hình/58.png", price: "520.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 6 },
    { id: 1107, detailId: 7, name: "Charm nữ hoa tuyết", image: "../ảnh/Ảnh chụp màn hình/15.png", price: "340.000đ", gender: "Nữ", rating: 4.1, inStock: true, order: 7 },
    { id: 1108, detailId: 1, name: "Charm nam biểu tượng la bàn", image: "../ảnh/Ảnh chụp màn hình/7.png", price: "480.000đ", gender: "Nam", rating: 4.4, inStock: true, order: 8 },
    { id: 1109, detailId: 2, name: "Charm nữ pha lê trong suốt", image: "../ảnh/Ảnh chụp màn hình/3.png", price: "365.000đ", gender: "Nữ", rating: 4.2, inStock: true, discount: "-6%", order: 9 },
    { id: 1110, detailId: 3, name: "Charm nam chữ cái bạc", image: "../ảnh/Ảnh chụp màn hình/59.png", price: "300.000đ", gender: "Nam", rating: 4.0, inStock: true, order: 10 },
    { id: 1111, detailId: 4, name: "Charm nữ giọt lệ xanh", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "430.000đ", gender: "Nữ", rating: 4.3, inStock: true, order: 11 },
    { id: 1112, detailId: 5, name: "Charm nam cổ điển viền nổi", image: "../ảnh/Ảnh chụp màn hình/10.png", price: "470.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 12 }
  ];

  const state = { maxPrice: Number(priceRange?.value || 100000000), minRating: 0, inStockOnly: inStockOnlyInput?.checked ?? true, selectedGender: null, searchKeyword: "", sort: sortSelect?.value || "popular", page: 1, pageSize: 12 };

  function parsePrice(priceText) { return Number(String(priceText).replace(/[^\d]/g, "")); }
  function formatPrice(value) { return new Intl.NumberFormat("vi-VN").format(value) + "đ"; }
  function syncGenderSelection(activeValue) { genderInputs.forEach(function (input) { input.checked = input.value === activeValue; }); state.selectedGender = activeValue || null; }
  function isWishlisted(productId) { return window.AuroraDB ? window.AuroraDB.isWishlisted(productId) : false; }
  function initCategoryButtons() { (categoryList?.querySelectorAll(".male-category-btn") || []).forEach(function (button) { button.addEventListener("click", function () { const target = pageRoutes[this.dataset.category || "charm"]; if (target) window.location.href = target; }); }); }

  function applyFilterAndSort() {
    let filtered = products.filter(function (product) {
      const byPrice = parsePrice(product.price) <= state.maxPrice;
      const byStock = !state.inStockOnly || product.inStock;
      const byGender = !state.selectedGender || product.gender === state.selectedGender;
      const byRating = product.rating >= state.minRating;
      const byKeyword = product.name.toLowerCase().includes(state.searchKeyword.toLowerCase().trim());
      return byPrice && byStock && byGender && byRating && byKeyword;
    });
    if (state.sort === "priceAsc") filtered.sort(function (a, b) { return parsePrice(a.price) - parsePrice(b.price); });
    else if (state.sort === "priceDesc") filtered.sort(function (a, b) { return parsePrice(b.price) - parsePrice(a.price); });
    else filtered.sort(function (a, b) { return a.order - b.order; });
    return filtered;
  }

  function renderPagination(totalItems) {
    if (!paginationWrap) return;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    let html = `<span data-page="${Math.max(1, state.page - 1)}">‹</span>`;
    for (let page = 1; page <= totalPages; page += 1) html += `<span class="${page === state.page ? "active" : ""}" data-page="${page}">${page}</span>`;
    html += `<span data-page="${Math.min(totalPages, state.page + 1)}">›</span>`;
    paginationWrap.innerHTML = html;
    paginationWrap.querySelectorAll("span[data-page]").forEach(function (button) { button.addEventListener("click", function () { state.page = Number(this.dataset.page || 1); render(); }); });
  }

  function bindWishlistButtons() {
    if (!grid) return;
    grid.querySelectorAll(".wishlist-mini").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!window.AuroraDB) return;
        const added = window.AuroraDB.toggleWishlist(this.dataset.id);
        this.classList.toggle("active", added);
        const icon = this.querySelector("i");
        if (!icon) return;
        icon.classList.toggle("fa-solid", added);
        icon.classList.toggle("fa-regular", !added);
      });
    });
  }

  function ensureMinimumDisplayItems(items) {
    if (!items.length || items.length >= 9) return items;

    const displayItems = [...items];
    let index = 0;

    while (displayItems.length < 9) {
      displayItems.push(items[index % items.length]);
      index += 1;
    }

    return displayItems;
  }

  function render() {
    const filtered = applyFilterAndSort();
    const start = (state.page - 1) * state.pageSize;
    const currentItems = filtered.slice(start, start + state.pageSize);
    const displayItems = ensureMinimumDisplayItems(currentItems);
    if (filterTitle) filterTitle.textContent = "Sản phẩm Charm";
    if (resultCount) resultCount.textContent = filtered.length + " sản phẩm";
    if (grid) {
      if (currentItems.length === 0) grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      else {
        grid.innerHTML = displayItems.map(function (product) {
          const wishlisted = isWishlisted(product.id);
          return `
          <a href="./trangchitiet.html?id=${product.detailId}" class="catalog-card">
            <div class="catalog-thumb">${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}<span class="wishlist-mini ${wishlisted ? "active" : ""}" data-id="${product.id}"><i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i></span><img src="${product.image}" alt="${product.name}" /></div>
            <div class="catalog-info"><div class="catalog-name">${product.name}</div><div class="catalog-price">${product.price}</div></div>
          </a>`;
        }).join("");
        bindWishlistButtons();
      }
    }
    renderPagination(filtered.length);
  }

  syncGenderSelection();
  initCategoryButtons();
  render();
  priceRange?.addEventListener("input", function () { state.maxPrice = Number(this.value); maxPriceLabel.textContent = formatPrice(state.maxPrice); state.page = 1; render(); });
  ratingButtons.forEach(function (button) { button.addEventListener("click", function () { ratingButtons.forEach(function (btn) { btn.classList.remove("active"); }); this.classList.add("active"); state.minRating = Number(this.dataset.rating || 0); state.page = 1; render(); }); });
  genderInputs.forEach(function (input) { input.addEventListener("change", function () { syncGenderSelection(this.value); state.page = 1; render(); }); });
  inStockOnlyInput?.addEventListener("change", function () { state.inStockOnly = this.checked; state.page = 1; render(); });
  searchInput?.addEventListener("input", function () { state.searchKeyword = this.value; state.page = 1; render(); });
  sortSelect?.addEventListener("change", function () { state.sort = this.value; state.page = 1; render(); });
});
