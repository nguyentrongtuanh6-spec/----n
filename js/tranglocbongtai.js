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

  // DỮ LIỆU BÔNG TAI NỮ
  const femaleEarringsData = [
    {
      id: 701, detailId: 1, name: "BBông tai Bạc đính đá  AURORA",
      image: "../ảnh/Ảnh chụp màn hình/109.png", price: "565.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 1
    },
    {
      id: 702, detailId: 2, name: "Hoa Tai Bạc Moments Hình Bướm Xanh AURORA",
      image: "../ảnh/Ảnh chụp màn hình/113.png", price: "810.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 2, discount: "-2%"
    },
    {
      id: 703, detailId: 3, name: "Bông tai bạc nữ đính đá hình chiếc nơ sang trọng AURORA",
      image: "../ảnh/Ảnh chụp màn hình/112.png", price: "705.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 3
    },
    {
      id: 713, detailId: 1, name: "Hoa Tai Timeless Hình Nơ Lấp Lánh Dạng Rơi AURORA",
      image: "../ảnh/Ảnh chụp màn hình/111.png", price: "620.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 4
    },
    {
      id: 715, detailId: 3, name: "Bông tai nữ bạc Ý cao cấp",
      image: "../ảnh/Ảnh chụp màn hình/114.png", price: "947.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 5, discount: "-2%"
    },
    {
      id: 717, detailId: 1, name: "Bông tai bạc nữ đính đá mèo và mặt trăng Kara AURORA",
      image: "../ảnh/Ảnh chụp màn hình/115.png", price: "300.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 6
    },
    {
      id: 718, detailId: 2, name: "Bông tai bạc nữ đính đá hình hồ điệp AURORA",
      image: "../ảnh/Ảnh chụp màn hình/116.png", price: "335.000đ", gender: "Nữ",
      rating: 4.4, inStock: true, order: 7
    },
    {
      id: 720, detailId: 4, name: "Bông tai bạc nữ đính đá ngôi sao 5 cánh AURORA",
      image: "../ảnh/Ảnh chụp màn hình/117.png", price: "995.00đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 8
    },
    {
      id: 721, detailId: 1, name: "Bông tai bạc nữ đính kim cương hoa hướng dương AURORA",
      image: "../ảnh/Ảnh chụp màn hình/118.png", price: "3.489.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 9
    }
  ];

  // DỮ LIỆU BÔNG TAI NAM
  const maleEarringsData = [
    {
      id: 704, detailId: 4, name: "Bông tai bạc nam tròn trơn đen ngầu bầu trời sao AURORA",
      image: "../ảnh/Ảnh chụp màn hình/137.png", price: "780.000đ", gender: "Nam",
      rating: 4.3, inStock: true, order: 10
    },
    {
      id: 714, detailId: 2, name: "Khuyên tai bạc nam tròn xoắn Cuban AURORA",
      image: "../ảnh/Ảnh chụp màn hình/138.png", price: "410.000đ", gender: "Nam",
      rating: 4.8, inStock: true, order: 11
    },
    {
      id: 716, detailId: 4, name: "Khuyên tai bạc nam đính đá CZ thánh giá, chữ thập Shepherd AURORA",
      image: "../ảnh/Ảnh chụp màn hình/139.png", price: "360.000đ", gender: "Nam",
      rating: 4.5, inStock: true, order: 12
    },
    {
      id: 719, detailId: 3, name: "Khuyên tai bạc nam tròn hình zigzag cá tính AURORA",
      image: "../ảnh/Ảnh chụp màn hình/140.png", price: "466.000đ", gender: "Nam",
      rating: 4.6, inStock: true, order: 13
    }
  ];

  // DỮ LIỆU BÔNG TAI CẶP ĐÔI
  const coupleEarringsData = [
    {
      id: 750, detailId: 1, name: "Bông tai bạc nữ/nam đính kim cương Moissanite vuông tròn cách điệu AURORA",
      image: "../ảnh/Ảnh chụp màn hình/141.png", price: "3.987.000đ", gender: "Cặp đôi",
      rating: 4.9, inStock: true, order: 14, discount: "-2%"
    },
    {
      id: 751, detailId: 2, name: "Bông tai bạc nữ/nam đính đá AURORA",
      image: "../ảnh/Ảnh chụp màn hình/142.png", price: "920.000đ", gender: "Cặp đôi",
      rating: 4.7, inStock: true, order: 15
    },
    {
      id: 752, detailId: 3, name: "Bông tai bạc nữ/nam đính đá CZ kẹp vành chữ C August  AURORA",
      image: "../ảnh/Ảnh chụp màn hình/143.png", price: "820.000đ", gender: "Cặp đôi",
      rating: 5.0, inStock: true, order: 16
    }
  ];

  const products = [...femaleEarringsData, ...maleEarringsData, ...coupleEarringsData];

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
