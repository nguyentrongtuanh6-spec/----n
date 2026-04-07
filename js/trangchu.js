window.addEventListener("DOMContentLoaded", function () {
  const welcomeBar = document.getElementById("welcomeBar");
  if (!welcomeBar) {
    return;
  }

  const userRaw = localStorage.getItem("auroraUser");
  const accessMode = sessionStorage.getItem("auroraAccess");

  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      if (user.fullName) {
        welcomeBar.textContent =
          "Xin chào " +
          user.fullName +
          "! Khám phá các mẫu trang sức mới hôm nay.";
      }
    } catch (error) {
      welcomeBar.textContent = "Xin chào! Chúc bạn mua sắm vui vẻ tại AURORA.";
    }
  } else if (accessMode === "guest") {
    welcomeBar.textContent =
      "Bạn đang xem với vai trò khách. Vẫn có thể khám phá toàn bộ sản phẩm tại AURORA.";
  }

  // Wishlist functionality
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");
  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("active");
    });
  });

  // --- RENDERING DYNAMIC PRODUCTS ---
  function renderProducts(containerId, category) {
    const grid = document.getElementById(containerId);
    if (grid && window.productData) {
      const filtered = window.productData.filter(p => p.category === category);
      if (filtered.length > 0) {
        grid.innerHTML = filtered.map(product => `
          <a href="./trangchitiet.html?id=${product.id}" class="product-card">
            <div class="product-thumb">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="price">${product.price}</div>
            </div>
          </a>
        `).join("");
      }
    }
  }

  renderProducts("coupleProductGrid", "couple");
  renderProducts("favoriteProductGrid", "favorite");
  renderProducts("customProductGrid", "custom");
});
