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
    {
      id: 1201, detailId: 1, name: "Bộ trang sức bạc nữ hoa cúc họa mi AURORA",
      image: "../ảnh/Ảnh chụp màn hình/179.png", price: "5.850.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 1
    },
    {
      id: 1202, detailId: 2, name: "Bộ trang sức bạc nữ đính đá pha lê hình trái tim AURORA",
      image: "../ảnh/Ảnh chụp màn hình/180.png", price: "5.500.000đ", gender: "Nữ",
      rating: 5.0, inStock: true, order: 2
    },
    {
      id: 1203, detailId: 3, name: "Bộ trang sức bạc nữ đính đá Spinel, CZ hình bông tuyết AURORA ",
      image: "../ảnh/Ảnh chụp màn hình/181.png", price: "6.780.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, discount: "-2 %", order: 3
    },
    {
      id: 1206, detailId: 6, name: "Bộ trang sức bạc nữ mạ vàng đính đá CZ đa sắc",
      image: "../ảnh/Ảnh chụp màn hình/184.png", price: "9.170.000đ", gender: "Nữ",
      rating: 4.6, inStock: true, order: 6
    },
    {
      id: 1215, detailId: 7, name: "Bộ trang sức bạc nữ mạ vàng đính đá CZ Red",
      image: "../ảnh/Ảnh chụp màn hình/182.png", price: "4.950.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 15
    },
    {
      id: 1216, detailId: 8, name: "Bộ trang sức bạc nữ mạ vàng đính đá CZ, Malachite khổng tước",
      image: "../ảnh/Ảnh chụp màn hình/183.png", price: "2.750.000đ", gender: "Nữ",
      rating: 4.6, inStock: true, order: 16
    },
    {
      id: 1217, detailId: 1, name: "Bộ trang sức bạc nữ mặt vuông mạ vàng đính đá CZ, mã não công chúa",
      image: "../ảnh/Ảnh chụp màn hình/185.png", price: "7.120.000đ", gender: "Nữ",
      rating: 4.9, inStock: true, order: 17
    },
    {
      id: 1218, detailId: 2, name: "Bộ trang sức bạc nữ mạ vàng đính đá Citrine hình chú ong vàng",
      image: "../ảnh/Ảnh chụp màn hình/186.png", price: "8.200.000đ", gender: "Nữ",
      rating: 4.8, inStock: true, order: 18
    },
    {
      id: 1219, detailId: 3, name: "Bộ trang sức bạc nữ mạ vàng đính đá Opal, CZ đại dương xanh",
      image: "../ảnh/Ảnh chụp màn hình/187.png", price: "8.800.000đ", gender: "Nữ",
      rating: 4.7, inStock: true, order: 19
    },
    {
      id: 1220, detailId: 4, name: "Bộ trang sức bạc nữ đính đá Garnet, CZ hoa hồng tình yêu",
      image: "../ảnh/Ảnh chụp màn hình/188.png", price: "5.620.000đ", gender: "Nữ",
      rating: 5.0, inStock: true, order: 20
    },
    {
      id: 1221, detailId: 5, name: "Bộ trang sức bạc nữ mạ vàng đính đá CZ, Opal hình quả trứng thời trang",
      image: "../ảnh/Ảnh chụp màn hình/189.png", price: "5.619.000đ", gender: "Nữ",
      rating: 4.5, inStock: true, order: 21
    },

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

    if (filterTitle) filterTitle.textContent = "Bộ sưu tập Trang sức bộ";
    if (resultCount) resultCount.textContent = filtered.length + " bộ sản phẩm";

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
