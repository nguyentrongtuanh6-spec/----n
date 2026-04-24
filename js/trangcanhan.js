/**
 * Logic handle cho trang cá nhân - Aurora
 */

document.addEventListener("DOMContentLoaded", function () {
    // Hiển thị số lượng sản phẩm yêu thích từ localStorage
    function updateFavoriteCount() {
      let count = 0;
      try {
        const ids = JSON.parse(localStorage.getItem('favoriteProductIds'));
        if (Array.isArray(ids)) count = ids.length;
      } catch {}
      const el = document.getElementById('favoriteCount');
      if (el) el.textContent = count;
    }
    updateFavoriteCount();
    window.addEventListener('storage', updateFavoriteCount);
    // Nếu có thao tác thêm/bớt yêu thích ở trang khác, reload lại số này khi quay lại
    document.addEventListener('visibilitychange', function() { if (!document.hidden) updateFavoriteCount(); });
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

  // --- 4. TƯƠNG TÁC SẢN PHẨM YÊU THÍCH (DYNAMIC RENDERING & PAGINATION) ---
  const favoriteGrid = document.querySelector(".favorite-grid");
  const stats = document.querySelectorAll(".stat-item .stat-value");
  const wishlistCountLabel = stats[1]; 
  const totalFavLabel = document.querySelector(".favorite-grid")?.parentElement.querySelector(".view-all");
  const paginationContainer = document.querySelector(".favorite-grid")?.parentElement.querySelector(".pagination");

  const wishlistState = {
    page: 1,
    pageSize: 6 // Mỗi trang hiện 6 sản phẩm
  };

  function renderWishlist() {
    if (!favoriteGrid || !window.AuroraDB) return;
    
    const favorites = window.AuroraDB.getWishlist();
    const total = favorites.length;
    const totalPages = Math.ceil(total / wishlistState.pageSize);
    
    // Cập nhật số lượng
    if (wishlistCountLabel) wishlistCountLabel.textContent = total;
    if (totalFavLabel) totalFavLabel.textContent = `${total} SẢN PHẨM`;

    // Nếu không có sản phẩm hoặc chỉ có 1 trang, ẩn phân trang
    if (paginationContainer) {
      paginationContainer.style.display = totalPages > 1 ? "flex" : "none";
    }

    if (total === 0) {
      favoriteGrid.innerHTML = `
        <div class="no-data" style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: #888; font-style: italic;">
          <i class="fa-regular fa-heart" style="font-size: 40px; display: block; margin-bottom: 10px; opacity: 0.3;"></i>
          Bạn chưa có sản phẩm yêu thích nào.
        </div>
      `;
      return;
    }

    // Cắt dữ liệu theo trang
    const start = (wishlistState.page - 1) * wishlistState.pageSize;
    const pagedFavorites = favorites.slice(start, start + wishlistState.pageSize);

    favoriteGrid.innerHTML = pagedFavorites.map(product => `
      <div class="fav-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <button class="btn-fav active" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
        <div class="fav-info">
          <h4>${product.name}</h4>
          <div class="price">${typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + 'đ' : product.price}</div>
        </div>
      </div>
    `).join("");

    // Vẽ lại các nút phân trang
    if (paginationContainer && totalPages > 1) {
        let html = `<button class="prev" ${wishlistState.page === 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page ${wishlistState.page === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        html += `<button class="next" ${wishlistState.page === totalPages ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>`;
        paginationContainer.innerHTML = html;

        // Gán sự kiện chuyển trang
        paginationContainer.querySelectorAll(".page").forEach(btn => {
            btn.addEventListener("click", function() {
                wishlistState.page = parseInt(this.dataset.page);
                renderWishlist();
                window.scrollTo({ top: favoriteGrid.offsetTop - 100, behavior: 'smooth' });
            });
        });
        
        paginationContainer.querySelector(".prev")?.addEventListener("click", () => {
            if (wishlistState.page > 1) {
                wishlistState.page--;
                renderWishlist();
            }
        });

        paginationContainer.querySelector(".next")?.addEventListener("click", () => {
            if (wishlistState.page < totalPages) {
                wishlistState.page++;
                renderWishlist();
            }
        });
    }

    // Gán sự kiện bỏ yêu thích
    favoriteGrid.querySelectorAll(".btn-fav").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const id = this.dataset.id;
        window.AuroraDB.toggleWishlist(id);
        renderWishlist(); 
      });
    });
  }

  renderWishlist();
});
