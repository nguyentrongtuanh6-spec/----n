// Mock data for new collection
const newCollectionData = [
  {
    id: 301,
    name: "Nhẫn Kim Cương Ánh Sao",
    price: 15000000,
    category: "Nhẫn",
    style: "Thanh lịch",
    image: "https://images.unsplash.com/photo-1605100804763-247f66156eb4?w=500&q=80",
    isNew: true,
  },
  {
    id: 302,
    name: "Dây Chuyền Mặt Trăng",
    price: 8500000,
    category: "Dây chuyền",
    style: "Tối giản",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=500&q=80",
    isNew: true,
  },
  {
    id: 303,
    name: "Bông Tai Ngôi Sao Nhỏ",
    price: 4500000,
    category: "Bông tai",
    style: "Thanh lịch",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    isNew: true,
  },
  {
    id: 304,
    name: "Lắc Tay Dạ Quang",
    price: 6200000,
    category: "Vòng tay",
    style: "Cổ điển",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    isNew: true,
  },
  {
    id: 305,
    name: "Nhẫn Đôi Thiên Hà",
    price: 18000000,
    category: "Nhẫn",
    style: "Cổ điển",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80",
    isNew: true,
  },
  {
    id: 306,
    name: "Dây Chuyền Ngọc Trai Đen",
    price: 12000000,
    category: "Dây chuyền",
    style: "Thanh lịch",
    image: "https://images.unsplash.com/photo-1599643477874-befaf88288eb?w=500&q=80",
    isNew: true,
  },
  {
    id: 307,
    name: "Bông Tai Giọt Lệ",
    price: 5200000,
    category: "Bông tai",
    style: "Tối giản",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80",
    isNew: true,
  },
  {
    id: 308,
    name: "Vòng Cổ Ánh Chớp",
    price: 9900000,
    category: "Dây chuyền",
    style: "Cổ điển",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    isNew: true,
  },
];

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = '<div class="no-results">Không tìm thấy sản phẩm phù hợp.</div>';
    const resultCount = document.getElementById("resultCount");
    if (resultCount) resultCount.textContent = "0 sản phẩm";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-thumb">
        ${product.isNew ? '<span class="discount-badge">Mới</span>' : ""}
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="price">${formatPrice(product.price)}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `./trangchitiet.html?id=${product.id}`;
    });

    grid.appendChild(card);
  });

  const resultCount = document.getElementById("resultCount");
  if (resultCount) {
    resultCount.textContent = `${products.length} sản phẩm`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const categoryBtns = document.querySelectorAll(".male-category-btn");
  const styleCheckboxes = document.querySelectorAll(".checkbox-line input");
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPriceLabel");
  const sortSelect = document.getElementById("sortSelect");

  let activeCategory = "Nhẫn"; // Default active category from HTML
  let activeStyles = ["Thanh lịch"]; // Default active style from HTML
  let maxPrice = 20000000;
  let currentSort = "newest";

  function applyFilters() {
    let filtered = newCollectionData.filter((p) => {
      const matchCategory = !activeCategory || p.category === activeCategory;
      const matchStyle = activeStyles.length === 0 || activeStyles.includes(p.style);
      const matchPrice = p.price <= maxPrice;
      return matchCategory && matchStyle && matchPrice;
    });

    // Apply Sorting
    if (currentSort === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
    updateCounts();
  }

  function updateCounts() {
    // Optional: update counts in the sidebar if needed
    categoryBtns.forEach(btn => {
      const cat = btn.querySelector("span:first-child").textContent;
      const countSpan = btn.querySelector(".count");
      const count = newCollectionData.filter(p => p.category === cat).length;
      if (countSpan) countSpan.textContent = count;
    });
  }

  // Category Filter
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.querySelector("span:first-child").textContent;
      applyFilters();
    });
  });

  // Style Filter
  styleCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const styleName = cb.parentElement.textContent.trim();
      if (cb.checked) {
        if (!activeStyles.includes(styleName)) activeStyles.push(styleName);
      } else {
        activeStyles = activeStyles.filter((s) => s !== styleName);
      }
      applyFilters();
    });
  });

  // Price Filter
  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      maxPrice = parseInt(e.target.value);
      if (maxPriceLabel) maxPriceLabel.textContent = formatPrice(maxPrice);
      applyFilters();
    });
  }

  // Sort Filter
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Initial render
  applyFilters();
});

