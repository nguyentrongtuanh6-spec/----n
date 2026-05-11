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
  };

  const products = [
    { id: 1301, detailId: 1, name: "Dây chuyền đôi bạc đính kim cương Moissanite hình mặt trăng và mặt trời AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/159.png", 
      price: "2.875.000đ", gender: "Cặp đôi", rating: 4.7, inStock: true, order: 1 },
    { id: 1302, detailId: 2, name: "Nhẫn cặp đôi bạc đính kim cương Moissanite hình hoàng tử và công chúa", 
      image: "../ảnh/Ảnh chụp màn hình/160.png", 
      price: "3.180.000đ", gender: "Cặp đôi", rating: 4.4, inStock: true, order: 2 },
    { id: 1303, detailId: 3, name: "Lắc tay bạc đôi dây bện đính đá CZ hình gạc nai", 
      image: "../ảnh/Ảnh chụp màn hình/161.png", 
      price: "1.945.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 3 },
    { id: 1304, detailId: 4, name: "Vòng tay bạc đặc cặp đôi tình yêu Sun And Moon", 
      image: "../ảnh/Ảnh chụp màn hình/162.png", 
      price: "1.150.000đ", gender: "Cặp đôi", rating: 4.8, inStock: true, order: 4 },
    { id: 1305, detailId: 5, name: "Lắc tay bạc cặp đôi đính đá Obsidian hình hoa anh đào Sakura ", 
      image: "../ảnh/Ảnh chụp màn hình/163.png", 
      price: "3.220.000đ", gender: "Cặp đôi", rating: 4.6, inStock: true, order: 5 },
    { id: 1306, detailId: 6, name: "Dây chuyền bạc đôi đính đá CZ hình ánh sao Elian", 
      image: "../ảnh/Ảnh chụp màn hình/164.png", 
      price: "2.920.000đ", gender: "Nữ", rating: 4.2, inStock: true, order: 6 },

    { id: 1309, detailId: 1, name: "Lắc tay bạc cặp đôi tròn đính đá CZ cách điệu khắc 100 chữ I LOVE U", 
      image: "../ảnh/Ảnh chụp màn hình/168.png", 
      price: "2.810.000đ", gender: "Cặp đôi", rating: 4.8, inStock: true, order: 12 },
    { id: 1313, detailId: 5, name: "Lắc tay bạc đôi đính đá mắt mèo, Obsidian tỳ hưu may mắn Eliana",
       image: "../ảnh/Ảnh chụp màn hình/169.png", 
       price: "1.600.000đ", gender: "Cặp đôi", rating: 4.6, inStock: true, order: 13 },

    { id: 1314, detailId: 6, name: "Nhẫn đôi bạc đính đá CZ hình hoa anh đào Sakura", 
      image: "../ảnh/Ảnh chụp màn hình/170.png", 
      price: "950.000đ", gender: "Cặp đôi", rating: 4.5, inStock: true, order: 14 },

    { id: 1314, detailId: 6, name: "Vòng tay bạc đặc cặp đôi tình yêu mạ vàng Love Sunshine", 
      image: "../ảnh/Ảnh chụp màn hình/171.png", 
      price: "7.250.000đ", gender: "Cặp đôi", rating: 4.5, inStock: true, discount: "-2 %",order: 14 },
    { id: 1317, detailId: 1, name: "Lắc tay bạc cặp đôi tình yêu tình bạn vĩnh cửu Forever", 
      image: "../ảnh/Ảnh chụp màn hình/172.png", price: "2.771.000đ", gender: "Cặp đôi", 
      rating: 4.9, inStock: true, order: 17 },
    { id: 1318, detailId: 2, name: "Lắc tay bạc cặp đôi đính kim cương Moissanite hình thỏ dễ thương", 
      image: "../ảnh/Ảnh chụp màn hình/173.png", price: "3.500.000đ", gender: "Cặp đôi", 
      rating: 4.5, inStock: true, order: 18 },
    { id: 1319, detailId: 3, name: "Lắc tay bạc cặp đôi tình yêu sông và núi ", 
      image: "../ảnh/Ảnh chụp màn hình/174.png", price: "2.255.000đ", gender: "Cặp đôi", 
      rating: 4.8, inStock: true, order: 19 },
    { id: 1320, detailId: 4, name: "Dây chuyền đôi bạc đính đá CZ hình lông vũ Isolde", 
      image: "../ảnh/Ảnh chụp màn hình/175.png", price: "2.325.000đ", gender: "Cặp đôi", 
      rating: 5.0, inStock: true, order: 20 },
    { id: 1321, detailId: 5, name: "Dây chuyền đôi bạc đính đá CZ hình bông hồng tình yêu Rose", 
      image: "../ảnh/Ảnh chụp màn hình/176.png", price: "3.035.000đ", gender: "Cặp đôi", 
      rating: 4.7, inStock: true,discount: "-2 %", order: 21},
    { id: 1322, detailId: 6, name: "Nhẫn đôi bạc mạ bạch kim đính đá CZ Eirlys ", 
      image: "../ảnh/Ảnh chụp màn hình/177.png", price: "1.950.000đ", gender: "Cặp đôi", 
      rating: 4.9, inStock: true, order: 22 },
    { id: 1323, detailId: 7, name: "Nhẫn đôi bạc hình chiếc nơ tình yêu Giselle", 
      image: "../ảnh/Ảnh chụp màn hình/178.png", price: "1.480.000đ", gender: "Cặp đôi", 
      rating: 4.8, inStock: true, order: 23 }
  ];

  const state = { maxPrice: Number(priceRange?.value || 100000000), minRating: 0, inStockOnly: inStockOnlyInput?.checked ?? true, selectedGender: null, searchKeyword: "", sort: sortSelect?.value || "popular", page: 1, pageSize: 15 };

  function parsePrice(priceText) { return Number(String(priceText).replace(/[^\d]/g, "")); }
  function formatPrice(value) { return new Intl.NumberFormat("vi-VN").format(value) + "đ"; }
  
  function syncGenderSelection(activeValue) { 
    genderInputs.forEach(function (input) { input.checked = input.value === activeValue; }); 
    state.selectedGender = activeValue || null; 
  }

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
    grid.querySelectorAll(".wishlist-btn").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault(); event.stopPropagation();
        if (!window.AuroraDB) return;
        const added = window.AuroraDB.toggleWishlist(this.dataset.id);
        this.classList.toggle("active", added);
        const icon = this.querySelector("i");
        if (icon) { icon.classList.toggle("fa-solid", added); icon.classList.toggle("fa-regular", !added); }
      });
    });
  }

  function bindAddToCartButtons() {
    if (!grid) return;
    grid.querySelectorAll(".add-to-cart-btn").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const productId = this.dataset.id;
        const product = products.find(function (p) { return String(p.id) === String(productId); });
        if (!product || !window.AuroraDB) return;
        window.AuroraDB.addToCart(product, 1);
        this.innerHTML = '<i class="fa-solid fa-check"></i>';
        this.style.background = '#f28f9f';
        this.style.borderColor = '#f28f9f';
        this.style.color = '#fff';
        var btn = this;
        setTimeout(function () {
          btn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i>';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1200);
      });
    });
  }

  function render() {
    const filtered = applyFilterAndSort();
    const start = (state.page - 1) * state.pageSize;
    const currentItems = filtered.slice(start, start + state.pageSize);
    
    if (filterTitle) filterTitle.textContent = "Bộ sưu tập Trang sức đôi";
    if (resultCount) resultCount.textContent = filtered.length + " sản phẩm";
    
    if (grid) {
      if (currentItems.length === 0) grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      else {
        grid.innerHTML = currentItems.map(function (product) {
          const wishlisted = isWishlisted(product.id);
          return `
          <a href="./trangchitiet.html?id=${product.detailId}" class="product-card">
            <div class="product-thumb">
              ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
              <button class="wishlist-btn ${wishlisted ? "active" : ""}" data-id="${product.id}"><i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i></button>
              <button class="add-to-cart-btn" data-id="${product.id}"><i class="fa-solid fa-bag-shopping"></i></button>
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="price">${product.price}</div>
            </div>
          </a>`;
        }).join("");
        bindWishlistButtons();
        bindAddToCartButtons();
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
