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

  // ============================================================
  // DỮ LIỆU VÒNG TAY NỮ
  // ============================================================
  const femaleBraceletsData = [
    { 
      id: 1001, 
      detailId: 1, 
      name: "Vòng tay bạc nữ AURORA charm trái tim", 
      image: "../ảnh/Ảnh chụp màn hình/20.png", 
      price: "750.000đ", 
      gender: "Nữ", 
      rating: 4.8, 
      inStock: true, 
      order: 1 
    },
    { 
      id: 1002, 
      detailId: 2, 
      name: "Lắc tay bạc nữ đính đá lấp lánh", 
      image: "../ảnh/Ảnh chụp màn hình/21.png", 
      price: "520.000đ", 
      gender: "Nữ", 
      rating: 4.5, 
      inStock: true, 
      order: 2 
    },
    { 
      id: 1003, 
      detailId: 3, 
      name: "Vòng tay bạc nữ phong cách Minimalist", 
      image: "../ảnh/Ảnh chụp màn hình/22.png", 
      price: "450.000đ", 
      gender: "Nữ", 
      rating: 4.7, 
      inStock: true, 
      order: 3 
    },
    { 
      id: 1013, 
      detailId: 1, 
      name: "Vòng tay nữ bạc 925 đính đá", 
      image: "../ảnh/Ảnh chụp màn hình/8.png", 
      price: "680.000đ", 
      gender: "Nữ", 
      rating: 4.5, 
      inStock: true, 
      order: 4 
    },
    { 
      id: 1015, 
      detailId: 3, 
      name: "Lắc tay nữ chuông nhỏ xinh", 
      image: "../ảnh/Ảnh chụp màn hình/28.png", 
      price: "350.000đ", 
      gender: "Nữ", 
      rating: 4.4, 
      inStock: true, 
      order: 5 
    },
    { 
      id: 1017, 
      detailId: 1, 
      name: "Lắc tay bạc nữ dây mềm", 
      image: "../ảnh/Ảnh chụp màn hình/62.png", 
      price: "450.000đ", 
      gender: "Nữ", 
      rating: 4.6, 
      inStock: true, 
      order: 6 
    },
    { 
      id: 1019, 
      detailId: 3, 
      name: "Lắc tay bạc nữ đính đá Ruby", 
      image: "../ảnh/Ảnh chụp màn hình/64.png", 
      price: "1.250.000đ", 
      gender: "Nữ", 
      rating: 4.7, 
      inStock: true, 
      order: 7 
    },
    { 
      id: 1021, 
      detailId: 1, 
      name: "Lắc tay bạc nữ phong cách tối giản", 
      image: "../ảnh/Ảnh chụp màn hình/66.png", 
      price: "380.000đ", 
      gender: "Nữ", 
      rating: 4.5, 
      inStock: true, 
      order: 8 
    }
  ];

  // ============================================================
  // DỮ LIỆU VÒNG TAY NAM
  // ============================================================
  const maleBraceletsData = [
    { 
      id: 1004, 
      detailId: 4, 
      name: "Vòng tay bạc nam kiểu dáng mạnh mẽ", 
      image: "../ảnh/Ảnh chụp màn hình/23.png", 
      price: "1.250.000đ", 
      gender: "Nam", 
      rating: 4.9, 
      inStock: true, 
      order: 9 
    },
    { 
      id: 1014, 
      detailId: 2, 
      name: "Vòng tay nam da phối bạc", 
      image: "../ảnh/Ảnh chụp màn hình/81.png", 
      price: "450.000đ", 
      gender: "Nam", 
      rating: 4.2, 
      inStock: true, 
      order: 10 
    },
    { 
      id: 1016, 
      detailId: 4, 
      name: "Vòng tay nam mắt xích Cuban", 
      image: "../ảnh/Ảnh chụp màn hình/92.png", 
      price: "1.150.000đ", 
      gender: "Nam", 
      rating: 4.9, 
      inStock: true, 
      order: 11 
    },
    { 
      id: 1018, 
      detailId: 2, 
      name: "Vòng tay bạc nam kiểu dáng cứng", 
      image: "../ảnh/Ảnh chụp màn hình/63.png", 
      price: "1.800.000đ", 
      gender: "Nam", 
      rating: 4.8, 
      inStock: true, 
      order: 12 
    }
  ];

  // ============================================================
  // DỮ LIỆU VÒNG TAY CẶP ĐÔI
  // ============================================================
  const coupleBraceletsData = [
    { 
      id: 1020, 
      detailId: 4, 
      name: "Vòng tay đôi Forever Silver", 
      image: "../ảnh/Ảnh chụp màn hình/65.png", 
      price: "2.400.000đ", 
      gender: "Cặp đôi", 
      rating: 5.0, 
      inStock: true, 
      order: 13 
    },
    { 
      id: 1031, 
      detailId: 5, 
      name: "Vòng tay đôi Destiny Bonds", 
      image: "../ảnh/Ảnh chụp màn hình/34.png", 
      price: "1.850.000đ", 
      gender: "Cặp đôi", 
      rating: 4.9, 
      inStock: true, 
      order: 14 
    },
    { 
      id: 1032, 
      detailId: 6, 
      name: "Lắc tay đôi Endless Love", 
      image: "../ảnh/Ảnh chụp màn hình/35.png", 
      price: "2.100.000đ", 
      gender: "Cặp đôi", 
      rating: 4.8, 
      inStock: true, 
      order: 15 
    },
    { 
      id: 1033, 
      detailId: 7, 
      name: "Vòng tay đôi Soul Connection", 
      image: "../ảnh/Ảnh chụp màn hình/36.png", 
      price: "1.650.000đ", 
      gender: "Cặp đôi", 
      rating: 4.7, 
      inStock: true, 
      order: 16 
    }
  ];

  const products = [...femaleBraceletsData, ...maleBraceletsData, ...coupleBraceletsData];

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
        event.preventDefault(); e.stopPropagation();
        if (!window.AuroraDB) return;
        const added = window.AuroraDB.toggleWishlist(this.dataset.id);
        this.classList.toggle("active", added);
        const icon = this.querySelector("i");
        if (icon) { icon.classList.toggle("fa-solid", added); icon.classList.toggle("fa-regular", !added); }
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
});
