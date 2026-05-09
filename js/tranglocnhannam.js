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

  // DỮ LIỆU NHẪN NỮ (Tổng cộng 21 sản phẩm để có 2 trang)
  const femaleRingsData = [
    {
      id: 201, detailId: 1, name: "Nhẫn bạc nữ mạ bạch kim đính đá cỏ 4 lá AURORA",
      image: "../ảnh/Ảnh chụp màn hình/24.png", price: "600.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 1
    },
    {
      id: 202, detailId: 2, name: "Nhẫn bạc nữ đính đá hình cành lộc non AURORA",
      image: "../ảnh/Ảnh chụp màn hình/25.png", price: "569.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 2
    },
    {
      id: 203, detailId: 3, name: "Nhẫn bạc nữ đính đá vương miện công chúa AURORA",
      image: "../ảnh/Ảnh chụp màn hình/26.png", price: "710.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 3
    },
    {
      id: 204, detailId: 4, name: "Nhẫn bạc nữ đính kim cương Moissanite Alaia AURORA",
      image: "../ảnh/Ảnh chụp màn hình/27.png", price: "2.810.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 4, discount: "-2%"
    },
    {
      id: 205, detailId: 5, name: "Nhẫn bạc nữ đính đá hình bạch xà AURORA",
      image: "../ảnh/Ảnh chụp màn hình/28.png", price: "1.630.000đ", gender: "Nữ",
      rating: 4.6, inStock: true, order: 5, discount: "-2%"
    },
    {
      id: 206, detailId: 6, name: "Nhẫn bạc nữ đính kim cương Moissanite Sophie AURORA",
      image: "../ảnh/Ảnh chụp màn hình/29.png", price: "655.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 6
    },
    {
      id: 207, detailId: 7, name: "Nhẫn bạc nữ đính đá hình hoa mai cách điệu Brianna AURORA",
      image: "../ảnh/Ảnh chụp màn hình/30.png", price: "900.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 7, discount: "-2%"
    },
    {
      id: 208, detailId: 8, name: "Nhẫn bạc nữ đính đá hình cáo hồ ly AURORA",
      image: "../ảnh/Ảnh chụp màn hình/31.png", price: "733.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 8
    },
    {
      id: 209, detailId: 9, name: "Nhẫn bạc nữ đính kim cương Moissanite hình trái tim AURORA",
      image: "../ảnh/Ảnh chụp màn hình/93.png", price: "325.000đ", gender: "Nữ",
      rating: 4.6, inStock: true, order: 9
    },
    {
      id: 210, detailId: 10, name: "Nhẫn Bạc đính đá Silver AURORA",
      image: "../ảnh/Ảnh chụp màn hình/94.png", price: "775.000đ", gender: "Nữ",
      rating: 4.4, inStock: true, order: 10
    },
    {
      id: 211, detailId: 11, name: "Nhẫn Bạc đính đá STYLE AURORA",
      image: "../ảnh/Ảnh chụp màn hình/95.png", price: "425.000đ", gender: "Nữ",
      rating: 4.3, inStock: true, order: 11
    },
    {
      id: 212, detailId: 12, name: "Nhẫn Bạc đính đá bông hoa STYLE By AURORA",
      image: "../ảnh/Ảnh chụp màn hình/96.png", price: "855.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 12
    },
    {
      id: 213, name: "Nhẫn bạc nữ đính đá CZ hình trái tim AURORA",
      image: "../ảnh/Ảnh chụp màn hình/124.png", price: "790.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 13
    },
    {
      id: 214, name: "Nhẫn bạc nữ đính đá vô cực tình yêu vĩnh cửu AURORA",
      image: "../ảnh/Ảnh chụp màn hình/125.png", price: "550.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 14
    },
    {
      id: 215, name: "Nhẫn bạc nữ đính đá CZ hình trái tim AURORA",
      image: "../ảnh/Ảnh chụp màn hình/126.png", price: "390.000đ", gender: "Nữ",
      rating: 4.6, inStock: true, order: 15
    },
    {
      id: 216, name: "Nhẫn bạc nữ đính đá Moissanite hình vương miện AURORA",
      image: "../ảnh/Ảnh chụp màn hình/127.png", price: "3.900.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 16
    },
    {
      id: 217, name: "Nhẫn bạc nữ đính đá CZ hình hồ điệp Margot AURORA",
      image: "../ảnh/Ảnh chụp màn hình/128.png", price: "380.000đ", gender: "Nữ",
      rating: 5.0, inStock: true, order: 17
    },
    {
      id: 218, name: "Nhẫn bạc nữ đính đá phong thủy tự nhiên Josephine AURORA",
      image: "../ảnh/Ảnh chụp màn hình/129.png", price: "780.000đ", gender: "Nữ",
      rating: 4.4, inStock: true, order: 18
    },
  ];
  // DỮ LIỆU NHẪN NAM (Tổng cộng 21 sản phẩm để có 2 trang)
  const maleRingsData = [
    {
      id: 101, detailId: 1, name: "Nhẫn nam Đính đá AURORA",
      image: "../ảnh/Ảnh chụp màn hình/81.png", price: "650.000đ", gender: "Nam",
      rating: 4.8, inStock: true, order: 1
    },
    {
      id: 102, detailId: 2, name: "Nhẫn bạc nam đính đá Roderick AURORA",
      image: "../ảnh/Ảnh chụp màn hình/80.png", price: "860.000đ", gender: "Nam",
      rating: 4.5, inStock: true, order: 2
    },
    {
      id: 103, detailId: 3, name: "Nhẫn bạc nam đính đá Sage AURORA",
      image: "../ảnh/Ảnh chụp màn hình/82.png", price: "910.000đ", gender: "Nam",
      rating: 4.9, inStock: true, order: 3, discount: "-2 %"
    },
    {
      id: 104, detailId: 4, name: "Nhẫn bạc nam hình 12 con giáp Axton AURORA",
      image: "../ảnh/Ảnh chụp màn hình/83.png", price: "890.000đ", gender: "Nam",
      rating: 4.2, inStock: true, order: 4, discount: "-2 %"
    },
    {
      id: 105, detailId: 5, name: "Nhẫn bạc nam tròn trơn Kannon AURORA",
      image: "../ảnh/Ảnh chụp màn hình/84.png", price: "230.000đ", gender: "Nam",
      rating: 5.0, inStock: true, order: 5
    },
    {
      id: 106, detailId: 6, name: "Bông tai bạc nam đính đá hình những bông hoa AURORA",
      image: "../ảnh/Ảnh chụp màn hình/85.png", price: "255.000đ", gender: "Nam",
      rating: 4.7, inStock: true, order: 6
    },
    {
      id: 107, name: "Nhẫn bạc nam vòng tròn ma thuật AURORA",
      image: "../ảnh/Ảnh chụp màn hình/86.png", price: "500.000đ", gender: "Nam",
      rating: 4.4, inStock: true, order: 7
    },
    {
      id: 108, name: "Nhẫn nam Đính đá Thuận Buồm Xuôi Gió AURORA",
      image: "../ảnh/Ảnh chụp màn hình/87.png", price: "1.120.000đ", gender: "Nam",
      rating: 4.5, inStock: true, order: 8, discount: "-6 %"
    },
    {
      id: 109, name: "Nhẫn bạc nam hình vân mây Charlie AURORA",
      image: "../ảnh/Ảnh chụp màn hình/88.png", price: "345.000đ", gender: "Nam",
      rating: 4.7, inStock: true, order: 9
    },
    {
      id: 110, name: "Nhẫn nam Đính đá Topaz MANCODE AURORA",
      image: "../ảnh/Ảnh chụp màn hình/90.png", price: "978.000đ", gender: "Nam",
      rating: 4.3, inStock: true, order: 10, discount: "-2 %"
    },
    {
      id: 111, name: "Nhẫn nam Bạc đính đá chữ Love AURORA",
      image: "../ảnh/Ảnh chụp màn hình/91.png", price: "330.000đ", gender: "Nam",
      rating: 4.9, inStock: true, order: 11
    },
    {
      id: 112, name: "Nhẫn bạc nam trơn Ahmed AURORA",
      image: "../ảnh/Ảnh chụp màn hình/92.png", price: "279.000đ", gender: "Nam",
      rating: 4.5, inStock: true, order: 12
    },
    {
      id: 113, name: "Nhẫn bạc nam tròn trơn đơn giản Teen Top AURORA",
      image: "../ảnh/Ảnh chụp màn hình/89.png", price: "210.000đ", gender: "Nam",
      rating: 4.8, inStock: true, order: 13
    },
    {
      id: 114, name: "Nhẫn bạc nam hình rồng Raphael AURORA",
      image: "../ảnh/Ảnh chụp màn hình/119.png", price: "2.180.000đ", gender: "Nam",
      rating: 4.6, inStock: true, order: 14
    },
    {
      id: 115, name: "Nhẫn bạc nam đính kim cương Moissanite Matthew AURORA",
      image: "../ảnh/Ảnh chụp màn hình/120.png", price: "3.040.000đ", gender: "Nam",
      rating: 4.4, inStock: true, order: 15, discount: "-2 %"
    },
    {
      id: 116, name: "Nhẫn bạc nam cá tính phong cách mới Ryland AURORA",
      image: "../ảnh/Ảnh chụp màn hình/121.png", price: "550.000đ", gender: "Nam",
      rating: 4.9, inStock: true, order: 16
    },
    {
      id: 117, name: "Nhẫn bạc nam hình con hổ Gideon AURORA",
      image: "../ảnh/Ảnh chụp màn hình/122.png", price: "780.000đ", gender: "Nam",
      rating: 4.2, inStock: true, order: 17
    },
    {
      id: 118, name: "Nhẫn bạc nam tròn trơn Ezequiel AURORA",
      image: "../ảnh/Ảnh chụp màn hình/123.png", price: "200.000đ", gender: "Nam",
      rating: 5.0, inStock: true, order: 18
    },
  ];

  // DỮ LIỆU NHẪN ĐÔI
  const coupleRingsData = [
    {
      id: 301, detailId: 1, name: "Nhẫn cặp đôi bạc đính kim cương Moissanite Layla AURORA",
      image: "../ảnh/Ảnh chụp màn hình/2.png", price: "2.7410.000đ", gender: "Cặp đôi",
      rating: 4.9, inStock: true, order: 1
    },
    {
      id: 302, detailId: 2, name: "Nhẫn đôi bạc free size đính đá CZ hiệp sĩ và công chúa AURORA",
      image: "../ảnh/Ảnh chụp màn hình/52.png", price: "1.820.000đ", gender: "Cặp đôi",
      rating: 5.0, inStock: true, order: 2
    },
    {
      id: 303, detailId: 3, name: "Nhẫn cặp đôi bạc đính kim cương Moissanite Beloved AURORA",
      image: "../ảnh/Ảnh chụp màn hình/135.png", price: "4.950.000đ", gender: "Cặp đôi",
      rating: 4.8, inStock: true, order: 3, discount: "-2 %"
    },
    {
      id: 304, detailId: 4, name: "Nhẫn đôi bạc đính đá CZ Alma AURORA",
      image: "../ảnh/Ảnh chụp màn hình/136.png", price: "1.100.000đ", gender: "Cặp đôi",
      rating: 4.9, inStock: true, order: 4
    }
  ];

  const products = [...femaleRingsData, ...maleRingsData, ...coupleRingsData];

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
  if (window.AuroraDB) {
    window.AuroraDB.init(products);
  }
});
