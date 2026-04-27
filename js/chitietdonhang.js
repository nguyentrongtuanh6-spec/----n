document.addEventListener("DOMContentLoaded", function () {
  const displayOrderId = document.getElementById("displayOrderId");
  const displayOrderDate = document.getElementById("displayOrderDate");
  const displayOrderStatus = document.getElementById("displayOrderStatus");
  const orderItemsList = document.getElementById("orderItemsList");
  const displaySubtotal = document.getElementById("displaySubtotal");
  const displayDiscount = document.getElementById("displayDiscount");
  const displayOrderTotal = document.getElementById("displayOrderTotal");
  const cancelOrderBtn = document.getElementById("cancelOrderBtn");

  // Xử lý lấy ID từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id") || "AUR-12345";

  // Mock data chuyên sâu cho chi tiết đơn hàng
  const ordersDatabase = {
    "LX-3849": {
      date: "20/04/2026",
      status: "shipping",
      statusText: "Đang giao",
      subtotal: "6.510.000đ",
      discount: "0đ",
      total: "6.510.000đ",
      items: [
        {
          id: 4,
          name: "Dây chuyền đôi bạc đính đá tinh xảo voi và bướm Brenna AURORA",
          price: "2.419.000đ",
          qty: 1,
          image: "../ảnh/Ảnh chụp màn hình/5.png",
        },
        {
            id: 3,
            name: "Dây chuyền bạc đôi đính đá tròn cao cấp AURORA",
            price: "2.060.000đ",
            qty: 2,
            image: "../ảnh/Ảnh chụp màn hình/4.png",
          }
      ],
    },
    "AUR-8172": {
      date: "10/01/2026",
      status: "completed",
      statusText: "Hoàn thành",
      subtotal: "10.200.000đ",
      discount: "0đ",
      total: "10.200.000đ",
      items: [
        {
          id: 101,
          name: "Bông tai Ruby Red Heart",
          price: "10.200.000đ",
          qty: 1,
          image: "https://lili.vn/wp-content/uploads/2022/07/Bong-tai-bac-nu-dinh-da-CZ-hinh-trai-tim-do-Ruby-LILI_466474_4.jpg",
        },
      ],
    },
    "AUR-12345": {
        id: "AUR-12345",
        date: "15/04/2026",
        total: "2.641.000đ",
        subtotal: "2.641.000đ",
        discount: "0đ",
        status: "pending",
        statusText: "Chờ xác nhận",
        items: [
          {
            name: "Nhẫn cặp đôi bạc đính đá phong cách hiện đại AURORA",
            price: "1.641.000đ",
            image: "../ảnh/Ảnh chụp màn hình/2.png",
            qty: 1
          },
          {
            name: "Bông tai bạc nơ đính đá xanh sang trọng AURORA",
            price: "1.000.000đ",
            image: "../ảnh/Ảnh chụp màn hình/8.png",
            qty: 1
          }
        ]
      },
  };

  const order = ordersDatabase[orderId] || ordersDatabase["AUR-12345"];

  if (order) {
    renderOrderDetail(orderId, order);
  }

  function renderOrderDetail(id, data) {
    displayOrderId.textContent = `#${id}`;
    displayOrderDate.textContent = data.date;
    displayOrderStatus.textContent = data.statusText;
    displayOrderStatus.className = `status-badge ${data.status}`;

    displaySubtotal.textContent = data.subtotal;
    displayDiscount.textContent = data.discount;
    displayOrderTotal.textContent = data.total;

    // Hiển thị nút hủy nếu trạng thái là pending
    if (data.status === "pending") {
      cancelOrderBtn.classList.remove("hidden");
    }

    // Render danh sách sản phẩm
    orderItemsList.innerHTML = data.items.map(item => `
        <div class="product-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="product-meta">
            <h5>${item.name}</h5>
            <p>Số lượng: ${item.qty}</p>
            <div class="product-price">${item.price}</div>
          </div>
        </div>
    `).join("");
  }

  // Xử lý nút hủy
  cancelOrderBtn?.addEventListener("click", async function () {
    const confirmed = await Aurora.showConfirm(
      "Xác nhận hủy đơn",
      "Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.",
      "Hủy đơn hàng",
      "Quay lại"
    );

    if (confirmed) {
      // Giả lập xử lý hủy
      cancelOrderBtn.disabled = true;
      cancelOrderBtn.textContent = "Đang xử lý...";

      setTimeout(() => {
        Aurora.showAlert(
          "Thành công",
          "Đơn hàng của bạn đã được hủy thành công.",
          "success"
        );
        
        // Cập nhật giao diện
        displayOrderStatus.textContent = "Đã hủy";
        displayOrderStatus.className = "status-badge cancelled";
        cancelOrderBtn.classList.add("hidden");
      }, 1500);
    }
  });
});
