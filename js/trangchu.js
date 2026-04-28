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
  function renderProducts(containerId, category, showAll = false) {
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
        const displayProducts = showAll ? filtered : filtered.slice(0, 4);
        grid.innerHTML = displayProducts.map(
          (product) => {
              const isWishlisted = window.AuroraDB ? window.AuroraDB.isWishlisted(product.id) : false;
              return `
              <div class="product-card">
                <a href="./trangchitiet.html?id=${product.id}" class="product-link">
                  <div class="product-thumb">
                    <img src="${product.image}" alt="${product.name}" />
                  </div>
                  <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="price">${typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + 'đ' : product.price}</div>
                  </div>
                </a>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" style="z-index: 50;">
                  <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart" style="pointer-events: none;"></i>
                </button>
                <button class="add-to-cart-btn" data-id="${product.id}" style="z-index: 50;" title="Thêm vào giỏ">
                  <i class="fa-solid fa-cart-plus" style="pointer-events: none;"></i>
                </button>
              </div>
            `;
            }
          )
          .join("");

        // Gán sự kiện cho các nút Wishlist mới tạo
        grid.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                const id = this.dataset.id;
                if (window.AuroraDB) {
                    const added = window.AuroraDB.toggleWishlist(id);
                    const icon = this.querySelector("i");
                    if (added) {
                        this.classList.add("active");
                        icon.classList.replace("fa-regular", "fa-solid");
                    } else {
                        this.classList.remove("active");
                        icon.classList.replace("fa-solid", "fa-regular");
                    }
                } else {
                    alert("Bạn cần đăng nhập để sử dụng tính năng này!");
                }
            });
        });

        // Gán sự kiện cho các nút Thêm vào giỏ
        grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                const id = this.dataset.id;
                if (window.AuroraDB) {
                    const product = window.AuroraDB.getProductById(id);
                    if (product) {
                        window.AuroraDB.addToCart(product, 1);
                    }
                }
            });
        });
    }
}

  function redirectToFilter(category) {
    const cat = String(category).toLowerCase();
    if (cat.includes("couple")) {
      window.location.href = "./trangsucdoi.html";
    } else if (cat.includes("charm")) {
      window.location.href = "./trangloccharm.html";
    } else if (cat.includes("vòng") || cat.includes("lắc")) {
      window.location.href = "./tranglocvongtay.html";
    } else if (cat.includes("nhẫn")) {
      window.location.href = "./tranglocnhannu.html";
    } else if (cat.includes("dây") || cat.includes("chuyền")) {
      window.location.href = "./tranglocdaychuyen.html";
    } else if (cat.includes("khuyên") || cat.includes("tai") || cat.includes("bông")) {
      window.location.href = "./tranglocbongtai.html";
    } else {
      window.location.href = "./trangsucbo.html";
    }
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
      redirectToFilter(name);
    });
  });

  document.querySelectorAll(".view-more").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.dataset.category || "all";
      redirectToFilter(category);
    });
  });

  // Charm hover preview logic
  const charmItems = document.querySelectorAll(".charm-item");
  const previewImg = document.getElementById("charmPreviewImg");

  charmItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const newSrc = this.dataset.image;
      if (newSrc && previewImg) {
        previewImg.src = newSrc;
      }
    });
  });

  renderProducts("coupleProductGrid", "couple");
  renderProducts("favoriteProductGrid", "favorite");

});
