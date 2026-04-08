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

  const titleMap = {
    necklace: "Dây chuyền",
  };

  const products = [
    { id: 801, detailId: 1, name: "Dây chuyền bạc nữ đính đá giọt sương AURORA", image: "../ảnh/Ảnh chụp màn hình/35.png", price: "915.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 1 },
    { id: 802, detailId: 2, name: "Dây chuyền bạc nam mặt trơn tối giản", image: "../ảnh/Ảnh chụp màn hình/57.png", price: "680.000đ", gender: "Nam", rating: 4.4, inStock: true, order: 2 },
    { id: 803, detailId: 3, name: "Dây chuyền bạc nữ charm trái tim", image: "../ảnh/Ảnh chụp màn hình/58.png", price: "745.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 3 },
    { id: 804, detailId: 4, name: "Dây chuyền bạc nam bản mảnh hiện đại", image: "../ảnh/Ảnh chụp màn hình/59.png", price: "590.000đ", gender: "Nam", rating: 4.2, inStock: true, discount: "-2%", order: 4 },
    { id: 805, detailId: 5, name: "Dây chuyền nữ đính đá cánh hoa", image: "../ảnh/Ảnh chụp màn hình/60.png", price: "820.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 5 },
    { id: 806, detailId: 6, name: "Dây chuyền nam phối ngọc đen", image: "../ảnh/Ảnh chụp màn hình/11.png", price: "1.020.000đ", gender: "Nam", rating: 4.6, inStock: true, order: 6 },
    { id: 807, detailId: 7, name: "Dây chuyền bạc nữ đá xanh biển", image: "../ảnh/Ảnh chụp màn hình/3.png", price: "770.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 7 },
    { id: 808, detailId: 1, name: "Dây chuyền nam mặt chữ nhật cá tính", image: "../ảnh/Ảnh chụp màn hình/10.png", price: "860.000đ", gender: "Nam", rating: 4.3, inStock: true, order: 8 },
    { id: 809, detailId: 2, name: "Dây chuyền nữ bản nhỏ thanh lịch", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "540.000đ", gender: "Nữ", rating: 4.1, inStock: true, discount: "-6%", order: 9 },
    { id: 810, detailId: 3, name: "Dây chuyền nam mắt xích dày", image: "../ảnh/Ảnh chụp màn hình/7.png", price: "1.210.000đ", gender: "Nam", rating: 4.7, inStock: true, order: 10 },
    { id: 811, detailId: 4, name: "Dây chuyền nữ mặt bông tuyết", image: "../ảnh/Ảnh chụp màn hình/4.png", price: "695.000đ", gender: "Nữ", rating: 4.2, inStock: true, order: 11 },
    { id: 812, detailId: 5, name: "Dây chuyền nam phong cách cổ điển", image: "../ảnh/Ảnh chụp màn hình/9.png", price: "930.000đ", gender: "Nam", rating: 4.4, inStock: true, order: 12 }
  ];

  const state = {
    maxPrice: Number(priceRange?.value || 100000000),
    minRating: 0,
    inStockOnly: inStockOnlyInput?.checked ?? true,
    selectedGender: null,
    searchKeyword: "",
    sort: sortSelect?.value || "popular",
    page: 1,
    pageSize: 12,
  };

  function parsePrice(priceText) {
    return Number(String(priceText).replace(/[^\d]/g, ""));
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  function syncGenderSelection(activeValue) {
    genderInputs.forEach(function (input) {
      input.checked = input.value === activeValue;
    });
    state.selectedGender = activeValue || null;
  }

  function initCategoryButtons() {
    const buttons = categoryList?.querySelectorAll(".male-category-btn") || [];
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const target = pageRoutes[this.dataset.category || "necklace"];
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
    if (state.page > totalPages) state.page = totalPages;

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
        this.classList.toggle("active");
        const icon = this.querySelector("i");
        if (!icon) return;
        if (this.classList.contains("active")) {
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

    if (filterTitle) filterTitle.textContent = "Sản phẩm " + titleMap.necklace;
    if (resultCount) resultCount.textContent = filtered.length + " sản phẩm";

    if (grid) {
      if (currentItems.length === 0) {
        grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      } else {
        grid.innerHTML = currentItems
          .map(function (product) {
            return `
              <a href="./trangchitiet.html?id=${product.detailId}" class="catalog-card">
                <div class="catalog-thumb">
                  ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
                  <span class="wishlist-mini"><i class="fa-regular fa-heart"></i></span>
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
      }
    }

    renderPagination(filtered.length);
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
    state.page = 1;
    render();
  });
});
