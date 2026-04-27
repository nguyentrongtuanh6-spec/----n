window.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("mainProductImage");
  const productName = document.querySelector(".product-summary h1");
  const productPrice = document.querySelector(".product-summary .price-value");
  const productDesc = document.querySelector(".product-summary .short-desc");
  const thumbList = document.querySelector(".thumbnail-column");
  const productSkuEl = document.getElementById("productSku");

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
      if (productSkuEl) productSkuEl.textContent = `AU-00${product.id}`;

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

      // Cập nhật danh sách ảnh thumbnail
      const imagesToShow = product.images && product.images.length > 0 ? product.images : [product.image];
      
      if (thumbList) {
        thumbList.innerHTML = imagesToShow
          .map(
            (imgUrl, idx) => `
          <button class="thumb ${idx === 0 ? "active" : ""}" type="button" data-image="${imgUrl}">
            <img src="${imgUrl}" alt="Ảnh sản phẩm ${idx + 1}" />
          </button>
        `
          )
          .join("");

        // Gán sự kiện click cho các thumbnail mới render
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

      // Render related products
      renderRelatedProducts(product);

      // Xử lý yêu thích (Wishlist)
      const wishlistBtn = document.getElementById("wishlistBtn");
      if (wishlistBtn) {
        const isWishlisted = window.AuroraDB.isWishlisted(product.id);
        const icon = wishlistBtn.querySelector("i");
        if (isWishlisted) {
          icon.classList.replace("fa-regular", "fa-solid");
          wishlistBtn.classList.add("active");
        }

        wishlistBtn.addEventListener("click", function() {
          const added = window.AuroraDB.toggleWishlist(product.id);
          if (added) {
            icon.classList.replace("fa-regular", "fa-solid");
            wishlistBtn.classList.add("active");
          } else {
            icon.classList.replace("fa-solid", "fa-regular");
            wishlistBtn.classList.remove("active");
          }
        });
      }
    }
  }

  function renderRelatedProducts(currentProduct) {
    const grid = document.getElementById("relatedGrid");
    if (!grid || !window.productData) return;

    const related = window.productData.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );

    const displayProducts = (related.length > 0 ? related : window.productData.filter(p => p.id !== currentProduct.id)).slice(0, 4);

    grid.innerHTML = displayProducts.map(
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
    ).join("");
  }

  // Tăng giảm số lượng
  const qtyInput = document.getElementById("productQty");
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");

  function getSafeQty() {
    const parsed = Number(qtyInput.value);
    if (Number.isNaN(parsed) || parsed < 1) return 1;
    return parsed;
  }

  decreaseBtn?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, getSafeQty() - 1);
  });

  increaseBtn?.addEventListener("click", () => {
    qtyInput.value = getSafeQty() + 1;
  });

  // Accordion Policy
  const policyBox = document.getElementById("policyBox");
  const togglePolicy = document.getElementById("togglePolicy");

  togglePolicy?.addEventListener("click", () => {
    policyBox?.classList.toggle("active");
  });

  // Load more reviews
  const loadMoreBtn = document.getElementById("loadMoreReviews");
  loadMoreBtn?.addEventListener("click", function () {
    document.querySelectorAll(".review-card.hidden").forEach((card) => card.classList.remove("hidden"));
    this.style.display = "none";
  });
});
