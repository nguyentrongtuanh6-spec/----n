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

  const pageRoutes = {
    ring: "./tranglocnhannam.html",
    necklace: "./tranglocdaychuyen.html",
    earring: "./tranglocbongtai.html",
    bracelet: "./tranglocvongtay.html",
    charm: "./trangloccharm.html",
    set: "./trangsucbo.html",
    couple: "./trangsucdoi.html"
  };

  const products = [
    { id: 1201, detailId: 1, name: "Bộ trang sức bạc đính đá xanh Sapphire", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop", price: "2.850.000đ", gender: "Nữ", rating: 4.9, inStock: true, order: 1 },
    { id: 1202, detailId: 2, name: "Bộ trang sức ngọc trai cao cấp AURORA", image: "https://images.unsplash.com/photo-1535102223803-f1662660d1ba?q=80&w=800&auto=format&fit=crop", price: "3.500.000đ", gender: "Nữ", rating: 5.0, inStock: true, order: 2 },
    { id: 1203, detailId: 3, name: "Bộ trang sức hoa tuyết ánh bạc hiện đại", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop", price: "1.780.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 3 },
    { id: 1204, detailId: 4, name: "Bộ trang sức zircon thiết kế sang trọng", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", price: "2.250.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 4 },
    { id: 1205, detailId: 5, name: "Bộ trang sức bản mảnh phong cách tối giản", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", price: "1.440.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 5 },
    { id: 1206, detailId: 6, name: "Bộ trang sức ngọc trai phối đá cao cấp", image: "https://images.unsplash.com/photo-1518131394553-8b94103126f4?q=80&w=800&auto=format&fit=crop", price: "1.930.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 6 },
    { id: 1207, detailId: 7, name: "Bộ trang sức đính charm tinh tế dịu dàng", image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?q=80&w=800&auto=format&fit=crop", price: "1.570.000đ", gender: "Nữ", rating: 4.4, inStock: true, order: 7 },
    { id: 1208, detailId: 8, name: "Bộ trang sức dáng hoa cho dịp tặng quà", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop", price: "2.180.000đ", gender: "Nữ", rating: 4.3, inStock: true, order: 8 },
    { id: 1209, detailId: 1, name: "Bộ trang sức Diamond Elegance", image: "https://images.unsplash.com/photo-1599643477877-537ef5278533?q=80&w=800&auto=format&fit=crop", price: "5.800.000đ", gender: "Nữ", rating: 5.0, inStock: true, order: 9 },
    { id: 1210, detailId: 2, name: "Bộ trang sức Ruby Heart", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop", price: "4.200.000đ", gender: "Nữ", rating: 4.9, inStock: true, order: 10 },
    { id: 1211, detailId: 3, name: "Bộ trang sức Emerald Green", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop", price: "3.900.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 11 },
    { id: 1212, detailId: 4, name: "Bộ trang sức Gold Luxury", image: "https://images.unsplash.com/photo-1630030538557-182a8ee7d1a5?q=80&w=800&auto=format&fit=crop", price: "8.500.000đ", gender: "Nữ", rating: 5.0, inStock: true, order: 12 },
    { id: 1213, detailId: 5, name: "Bộ trang sức Silver Moon", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop", price: "1.200.000đ", gender: "Nữ", rating: 4.4, inStock: true, order: 13 },
    { id: 1214, detailId: 6, name: "Bộ trang sức Rose Gold", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", price: "2.600.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 14 },
    { id: 1215, detailId: 7, name: "Bộ trang sức Vintage Style", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", price: "1.950.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 15 },
    { id: 1216, detailId: 8, name: "Bộ trang sức Modern Art", image: "https://images.unsplash.com/photo-1518131394553-8b94103126f4?q=80&w=800&auto=format&fit=crop", price: "2.300.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 16 },
    { id: 1217, detailId: 1, name: "Bộ trang sức Ruby Star", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "3.500.000đ", gender: "Nữ", rating: 4.9, inStock: true, order: 17 },
    { id: 1218, detailId: 2, name: "Bộ trang sức Emerald Green", image: "../ảnh/Ảnh chụp màn hình/3.png", price: "4.200.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 18 },
    { id: 1219, detailId: 3, name: "Bộ trang sức Sapphire Blue", image: "../ảnh/Ảnh chụp màn hình/4.png", price: "3.800.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 19 },
    { id: 1220, detailId: 4, name: "Bộ trang sức Diamond Queen", image: "../ảnh/Ảnh chụp màn hình/5.png", price: "9.900.000đ", gender: "Nữ", rating: 5.0, inStock: true, order: 20 },
    { id: 1221, detailId: 5, name: "Bộ trang sức Silver Moon", image: "../ảnh/Ảnh chụp màn hình/6.png", price: "1.500.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 21 },
    { id: 1222, detailId: 6, name: "Bộ trang sức Golden Sun", image: "../ảnh/Ảnh chụp màn hình/7.png", price: "5.600.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 22 }
  ];

  const state = { maxPrice: Number(priceRange?.value || 100000000), minRating: 0, inStockOnly: inStockOnlyInput?.checked ?? true, selectedGender: null, searchKeyword: "", sort: sortSelect?.value || "popular", page: 1, pageSize: 15 };

  function parsePrice(priceText) { return Number(String(priceText).replace(/[^\d]/g, "")); }
  function formatPrice(value) { return new Intl.NumberFormat("vi-VN").format(value) + "đ"; }
  function syncGenderSelection(activeValue) { if (genderInputs.length) { genderInputs.forEach(function (input) { input.checked = input.value === activeValue; }); } state.selectedGender = activeValue || null; }
  function isWishlisted(productId) { return window.AuroraDB ? window.AuroraDB.isWishlisted(productId) : false; }

  function initCategoryButtons() {
    const buttons = categoryList?.querySelectorAll(".male-category-btn") || [];
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const target = pageRoutes[this.dataset.category];
        if (target) {
          window.location.href = target;
        }
      });
    });
  }

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
        if (icon) {
          icon.classList.toggle("fa-solid", added);
          icon.classList.toggle("fa-regular", !added);
        }
      });
    });
  }

  function render() {
    const filtered = applyFilterAndSort();
    const start = (state.page - 1) * state.pageSize;
    const currentItems = filtered.slice(start, start + state.pageSize);
    
    if (filterTitle) filterTitle.textContent = "Bộ sưu tập Trang sức bộ";
    if (resultCount) resultCount.textContent = filtered.length + " bộ sản phẩm";
    
    if (grid) {
      if (currentItems.length === 0) grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      else {
        grid.innerHTML = currentItems.map(function (product) {
          const wishlisted = isWishlisted(product.id);
          return `
          <a href="./trangchitiet.html?id=${product.detailId}" class="catalog-card">
            <div class="catalog-thumb">
              ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
              <span class="wishlist-mini ${wishlisted ? "active" : ""}" data-id="${product.id}"><i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i></span>
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="catalog-info">
              <div class="catalog-name">${product.name}</div>
              <div class="catalog-price">${product.price}</div>
            </div>
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
  if (window.AuroraDB) {
    window.AuroraDB.init(products);
  }
});
