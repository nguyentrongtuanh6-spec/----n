window.addEventListener("DOMContentLoaded", function () {
  const welcomeBar = document.getElementById("welcomeBar");
  const userRaw = localStorage.getItem("auroraUser");
  const accessMode = sessionStorage.getItem("auroraAccess");

  if (welcomeBar && userRaw) {
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
  } else if (welcomeBar && accessMode === "guest") {
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
      const filtered = window.productData.filter((p) => p.category === category);
      if (filtered.length > 0) {
        grid.innerHTML = filtered
          .map(
            (product) => `
          <a href="./tranglocsanpham.html?category=${product.category}&focus=${product.id}" class="product-card">
            <div class="product-thumb">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="price">${product.price}</div>
            </div>
          </a>
        `
          )
          .join("");
      }
    }
  }

  function redirectToFilter(category) {
    const targetCategory = category || "all";
    window.location.href = `./tranglocsanpham.html?category=${targetCategory}`;
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    if (card.tagName.toLowerCase() !== "a") {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        redirectToFilter("all");
      });
    }
  });

  document.querySelectorAll(".category-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const name = this.querySelector(".category-name")?.textContent?.trim().toLowerCase();
      if (name?.includes("đôi")) {
        redirectToFilter("couple");
      } else if (name?.includes("charm") || name?.includes("vòng") || name?.includes("dây")) {
        redirectToFilter("custom");
      } else {
        redirectToFilter("favorite");
      }
    });
  });

  document.querySelectorAll(".view-more").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      redirectToFilter("all");
    });
  });

  renderProducts("coupleProductGrid", "couple");
  renderProducts("favoriteProductGrid", "favorite");
  renderProducts("customProductGrid", "custom");
});
