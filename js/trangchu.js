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

  // --- NEW CHARM CREATIVE SECTION LOGIC ---
  function initCharmCreative() {
    const charmBaseGrid = document.getElementById("charmBaseGrid");
    const charmCardGrid = document.getElementById("charmCardGrid");
    const mainImg = document.getElementById("charmMainPreviewImg");
    const selectedCountEl = document.getElementById("charmSelectedCount");
    const totalPriceEl = document.getElementById("charmTotalPrice");
    const btnCart = document.getElementById("charmAddToCartBtn");
    const btnBuy = document.getElementById("charmBuyNowBtn");

    if (!charmBaseGrid || !charmCardGrid) return;

    let allProducts = window.AuroraDB ? window.AuroraDB.getProducts() : [];
    if (allProducts.length === 0) allProducts = window.productData || [];

    // Filter charms and bases
    const charms = allProducts.filter(p => p.category === "charm");
    // Get some bases or default to rings/necklaces if 'base' is empty
    let bases = allProducts.filter(p => p.category === "base");
    if(bases.length === 0) bases = allProducts.filter(p => p.category === "couple" || p.category === "favorite").slice(0,4);

    // Limit to 4 bases for UI
    bases = bases.slice(0, 4);

    // Render Bases
    charmBaseGrid.innerHTML = bases.map(base => `
      <div class="charm-base-card" data-id="${base.id}" data-price="${parsePrice(base.price)}" data-image="${base.image}">
        <img src="${base.image}" alt="${base.name}">
        <div class="base-name">${base.name}</div>
        <div class="base-price">${base.price}</div>
      </div>
    `).join("");

    // Render Charms
    charmCardGrid.innerHTML = charms.map(charm => `
      <div class="charm-sel-card" data-id="${charm.id}" data-price="${parsePrice(charm.price)}" data-image="${charm.image}">
        <div class="sel-check"></div>
        <img src="${charm.image}" alt="${charm.name}">
        <div class="sel-name">${charm.name}</div>
        <div class="sel-price">${charm.price}</div>
      </div>
    `).join("");

    // State
    let selectedBaseId = null;
    let selectedCharmIds = new Set();
    let currentPreviewHover = null;

    function parsePrice(priceStr) {
      if(typeof priceStr === 'number') return priceStr;
      return parseInt(priceStr.replace(/[^\d]/g, "")) || 0;
    }

    function formatPrice(num) {
      return num.toLocaleString('vi-VN') + 'đ';
    }

    function updateSummary() {
      let total = 0;
      let count = selectedCharmIds.size;

      if (selectedBaseId) {
        const baseEl = document.querySelector(`.charm-base-card[data-id="${selectedBaseId}"]`);
        if (baseEl) {
          total += parseInt(baseEl.dataset.price);
          count += 1;
        }
      }

      selectedCharmIds.forEach(id => {
        const charmEl = document.querySelector(`.charm-sel-card[data-id="${id}"]`);
        if (charmEl) total += parseInt(charmEl.dataset.price);
      });

      selectedCountEl.textContent = `${count} đã chọn`;
      totalPriceEl.innerHTML = `Tổng cộng: <strong>${formatPrice(total)}</strong>`;
      
      // Update preview based on base
      if(!currentPreviewHover && selectedBaseId) {
         const baseEl = document.querySelector(`.charm-base-card[data-id="${selectedBaseId}"]`);
         if(mainImg && baseEl) mainImg.src = baseEl.dataset.image;
      }
    }

    // Base Selection
    document.querySelectorAll(".charm-base-card").forEach(card => {
      card.addEventListener("click", function() {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          selectedBaseId = null;
          if(mainImg) mainImg.src = "../ảnh/charm-gen/charm-hero.png";
        } else {
          document.querySelectorAll(".charm-base-card").forEach(c => c.classList.remove("active"));
          this.classList.add("active");
          selectedBaseId = this.dataset.id;
          if(mainImg) mainImg.src = this.dataset.image;
        }
        updateSummary();
      });

      card.addEventListener("mouseenter", function() {
        currentPreviewHover = this.dataset.image;
        if(mainImg) mainImg.src = currentPreviewHover;
      });
      card.addEventListener("mouseleave", function() {
        currentPreviewHover = null;
        if(selectedBaseId) {
           const activeBase = document.querySelector(".charm-base-card.active");
           if(mainImg && activeBase) mainImg.src = activeBase.dataset.image;
        } else {
           if(mainImg) mainImg.src = "../ảnh/charm-gen/charm-hero.png";
        }
      });
    });

    // Charm Selection
    document.querySelectorAll(".charm-sel-card").forEach(card => {
      card.addEventListener("click", function() {
        const id = this.dataset.id;
        if (this.classList.contains("checked")) {
          this.classList.remove("checked");
          selectedCharmIds.delete(id);
        } else {
          this.classList.add("checked");
          selectedCharmIds.add(id);
        }
        updateSummary();
      });
      
      card.addEventListener("mouseenter", function() {
        currentPreviewHover = this.dataset.image;
        if(mainImg) mainImg.src = currentPreviewHover;
      });
      card.addEventListener("mouseleave", function() {
        currentPreviewHover = null;
        if(selectedBaseId) {
           const activeBase = document.querySelector(".charm-base-card.active");
           if(mainImg && activeBase) mainImg.src = activeBase.dataset.image;
        } else {
           if(mainImg) mainImg.src = "../ảnh/charm-gen/charm-hero.png";
        }
      });
    });

    // Add to cart & Buy Now
    function getSelectedProducts() {
      let items = [];
      if (selectedBaseId) {
        const prod = allProducts.find(p => p.id == selectedBaseId);
        if (prod) items.push(prod);
      }
      selectedCharmIds.forEach(id => {
        const prod = allProducts.find(p => p.id == id);
        if (prod) items.push(prod);
      });
      return items;
    }

    if (btnCart) {
      btnCart.addEventListener("click", () => {
        const items = getSelectedProducts();
        if (items.length === 0) return alert("Vui lòng chọn ít nhất một sản phẩm (Vòng hoặc Charm)!");
        
        if (window.AuroraDB) {
          items.forEach(item => window.AuroraDB.addToCart(item, 1));
          alert(`Đã thêm ${items.length} sản phẩm vào giỏ hàng!`);
          
          // Reset
          selectedBaseId = null;
          selectedCharmIds.clear();
          document.querySelectorAll(".charm-base-card").forEach(c => c.classList.remove("active"));
          document.querySelectorAll(".charm-sel-card").forEach(c => c.classList.remove("checked"));
          updateSummary();
          if(mainImg) mainImg.src = "../ảnh/charm-gen/charm-hero.png";
        }
      });
    }

    if (btnBuy) {
      btnBuy.addEventListener("click", () => {
        const items = getSelectedProducts();
        if (items.length === 0) return alert("Vui lòng chọn ít nhất một sản phẩm!");
        
        if (window.AuroraDB) {
          items.forEach(item => window.AuroraDB.addToCart(item, 1));
          window.location.href = "./tranggiohang.html";
        }
      });
    }
  }

  initCharmCreative();

  renderProducts("coupleProductGrid", "couple");
  renderProducts("favoriteProductGrid", "favorite");

});
