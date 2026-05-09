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

  // DỮ LIỆU DÂY CHUYỀN NỮ (Thay đổi thông tin & ảnh tại đây)
  const femaleNecklacesData = [
    { id: 401, detailId: 1, name: "Dây chuyền bạc nữ đính đá ,ngọc trai AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/97.png", price: "1.320.000đ", gender: "Nữ", 
      rating: 4.8, inStock: true, order: 1 },
    { id: 403, detailId: 3, name: "Dây chuyền bạc nữ đẹp đính pha lê Aurora trái tim hoa lá ", 
      image: "../ảnh/Ảnh chụp màn hình/98.png", price: "856.000đ", gender: "Nữ", 
      rating: 4.7, inStock: true, order: 2 },
    { id: 405, detailId: 5, name: "Dây chuyền bạc nữ đính đá Josephine AURORA",
      image: "../ảnh/Ảnh chụp màn hình/99.png", price: "1.019.000đ", gender: "Nữ",
       rating: 4.6, inStock: true, order: 3 },
    { id: 406, detailId: 6, name: "Vòng cổ bạc nữ đính đá hình cành lộc non AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/100.png", price: "920.000đ", gender: "Nữ", 
      rating: 4.7, inStock: true, order: 4, discount: "-2 %" },
    { id: 408, detailId: 8, name: "Dây chuyền bạc nữ dạng lồng đóng mở hình cây thông NoEL AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/102.png", price: "1.8130.000đ", gender: "Nữ", 
      rating: 5.0, inStock: true, order: 5 },
    { id: 409, detailId: 1, name: "Dây chuyền bạc nữ đính pha lê cánh bướm AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/101.png", price: "2.139.000đ", gender: "Nữ", 
      rating: 4.4, inStock: true, order: 6, discount: "-2 %" },
    { id: 411, detailId: 3, name: "Dây chuyền bạc nữ đính đá AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/103.png", price: "520.000đ", gender: "Nữ", 
      rating: 4.2, inStock: true, order: 7 },
    { id: 414, detailId: 6, name: "Dây chuyền bạc nữ đính đá hình chú thiên nga AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/104.png", price: "1.188.000đ", gender: "Nữ", 
      rating: 4.7, inStock: true, order: 8 },
    { id: 416, detailId: 8, name: "Dây chuyền bạc nữ đính đá giấc mơ hành tinh AURORA ", 
      image: "../ảnh/Ảnh chụp màn hình/105.png", price: "479.000đ", gender: "Nữ", 
      rating: 4.4, inStock: true, order: 9 },
    { id: 418, detailId: 2, name: "DDây chuyền bạc nữ đính đá đôi cánh thiên thần AURORA",
       image: "../ảnh/Ảnh chụp màn hình/106.png", price: "2.995.000đ", gender: "Nữ", 
       rating: 4.1, inStock: true, order: 10,  discount: "-2 %" },
    { id: 421, detailId: 5, name: "Dây chuyền bạc nữ đính kim cương Moissanite tròn cách điệu AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/107.png", price: "1.350.000đ", gender: "Nữ", 
      rating: 4.6, inStock: true, order: 11 }
  ];

  // DỮ LIỆU DÂY CHUYỀN NAM (Thay đổi thông tin & ảnh tại đây)
  const maleNecklacesData = [
    { id: 402, detailId: 2, name: "Dây chuyền bạc nam đính đá CZ nhẫn kèm ngôi sao 6 cánh Scott AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/108.png", price: "1.120.000đ", gender: "Nam", 
      rating: 4.5, inStock: true, order: 12 },
    { id: 404, detailId: 4, name: "Dây chuyền bạc nam dây bện hình kim tiền may mắn Allison AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/130.png", price: "780.000đ", gender: "Nam", 
      rating: 4.3, inStock: true, order: 13 },
    { id: 407, detailId: 7, name: "Dây chuyền bạc nam thời trang cá tính Sullivan AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/131.png", price: "550.000đ", gender: "Nam",
       rating: 4.9, inStock: true, order: 14 },
    { id: 410, detailId: 2, name: "Dây chuyền bạc nam nguyên chất xích sợi to trơn Fast Boy AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/132.png", price: "910.000đ", gender: "Nam", 
      rating: 4.8, inStock: true, order: 15 },
    { id: 412, detailId: 4, name: "Mặt dây chuyền bạc Thái nam hổ trắng Bengal AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/133.png", price: "4.180.000đ", gender: "Nam", 
      rating: 4.5, inStock: true, order: 16, discount: "-2 %" },
    { id: 415, detailId: 7, name: "Dây chuyền bạc nam trơn hình chữ thập Alva AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/134.png", price: "605.000đ", gender: "Nam", 
      rating: 4.6, inStock: true, order: 17 },

  ];

  // DỮ LIỆU DÂY CHUYỀN ĐÔI
  const coupleNecklacesData = [
    { id: 413, detailId: 5, name: "Dây chuyền đôi bạc đính đá CZ hình cá voi và bướm Brenna AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/36.png", price: "2.810.000đ", gender: "Cặp đôi", 
      rating: 4.9, inStock: true, order: 20 },
    { id: 420, detailId: 4, name: "Dây chuyền đôi bạc đính đá CZ gắn nam châm Heart to Heart AURORA", 
      image: "../ảnh/Ảnh chụp màn hình/42.png", price: "2.222.000đ", gender: "Cặp đôi", 
      rating: 5.0, inStock: true, order: 21 }
  ];

  const products = [...femaleNecklacesData, ...maleNecklacesData, ...coupleNecklacesData];

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
    grid.querySelectorAll(".wishlist-btn").forEach(function (button) {
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
