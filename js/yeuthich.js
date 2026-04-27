const favoriteState = {
  page: 1,
  pageSize: 6,
};

function getProductsSource() {
  if (window.AuroraDB) {
    const dbProducts = window.AuroraDB.getProducts();
    if (dbProducts.length) return dbProducts;
  }
  return window.productData || [];
}

function getFavoriteIds() {
  if (window.AuroraDB) {
    return window.AuroraDB.getWishlistIds().map(String);
  }

  try {
    return (JSON.parse(localStorage.getItem("favoriteProductIds")) || []).map(String);
  } catch {
    return [];
  }
}

function setFavoriteIds(ids) {
  const normalizedIds = ids.map(String);

  if (window.AuroraDB) {
    const user = JSON.parse(localStorage.getItem("auroraUser") || "{}");
    if (user.email) {
      const db = window.AuroraDB.getAll();
      if (!db.wishlists) db.wishlists = {};
      db.wishlists[user.email] = normalizedIds;
      window.AuroraDB.save(db);
      return;
    }
  }

  localStorage.setItem("favoriteProductIds", JSON.stringify(normalizedIds));
}

function getFavoriteProducts() {
  const ids = getFavoriteIds();
  const products = getProductsSource();
  return products.filter((product) => ids.includes(String(product.id)));
}

function normalizePrice(price) {
  if (typeof price === "number") return price.toLocaleString("vi-VN") + "đ";
  return String(price || "").replace(/\s+/g, " ").trim();
}

function getDiscountBadge(product) {
  if (product.discount) return product.discount;
  const numericPrice = Number(String(product.price).replace(/[^\d]/g, ""));
  if (numericPrice > 0 && numericPrice < 1000000) return "-2%";
  return "";
}

function removeFavorite(id) {
  const ids = getFavoriteIds().filter((pid) => String(pid) !== String(id));
  setFavoriteIds(ids);
  renderFavoriteProducts();
}

function addToCart(id) {
  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem("auroraCart")) || [];
  } catch {
    cart = [];
  }

  const existingItem = cart.find((item) => String(item.id) === String(id));

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ id: String(id), quantity: 1 });
  }

  localStorage.setItem("auroraCart", JSON.stringify(cart));
}

function createProductCard(product) {
  const discount = getDiscountBadge(product);

  return `
    <article class="favorite-product-card" data-id="${product.id}">
      <a class="favorite-product-link" href="./trangchitiet.html?id=${product.id}">
        <div class="favorite-image-wrap">
          ${discount ? `<span class="discount-badge">${discount}</span>` : ""}
          <button class="remove-btn" type="button" data-action="remove" data-id="${product.id}" aria-label="Bỏ yêu thích">
            <i class="fa-solid fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}">
        </div>
      </a>
      <div class="favorite-info">
        <div class="name">${product.name}</div>
        <div class="price">${normalizePrice(product.price)}</div>
        <button class="add-cart-btn" type="button" data-action="add-cart" data-id="${product.id}">Thêm giỏ hàng</button>
      </div>
    </article>
  `;
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("favoritePagination");
  if (!pagination) return;

  const totalPages = Math.max(1, Math.ceil(totalItems / favoriteState.pageSize));
  favoriteState.page = Math.min(favoriteState.page, totalPages);

  if (totalItems <= favoriteState.pageSize) {
    pagination.innerHTML = "";
    return;
  }

  let html = `<button type="button" data-page="${Math.max(1, favoriteState.page - 1)}"><i class="fa-solid fa-chevron-left"></i></button>`;
  for (let page = 1; page <= totalPages; page += 1) {
    html += `<span class="${page === favoriteState.page ? "active" : ""}" data-page="${page}">${page}</span>`;
  }
  html += `<button type="button" data-page="${Math.min(totalPages, favoriteState.page + 1)}"><i class="fa-solid fa-chevron-right"></i></button>`;
  pagination.innerHTML = html;

  pagination.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", function () {
      favoriteState.page = Number(this.dataset.page || 1);
      renderFavoriteProducts();
    });
  });
}

function renderFavoriteProducts() {
  const list = document.getElementById("favorite-products-list");
  const countLabel = document.getElementById("favoriteCountLabel");
  if (!list) return;

  const products = getFavoriteProducts();
  const total = products.length;

  if (countLabel) {
    countLabel.textContent = `${total} sản phẩm`;
  }

  if (!total) {
    list.innerHTML = `
      <div class="favorite-empty">
        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
        <span>Hãy thêm các thiết kế bạn thích để lưu lại tại đây.</span>
      </div>
    `;
    renderPagination(0);
    return;
  }

  const start = (favoriteState.page - 1) * favoriteState.pageSize;
  const currentItems = products.slice(start, start + favoriteState.pageSize);
  list.innerHTML = currentItems.map(createProductCard).join("");
  renderPagination(total);
}

document.addEventListener("click", function (event) {
  const removeBtn = event.target.closest("[data-action='remove']");
  if (removeBtn) {
    event.preventDefault();
    event.stopPropagation();
    removeFavorite(removeBtn.dataset.id);
    return;
  }

  const addCartBtn = event.target.closest("[data-action='add-cart']");
  if (!addCartBtn) return;

  event.preventDefault();
  event.stopPropagation();
  addToCart(addCartBtn.dataset.id);
  addCartBtn.textContent = "Đã thêm";
  window.setTimeout(() => {
    addCartBtn.textContent = "Thêm giỏ hàng";
  }, 1200);
});

document.addEventListener("DOMContentLoaded", renderFavoriteProducts);
