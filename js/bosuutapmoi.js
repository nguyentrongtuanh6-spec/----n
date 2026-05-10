// Mock data for new collection
const newCollectionData = [
  {
    id: 301,
    name: "Nhẫn Kim Cương Ánh Sao",
    price: 15000000,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f66156eb4?w=500&q=80",
    isNew: true,
  },
  {
    id: 302,
    name: "Dây Chuyền Mặt Trăng",
    price: 8500000,
    image:
      "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=500&q=80",
    isNew: true,
  },
  {
    id: 303,
    name: "Bông Tai Ngôi Sao Nhỏ",
    price: 4500000,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    isNew: true,
  },
  {
    id: 304,
    name: "Lắc Tay Dạ Quang",
    price: 6200000,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    isNew: true,
  },
  {
    id: 305,
    name: "Nhẫn Đôi Thiên Hà",
    price: 18000000,
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80",
    isNew: true,
  },
  {
    id: 306,
    name: "Dây Chuyền Ngọc Trai Đen",
    price: 12000000,
    image:
      "https://images.unsplash.com/photo-1599643477874-befaf88288eb?w=500&q=80",
    isNew: true,
  },
  {
    id: 307,
    name: "Bông Tai Giọt Lệ",
    price: 5200000,
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80",
    isNew: true,
  },
  {
    id: 308,
    name: "Vòng Cổ Ánh Chớp",
    price: 9900000,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    isNew: true,
  },
];

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

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

    // Add click event to navigate to detail page
    card.addEventListener("click", () => {
      // Assuming you pass ID via URL param
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
  let currentProducts = [...newCollectionData];
  renderProducts(currentProducts);

  // Sort handler
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const type = e.target.value;
      if (type === "priceAsc") {
        currentProducts.sort((a, b) => a.price - b.price);
      } else if (type === "priceDesc") {
        currentProducts.sort((a, b) => b.price - a.price);
      } else {
        // default to "newest" / reset
        currentProducts = [...newCollectionData];
      }
      renderProducts(currentProducts);
    });
  }
});
