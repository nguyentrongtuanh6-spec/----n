/**
 * Logic handle cho trang Hủy đơn hàng - Aurora
 * Sử dụng dữ liệu giả lập cho mục đích demo
 */

document.addEventListener("DOMContentLoaded", function () {
  const orderIdInput = document.getElementById("orderIdInput");
  const searchOrderBtn = document.getElementById("searchOrderBtn");
  const orderDetails = document.getElementById("orderDetails");
  const displayOrderId = document.getElementById("displayOrderId");
  const orderItemsList = document.getElementById("orderItemsList");
  const displayOrderDate = document.getElementById("displayOrderDate");
  const displayOrderTotal = document.getElementById("displayOrderTotal");
  const confirmCancelBtn = document.getElementById("confirmCancelBtn");
  const statusMessage = document.getElementById("statusMessage");
  const otherReasonText = document.getElementById("otherReasonText");
  const reasonRadios = document.querySelectorAll('input[name="cancelReason"]');

  // MOCK DATA: Danh sách đơn hàng giả lập
  const mockOrders = {
    "AUR-12345": {
      date: "15/04/2026",
      total: "2.641.000đ",
      status: "Chờ xác nhận",
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
    "AUR-99999": {
      date: "18/04/2026",
      total: "1.582.000đ",
      status: "Đang đóng gói",
      items: [
        {
          name: "Lắc tay bạc cặp đôi thời thượng Love Forever",
          price: "1.582.000đ",
          image: "../ảnh/Ảnh chụp màn hình/3.png",
          qty: 1
        }
      ]
    }
  };

  function showAlert(title, message, type = "success") {
    Aurora.showAlert(title, message, type);
  }

  // 1. Xử lý tìm kiếm đơn hàng
  searchOrderBtn.addEventListener("click", function () {
    const id = orderIdInput.value.trim().toUpperCase();
    
    if (!id) {
      showAlert("Thông báo", "Vui lòng nhập mã đơn hàng của quý khách.", "error");
      return;
    }

    const order = mockOrders[id];

    if (order) {
      // Hiển thị thông tin đơn hàng
      displayOrderId.textContent = `#${id}`;
      displayOrderDate.textContent = order.date;
      displayOrderTotal.textContent = order.total;
      
      // Thiết lập trạng thái ban đầu
      const statusBadge = document.getElementById("displayOrderStatus");
      statusBadge.textContent = order.status;
      statusBadge.className = "status-badge " + (order.status === "Chờ xác nhận" ? "pending" : "processing");

      // Reset form hủy (trong trường hợp đơn trước đó vừa hủy xong)
      document.querySelector(".cancellation-reason").classList.remove("hidden");
      confirmCancelBtn.classList.remove("hidden");
      confirmCancelBtn.textContent = "Xác nhận hủy đơn hàng";
      confirmCancelBtn.disabled = false;
      
      // Render danh sách sản phẩm
      orderItemsList.innerHTML = order.items.map(item => `
        <div class="product-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="product-meta">
            <h5>${item.name}</h5>
            <p>Số lượng: ${item.qty}</p>
            <div class="product-price">${item.price}</div>
          </div>
        </div>
      `).join("");

      orderDetails.classList.remove("hidden");
      statusMessage.classList.add("hidden");
    } else {
      showAlert("Tìm kiếm thất bại", `Không tìm thấy đơn hàng "${id}". Quý khách vui lòng kiểm tra lại mã hoặc liên hệ hotline. (Gợi ý mã: AUR-12345)`, "error");
      orderDetails.classList.add("hidden");
    }
  });

  // 2. Xử lý hiển thị textarea lý do khác
  reasonRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.value === "Khác") {
        otherReasonText.classList.remove("hidden");
      } else {
        otherReasonText.classList.add("hidden");
      }
    });
  });

  // 3. Xử lý xác nhận hủy đơn
  confirmCancelBtn.addEventListener("click", function () {
    let selectedReason = "";
    document.querySelectorAll('input[name="cancelReason"]').forEach(radio => {
      if (radio.checked) selectedReason = radio.value;
    });

    if (!selectedReason) {
      showAlert("Thông báo", "Vui lòng lựa chọn lý do quý khách muốn hủy đơn hàng.", "error");
      return;
    }

    // Hiệu ứng loading giả lập
    confirmCancelBtn.textContent = "Đang xử lý...";
    confirmCancelBtn.disabled = true;

    setTimeout(() => {
      // Cập nhật trạng thái ngay trên thẻ đơn hàng
      const statusBadge = document.getElementById("displayOrderStatus");
      statusBadge.textContent = "Đã hủy";
      statusBadge.className = "status-badge cancelled";

      // Ẩn phần chọn lý do và nút xác nhận
      document.querySelector(".cancellation-reason").classList.add("hidden");
      confirmCancelBtn.classList.add("hidden");

      // Hiển thị thông báo thành công đẹp mắt
      showAlert("Thao tác thành công", `Đơn hàng ${displayOrderId.textContent} của quý khách đã được chuyển sang trạng thái Hủy.`, "success");
    }, 1500);
  });
});
