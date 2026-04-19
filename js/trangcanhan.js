/**
 * Logic handle cho trang cá nhân - Aurora
 */

document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // --- 1. LOAD THÔNG TIN USER TỪ LOCAL STORAGE (NẾU CÓ) ---
  const userJson = localStorage.getItem("auroraUser");
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      // Cập nhật giao diện sidebar
      document.getElementById("userNameDisplay").textContent = user.fullName || "Người dùng Aurora";
      document.getElementById("userEmailDisplay").textContent = user.email || "chua_co_email@example.com";
      
      // Avatar ngẫu nhiên theo tên
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "A")}&background=f28f9f&color=fff&size=128`;
      document.getElementById("userAvatar").src = avatarUrl;

      // Fill vào form
      document.getElementById("inputName").value = user.fullName || "";
      document.getElementById("inputEmail").value = user.email || "";
      if (user.phone) document.getElementById("inputPhone").value = user.phone;
    } catch (e) {
      console.error("Lỗi parse user data", e);
    }
  }

  // --- 2. XỬ LÝ LƯU THAY ĐỔI ---
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const phone = document.getElementById("inputPhone").value;
    
    // Giả lập lưu vào localStorage
    const updatedUser = {
      fullName: name,
      email: email,
      phone: phone
    };
    
    localStorage.setItem("auroraUser", JSON.stringify(updatedUser));
    
    // Hiển thị thông báo
    alert("Cập nhật thành công!");

    // Cập nhật lại hiển thị sidebar
    document.getElementById("userNameDisplay").textContent = name;
    document.getElementById("userEmailDisplay").textContent = email;
  });

  // --- 3. XỬ LÝ ĐĂNG XUẤT ---
  logoutBtn.addEventListener("click", function () {
    if (confirm("Quý khách có chắc chắn muốn đăng xuất không?")) {
      localStorage.removeItem("auroraUser");
      sessionStorage.removeItem("auroraAccess");
      window.location.href = "./trangchu.html";
    }
  });

  // --- 4. TƯƠNG TÁC SẢN PHẨM YÊU THÍCH (BỎ YÊU THÍCH) ---
  const favBtns = document.querySelectorAll(".btn-fav");
  favBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const icon = this.querySelector("i");
      if (this.classList.contains("active")) {
        icon.className = "fa-solid fa-heart";
      } else {
        icon.className = "fa-regular fa-heart";
      }
    });
  });
});
