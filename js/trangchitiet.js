window.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("mainProductImage");
  const thumbs = document.querySelectorAll(".thumb");
  const productName = document.querySelector(".product-summary h1");
  const productPrice = document.querySelector(".product-summary .price");
  const productDesc = document.querySelector(".product-summary .description");
  const thumbList = document.querySelector(".thumbnail-list");

  // Xử lý dữ liệu từ Database (localStorage)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  if (window.AuroraDB && !isNaN(productId)) {
    const product = window.AuroraDB.getProductById(productId);

    if (product) {
      // Cập nhật thông tin text
      if (productName) productName.textContent = product.name;
      if (productPrice) productPrice.textContent = product.price;
      if (productDesc) productDesc.textContent = product.description;

      // Cập nhật thông số sản phẩm
      const specFields = {
        specType: "type",
        specColor: "color",
        specMaterial: "material",
        specStone: "stone",
        specGender: "gender",
        specFinish: "finish",
      };

      for (const [id, key] of Object.entries(specFields)) {
        const el = document.getElementById(id);
        if (el && product[key]) {
          el.textContent = product[key];
        }
      }

      // Cập nhật ảnh chính
      if (mainImage) mainImage.src = product.image;

      // Cập nhật danh sách ảnh thumbnail (nếu có trường images trong data)
      if (product.images && thumbList) {
        thumbList.innerHTML = product.images
          .map(
            (imgUrl, idx) => `
          <button class="thumb ${idx === 0 ? "active" : ""}" type="button" data-image="${imgUrl}">
            <img src="${imgUrl}" alt="Ảnh sản phẩm ${idx + 1}" />
          </button>
        `
          )
          .join("");

        // Gán lại sự kiện click cho các thumbnail mới render
        const newThumbs = document.querySelectorAll(".thumb");
        newThumbs.forEach((thumb) => {
          thumb.addEventListener("click", function () {
            const newImage = this.getAttribute("data-image");
            if (mainImage) mainImage.src = newImage;
            newThumbs.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
          });
        });
      }

      // --- XỬ LÝ YÊU THÍCH (WISHLIST) ---
      const wishlistBtn = document.getElementById("wishlistBtn");
      if (wishlistBtn) {
        const isWishlisted = window.AuroraDB ? window.AuroraDB.isWishlisted(product.id) : false;
        
        const icon = wishlistBtn.querySelector("i");
        if (isWishlisted) {
          icon.classList.replace("fa-regular", "fa-solid");
          wishlistBtn.classList.add("active");
        }

        wishlistBtn.addEventListener("click", function() {
          if (window.AuroraDB) {
            const added = window.AuroraDB.toggleWishlist(product.id);
            if (added) {
              icon.classList.replace("fa-regular", "fa-solid");
              wishlistBtn.classList.add("active");
            } else {
              icon.classList.replace("fa-solid", "fa-regular");
              wishlistBtn.classList.remove("active");
            }
          } else {
            alert("Bạn cần đăng nhập để sử dụng tính năng này!");
          }
        });
      }

      // --- XỬ LÝ GIỎ HÀNG (CART) ---
      const addToCartBtn = document.getElementById("addToCartBtn");
      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function() {
          if (window.AuroraDB) {
            const qty = getSafeQty();
            window.AuroraDB.addToCart(product, qty);
          }
        });
      }

      // Render related products
      renderRelatedProducts(product);
    }
  }

  function renderRelatedProducts(currentProduct) {
    const grid = document.getElementById("relatedGrid");
    if (!grid || !window.productData) return;

    const related = window.productData.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );

    if (related.length > 0) {
      grid.innerHTML = related
        .slice(0, 4)
        .map(
          (product) => `
        <a href="./trangchitiet.html?id=${product.id}" class="product-card">
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
    } else {
      // Fallback: show any 4 products if no category match
      const fallback = window.productData
        .filter((p) => p.id !== currentProduct.id)
        .slice(0, 4);
      grid.innerHTML = fallback
        .map(
          (product) => `
        <a href="./trangchitiet.html?id=${product.id}" class="product-card">
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

  const qtyInput = document.getElementById("productQty");
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");

  function getSafeQty() {
    const parsed = Number(qtyInput.value);
    if (Number.isNaN(parsed) || parsed < 1) {
      return 1;
    }
    return parsed;
  }

  decreaseBtn?.addEventListener("click", function () {
    const current = getSafeQty();
    qtyInput.value = Math.max(1, current - 1);
  });

  increaseBtn?.addEventListener("click", function () {
    const current = getSafeQty();
    qtyInput.value = current + 1;
  });

  qtyInput?.addEventListener("change", function () {
    this.value = getSafeQty();
  });

  const policyBox = document.querySelector(".policy-box");
  const togglePolicy = document.getElementById("togglePolicy");

  togglePolicy?.addEventListener("click", function () {
    policyBox?.classList.toggle("collapsed");
  });

  const loadMoreBtn = document.getElementById("loadMoreReviews");
  loadMoreBtn?.addEventListener("click", function () {
    const hiddenReviews = document.querySelectorAll(".review-card.hidden");
    hiddenReviews.forEach((card) => card.classList.remove("hidden"));
    this.style.display = "none"; // Ẩn nút sau khi đã hiện hết
  });
});
