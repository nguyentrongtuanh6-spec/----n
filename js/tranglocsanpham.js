/*
window.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("categoryList");
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPriceLabel");
  const ratingButtons = document.querySelectorAll(".rating-btn");
  const genderInputs = document.querySelectorAll("input[name='gender']");
  const inStockOnlyInput = document.getElementById("inStockOnly");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
    const products = [
      {
        id: 201,
        detailId: 1,
        name: "Nhẫn bạc nữ mạ bạch kim đính đá cỏ 4 lá AURORA",
        category: "ring",
        image: "../ảnh/Ảnh chụp màn hình/2.png",
        price: "600.000đ",
        gender: "Nữ",
        rating: 4.7,
        inStock: true,
        discount: "-2%",
        order: 1,
      },
      {
        id: 202,
        detailId: 2,
        name: "Nhẫn bạc nữ đính đá hình cánh nơ AURORA",
        category: "ring",
        image: "../ảnh/Ảnh chụp màn hình/3.png",
        price: "568.000đ",
        gender: "Nữ",
        rating: 4.6,
        inStock: true,
        order: 2,
      },
      // ... other products
    ];
      id: 101,
      detailId: 1,
      name: "Nhẫn bạc nam đính đá Roderick AURORA",
      category: "favorite",
      image: "../ảnh/Ảnh chụp màn hình/9.png",
      price: "860.000đ",
      gender: "Nam",
      rating: 4.7,
      inStock: true,
      discount: "-2%",
    },
    {
      if (category && categoryMap[category]) {
      detailId: 2,
      name: "Nhẫn bạc nam đính đá Songe AURORA",
      return "ring";
      image: "../ảnh/Ảnh chụp màn hình/10.png",
      price: "910.000đ",
      gender: "Nam",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 103,
      detailId: 3,
      name: "Nhẫn bạc nam trơn Kannon AURORA",
      category: "custom",
      image: "../ảnh/Ảnh chụp màn hình/11.png",
      price: "230.000đ",
      gender: "Nam",
      rating: 4.1,
      inStock: true,
    },
    {
      id: 104,
      detailId: 6,
      name: "Bông tai bạc nam hình hoa AURORA",
      category: "custom",
      image: "../ảnh/Ảnh chụp màn hình/8.png",
      price: "255.000đ",
      gender: "Nam",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 105,
      detailId: 4,
      name: "Nhẫn bạc nam hình la bàn Axton AURORA",
      category: "favorite",
      image: "../ảnh/Ảnh chụp màn hình/7.png",
      price: "890.000đ",
      gender: "Nam",
      rating: 4.8,
      inStock: true,
      discount: "-2%",
    },
    {
      id: 106,
      detailId: 5,
      name: "Nhẫn nam đính đá Topaz MANCODE AURORA",
      category: "favorite",
      image: "../ảnh/Ảnh chụp màn hình/6.png",
      price: "978.000đ",
      gender: "Nam",
      rating: 4.6,
      inStock: true,
      discount: "-2%",
    },
    {
      id: 107,
      detailId: 7,
      name: "Nhẫn bạc nam trơn Ahmed AURORA",
      category: "custom",
      image: "../ảnh/Ảnh chụp màn hình/34.png",
      price: "279.000đ",
      gender: "Nam",
      rating: 4.2,
      inStock: true,
    },
  ];

  const dataFromMain = (window.productData || []).map(function (product) {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      gender: product.category === "couple" ? "Cặp đôi" : "Nữ",
      rating: 4.4,
      inStock: true,
    };
  });

  const allProducts = [...catalogSeed, ...dataFromMain];

  function parsePrice(priceText) {
    return Number(String(priceText).replace(/[^\d]/g, ""));
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  function getQueryCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const legacyToNewCategory = {
      couple: "ring",
      favorite: "ring",
      custom: "charm",
    };

    if (category && categoryMap[category]) {
      return category;
    }

    if (category && legacyToNewCategory[category]) {
      return legacyToNewCategory[category];
    }

    return "earring";
  }

  const state = {
    activeCategory: getQueryCategory(),
    maxPrice: Number(priceRange?.value || 1500000),
    minRating: 0,
    inStockOnly: inStockOnlyInput?.checked ?? true,
    selectedGenders: new Set(["Nam", "Nữ", "Cặp đôi"]),
    searchKeyword: "",
    sort: sortSelect?.value || "popular",
    page: 1,
    pageSize: 9,
  };

  function syncGenderSelection(activeValue) {
    genderInputs.forEach(function (input) {
      input.checked = input.value === activeValue;
    });
    state.selectedGenders = new Set([activeValue]);
  }

  const defaultGenderInput =
    Array.from(genderInputs).find(function (input) {
      return input.checked;
    }) || genderInputs[1];

  if (defaultGenderInput) {
    syncGenderSelection(defaultGenderInput.value);
  }

  function initCategoryButtons() {
    if (!categoryList) return;

    const buttons = categoryList.querySelectorAll(".category-btn");
    buttons.forEach(function (button) {
      const category = button.dataset.category;
      if (category === state.activeCategory) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }

      button.addEventListener("click", function () {
        state.activeCategory = this.dataset.category || "earring";
        state.page = 1;

        buttons.forEach(function (item) {
          item.classList.remove("active");
        });
        this.classList.add("active");

        render();
      });
    });
  }

  function matchCategoryByName(productName, categoryKey) {
    const normalizedName = String(productName).toLowerCase();
    const keywordMap = {
      ring: ["nhẫn"],
      necklace: ["dây chuyền"],
      earring: ["bông tai"],
      bracelet: ["vòng tay", "lắc tay", "lắc chân"],
      charm: ["charm"],
    };

    return (keywordMap[categoryKey] || []).some(function (keyword) {
      return normalizedName.includes(keyword);
    });
  }

  function applyFilterAndSort() {
    let filtered = allProducts.filter(function (product) {
      const byCategory = matchCategoryByName(product.name, state.activeCategory);
      const byPrice = parsePrice(product.price) <= state.maxPrice;
      const byStock = !state.inStockOnly || product.inStock;
      const byGender = state.selectedGenders.has(product.gender);
      const byRating = product.rating >= state.minRating;
      const byKeyword = product.name
        .toLowerCase()
        .includes(state.searchKeyword.toLowerCase().trim());

      return byCategory && byPrice && byStock && byGender && byRating && byKeyword;
    });

    if (state.sort === "priceAsc") {
      filtered.sort(function (a, b) {
        return parsePrice(a.price) - parsePrice(b.price);
      });
    } else if (state.sort === "priceDesc") {
      filtered.sort(function (a, b) {
        return parsePrice(b.price) - parsePrice(a.price);
      });
    }

    return filtered;
  }

  function renderPagination(totalItems) {
    if (!paginationWrap) return;

    const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
    if (state.page > totalPages) {
      state.page = totalPages;
    }

    let html = `<span data-page="${Math.max(1, state.page - 1)}">‹</span>`;
    for (let page = 1; page <= totalPages; page += 1) {
      html += `<span class="${page === state.page ? "active" : ""}" data-page="${page}">${page}</span>`;
    }
    html += `<span data-page="${Math.min(totalPages, state.page + 1)}">›</span>`;

    paginationWrap.innerHTML = html;

    const pageButtons = paginationWrap.querySelectorAll("span[data-page]");
    pageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        state.page = Number(this.dataset.page || 1);
        render();
      });
    });
  }

  function render() {
    const filtered = applyFilterAndSort();
    const start = (state.page - 1) * state.pageSize;
    const currentItems = filtered.slice(start, start + state.pageSize);

    if (filterTitle) {
      filterTitle.textContent =
        "Sản phẩm " + (categoryMap[state.activeCategory] || "Danh mục");
    }

    if (resultCount) {
      resultCount.textContent = filtered.length + " sản phẩm";
    }

    if (grid) {
      if (currentItems.length === 0) {
        grid.innerHTML = `<p>Không tìm thấy sản phẩm phù hợp.</p>`;
      } else {
        grid.innerHTML = currentItems
          .map(function (product) {
            return `
              <a href="./trangchitiet.html?id=${product.detailId || product.id}" class="catalog-card">
                <div class="catalog-thumb">
                  ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
                  <span class="wishlist-mini"><i class="fa-solid fa-heart"></i></span>
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="catalog-info">
                  <div class="catalog-name">${product.name}</div>
                  <div class="catalog-price">${product.price}</div>
                </div>
              </a>
            `;
          })
          .join("");
      }
    }

    renderPagination(filtered.length);
  }

  initCategoryButtons();
  render();

  priceRange?.addEventListener("input", function () {
    state.maxPrice = Number(this.value);
    maxPriceLabel.textContent = formatPrice(state.maxPrice);
    state.page = 1;
    render();
  });

  ratingButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      ratingButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      state.minRating = Number(this.dataset.rating || 0);
      state.page = 1;
      render();
    });
  });

  genderInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (!this.checked) {
        syncGenderSelection(this.value);
        return;
      }

      syncGenderSelection(this.value);
      state.page = 1;
      render();
    });
  });

  inStockOnlyInput?.addEventListener("change", function () {
    state.inStockOnly = this.checked;
    state.page = 1;
    render();
  });

  searchInput?.addEventListener("input", function () {
    state.searchKeyword = this.value;
    state.page = 1;
    render();
  });

  sortSelect?.addEventListener("change", function () {
    state.sort = this.value;
    render();
  });
});
*/

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

  const categoryMap = {
    ring: "Nhẫn",
    necklace: "Dây chuyền",
    earring: "Bông tai",
    bracelet: "Vòng tay",
    charm: "Charm",
  };

  const products = [
    { id: 201, detailId: 1, name: "Nhẫn bạc nữ mạ bạch kim đính đá cỏ 4 lá AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "600.000đ", gender: "Nữ", rating: 4.7, inStock: true, discount: "-2%", order: 1 },
    { id: 202, detailId: 2, name: "Nhẫn bạc nữ đính đá hình cánh nơ AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/3.png", price: "568.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 2 },
    { id: 203, detailId: 3, name: "Nhẫn bạc nữ đính đá vương miện công chúa AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/4.png", price: "710.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 3 },
    { id: 204, detailId: 4, name: "Nhẫn bạc nữ đính kim cương Moissanite Aida AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/9.png", price: "1.810.000đ", gender: "Nữ", rating: 4.9, inStock: true, discount: "-6%", order: 4 },
    { id: 205, detailId: 5, name: "Nhẫn bạc nữ đính đá hình bạch xà AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/10.png", price: "1.230.000đ", gender: "Nữ", rating: 4.6, inStock: true, discount: "-6%", order: 5 },
    { id: 206, detailId: 6, name: "Nhẫn bạc nữ đính kim cương Moissanite Sophie AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/11.png", price: "655.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 6 },
    { id: 207, detailId: 7, name: "Nhẫn bạc nữ đính đá hình hoa mai cách điệu Brianna AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/34.png", price: "800.000đ", gender: "Nữ", rating: 4.4, inStock: true, discount: "-2%", order: 7 },
    { id: 208, detailId: 1, name: "Nhẫn bạc nữ đính đá hình cá hồ ly AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/57.png", price: "733.000đ", gender: "Nữ", rating: 4.3, inStock: true, order: 8 },
    { id: 209, detailId: 2, name: "Nhẫn bạc nữ đính kim cương Moissanite hình trái tim AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/58.png", price: "325.000đ", gender: "Nữ", rating: 4.2, inStock: true, order: 9 },
    { id: 210, detailId: 3, name: "Nhẫn bạc đính đá Silver AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/59.png", price: "675.000đ", gender: "Nữ", rating: 4.1, inStock: true, order: 10 },
    { id: 211, detailId: 4, name: "Nhẫn bạc đính đá STYLE AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/60.png", price: "425.000đ", gender: "Nữ", rating: 4.0, inStock: true, order: 11 },
    { id: 212, detailId: 5, name: "Nhẫn bạc đính đá bông hoa STYLE by AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/6.png", price: "755.000đ", gender: "Nữ", rating: 4.3, inStock: true, order: 12 },
    { id: 501, detailId: 1, name: "Nhẫn bạc nam đính đá Roderick AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/9.png", price: "860.000đ", gender: "Nam", rating: 4.7, inStock: true, discount: "-2%", order: 101 },
    { id: 502, detailId: 2, name: "Nhẫn bạc nam đính đá Songe AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/10.png", price: "910.000đ", gender: "Nam", rating: 4.6, inStock: true, order: 102 },
    { id: 503, detailId: 3, name: "Nhẫn bạc nam trơn Kannon AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/11.png", price: "230.000đ", gender: "Nam", rating: 4.2, inStock: true, order: 103 },
    { id: 504, detailId: 4, name: "Nhẫn bạc nam hình 12 con giáp Axton AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/7.png", price: "890.000đ", gender: "Nam", rating: 4.8, inStock: true, discount: "-2%", order: 104 },
    { id: 505, detailId: 5, name: "Nhẫn nam đính đá Topaz MANCODE AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/6.png", price: "978.000đ", gender: "Nam", rating: 4.7, inStock: true, discount: "-2%", order: 105 },
    { id: 506, detailId: 6, name: "Nhẫn bạc nam tròn Ahmed AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/34.png", price: "279.000đ", gender: "Nam", rating: 4.1, inStock: true, order: 106 },
    { id: 507, detailId: 7, name: "Nhẫn bạc nam đính đá chữ Love AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/59.png", price: "330.000đ", gender: "Nam", rating: 4.0, inStock: true, order: 107 },
    { id: 508, detailId: 1, name: "Nhẫn nam tròn cá tính phối xanh AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/60.png", price: "500.000đ", gender: "Nam", rating: 4.3, inStock: true, order: 108 },
    { id: 509, detailId: 2, name: "Nhẫn nam đính đá xám bạc khắc viền AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/57.png", price: "733.000đ", gender: "Nam", rating: 4.4, inStock: true, discount: "-6%", order: 109 },
    { id: 510, detailId: 3, name: "Nhẫn nam đính đá xanh biển mạnh mẽ AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/58.png", price: "1.120.000đ", gender: "Nam", rating: 4.9, inStock: true, discount: "-8%", order: 110 },
    { id: 511, detailId: 4, name: "Nhẫn nam khảm họa tiết mây Charlic AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/10.png", price: "345.000đ", gender: "Nam", rating: 4.2, inStock: true, order: 111 },
    { id: 512, detailId: 5, name: "Nhẫn nam tối giản phối đá trắng AURORA", category: "ring", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "670.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 112 },
    { id: 301, detailId: 6, name: "Dây chuyền nữ đính đá tròn mảnh", category: "necklace", image: "../ảnh/Ảnh chụp màn hình/35.png", price: "915.000đ", gender: "Nữ", rating: 4.2, inStock: true, order: 13 },
    { id: 401, detailId: 7, name: "Bông tai nữ đính đá ánh kim", category: "earring", image: "../ảnh/Ảnh chụp màn hình/8.png", price: "520.000đ", gender: "Nữ", rating: 4.1, inStock: true, order: 14 },
  ];

  function parsePrice(priceText) {
    return Number(String(priceText).replace(/[^\d]/g, ""));
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  function getQueryCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category && categoryMap[category]) {
      return category;
    }
    return "ring";
  }

  const state = {
    activeCategory: getQueryCategory(),
    maxPrice: Number(priceRange?.value || 1500000),
    minRating: 0,
    inStockOnly: inStockOnlyInput?.checked ?? true,
    selectedGenders: new Set(Array.from(genderInputs).map(function (input) {
      return input.value;
    })),
    searchKeyword: "",
    sort: sortSelect?.value || "popular",
    page: 1,
    pageSize: 12,
  };

  function syncGenderSelection(activeValue) {
    genderInputs.forEach(function (input) {
      input.checked = input.value === activeValue;
    });
    if (!activeValue) {
      state.selectedGenders = new Set(Array.from(genderInputs).map(function (input) {
        return input.value;
      }));
      return;
    }
    state.selectedGenders = new Set([activeValue]);
  }

  function isWishlisted(productId) {
    return window.AuroraDB ? window.AuroraDB.isWishlisted(productId) : false;
  }

  function initCategoryButtons() {
    if (!categoryList) return;
    const buttons = categoryList.querySelectorAll(".category-btn");
    buttons.forEach(function (button) {
      button.classList.toggle("active", button.dataset.category === state.activeCategory);
      button.addEventListener("click", function () {
        state.activeCategory = this.dataset.category || "ring";
        state.page = 1;
        buttons.forEach(function (item) {
          item.classList.remove("active");
        });
        this.classList.add("active");
        render();
      });
    });
  }

  function applyFilterAndSort() {
    let filtered = products.filter(function (product) {
      const byCategory = product.category === state.activeCategory;
      const byPrice = parsePrice(product.price) <= state.maxPrice;
      const byStock = !state.inStockOnly || product.inStock;
      const byGender = state.selectedGenders.has(product.gender);
      const byRating = product.rating >= state.minRating;
      const byKeyword = product.name.toLowerCase().includes(state.searchKeyword.toLowerCase().trim());
      return byCategory && byPrice && byStock && byGender && byRating && byKeyword;
    });

    if (state.sort === "priceAsc") {
      filtered.sort(function (a, b) {
        return parsePrice(a.price) - parsePrice(b.price);
      });
    } else if (state.sort === "priceDesc") {
      filtered.sort(function (a, b) {
        return parsePrice(b.price) - parsePrice(a.price);
      });
    } else {
      filtered.sort(function (a, b) {
        return a.order - b.order;
      });
    }
    return filtered;
  }

  function renderPagination(totalItems) {
    if (!paginationWrap) return;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
    if (state.page > totalPages) {
      state.page = totalPages;
    }

    let html = `<span data-page="${Math.max(1, state.page - 1)}">‹</span>`;
    for (let page = 1; page <= totalPages; page += 1) {
      html += `<span class="${page === state.page ? "active" : ""}" data-page="${page}">${page}</span>`;
    }
    html += `<span data-page="${Math.min(totalPages, state.page + 1)}">›</span>`;
    paginationWrap.innerHTML = html;

    paginationWrap.querySelectorAll("span[data-page]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.page = Number(this.dataset.page || 1);
        render();
      });
    });
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

        if (added) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        } else {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        }
      });
    });
  }

  function render() {
    const filtered = applyFilterAndSort();
    const start = (state.page - 1) * state.pageSize;
    const currentItems = filtered.slice(start, start + state.pageSize);

    if (filterTitle) {
      filterTitle.textContent = "Sản phẩm " + (categoryMap[state.activeCategory] || "Danh mục");
    }
    if (resultCount) {
      resultCount.textContent = filtered.length + " sản phẩm";
    }

    if (grid) {
      if (currentItems.length === 0) {
        grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      } else {
        grid.innerHTML = currentItems
          .map(function (product) {
            const wishlisted = isWishlisted(product.id);
            return `
              <a href="./trangchitiet.html?id=${product.detailId || 1}" class="catalog-card">
                <div class="catalog-thumb">
                  ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
                  <span class="wishlist-mini ${wishlisted ? "active" : ""}" data-id="${product.id}"><i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i></span>
                  <span class="add-cart-mini" data-id="${product.id}" title="Thêm vào giỏ"><i class="fa-solid fa-cart-plus"></i></span>
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="catalog-info">
                  <div class="catalog-name">${product.name}</div>
                  <div class="catalog-price">${product.price}</div>
                </div>
              </a>
            `;
          })
          .join("");

        bindWishlistButtons();
        bindCartButtons();
      }
    }

    renderPagination(filtered.length);
  }

  function bindCartButtons() {
    if (!grid) return;
    grid.querySelectorAll(".add-cart-mini").forEach(button => {
      button.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const id = this.dataset.id;
        if (window.AuroraDB) {
            // Find product in local list or global productData
            const product = products.find(p => String(p.id) === String(id)) || 
                           (window.productData && window.productData.find(p => String(p.id) === String(id)));
            if (product) {
                window.AuroraDB.addToCart(product, 1);
            }
        }
      });
    });
  }

  syncGenderSelection();
  initCategoryButtons();
  render();

  priceRange?.addEventListener("input", function () {
    state.maxPrice = Number(this.value);
    maxPriceLabel.textContent = formatPrice(state.maxPrice);
    state.page = 1;
    render();
  });

  ratingButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      ratingButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      state.minRating = Number(this.dataset.rating || 0);
      state.page = 1;
      render();
    });
  });

  genderInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      syncGenderSelection(this.value);
      state.page = 1;
      render();
    });
  });

  inStockOnlyInput?.addEventListener("change", function () {
    state.inStockOnly = this.checked;
    state.page = 1;
    render();
  });

  searchInput?.addEventListener("input", function () {
    state.searchKeyword = this.value;
    state.page = 1;
    render();
  });

  sortSelect?.addEventListener("change", function () {
    state.sort = this.value;
    render();
  });
});
