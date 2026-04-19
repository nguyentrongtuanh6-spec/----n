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
    if (!grid) return;

    // Lấy dữ liệu từ Database (Admin)
    let allProducts = window.AuroraDB ? window.AuroraDB.getProducts() : [];
    
    // Nếu Database hoàn toàn trống (chưa có gì), mới dùng dữ liệu mẫu
    if (allProducts.length === 0) {
      allProducts = window.productData || [];
    }

    // Lọc theo danh mục (couple, favorite, custom)
    let filtered = allProducts.filter((p) => p.category === category);
    
    // NẾU BẠN VỪA THÊM SẢN PHẨM MỚI MÀ CHƯA CHỌN ĐÚNG NHÓM
    // Chúng tôi sẽ lấy thêm các sản phẩm mới nhất để lấp đầy grid (để bạn thấy kết quả ngay)
    if (filtered.length < 4) {
        const others = allProducts.filter(p => p.category !== category).slice(0, 4 - filtered.length);
        filtered = [...filtered, ...others];
    }

    if (filtered.length > 0) {
        grid.innerHTML = filtered
          .slice(0, 8) // Hiển thị tối đa 8 sản phẩm mỗi mục
          .map(
            (product) => `
          <a href="./trangchitiet.html?id=${product.id}" class="product-card">
            <div class="product-thumb">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="price">${typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + 'đ' : product.price}</div>
            </div>
          </a>
        `
          )
          .join("");
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

  // --- HIỆU ỨNG HOVER THAY ĐỔI ẢNH CHÍNH (SÁNG TẠO) ---
  const customMainImg = document.querySelector(".custom-left img");
  const charmItems = document.querySelectorAll(".charm-item");

  if (customMainImg && charmItems.length > 0) {
    charmItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const newSrc = this.querySelector("img")?.src;
        if (newSrc) {
          // Thêm một chút hiệu ứng chuyển cảnh mượt mà
          customMainImg.style.opacity = "0.5";
          setTimeout(() => {
            customMainImg.src = newSrc;
            customMainImg.style.opacity = "1";
          }, 150);
        }
      });
    });
  }
});
