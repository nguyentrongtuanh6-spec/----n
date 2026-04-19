/**
 * AURORA Database Manager
 * Sử dụng localStorage để giả lập một cơ sở dữ liệu thực tế.
 */

(function() {
  const DB_NAME = "aurora_db";

  const AuroraDB = {
    // --- KHỞI TẠO DỮ LIỆU ---
    init: function (defaultProducts = []) {
      const existingData = this.getAll();
      // Nếu chưa có data hoặc mảng products trống, thì mới khởi tạo
      if (!localStorage.getItem(DB_NAME) || existingData.products.length === 0) {
        const initialData = {
          products: defaultProducts,
          orders: [],
          users: [],
          settings: {
            lastId: defaultProducts.length > 0 ? Math.max(...defaultProducts.map(p => Number(p.id) || 0)) : 100
          }
        };
        this.save(initialData);
        console.log("AuroraDB: Khởi tạo/Cập nhật database thành công.");
      }
    },

    // --- LẤY TOÀN BỘ DATA ---
    getAll: function () {
      const data = localStorage.getItem(DB_NAME);
      if (!data) {
        return { products: [], settings: { lastId: 0 } };
      }
      return JSON.parse(data);
    },

    // --- LƯU TOÀN BỘ DATA ---
    save: function (data) {
      localStorage.setItem(DB_NAME, JSON.stringify(data));
    },

    // --- QUẢN LÝ SẢN PHẨM ---
    getProducts: function () {
      return this.getAll()?.products || [];
    },

    getProductById: function (id) {
      return this.getProducts().find(p => String(p.id) === String(id));
    },

    addProduct: function (product) {
      const data = this.getAll();
      if (!data.settings) data.settings = { lastId: data.products.length > 0 ? Math.max(...data.products.map(p => Number(p.id) || 0)) : 100 };
      data.settings.lastId += 1;
      const status = product.stock > 0 ? "Còn hàng" : "Hết hàng";
      const newProduct = { ...product, id: data.settings.lastId, status };
      data.products.unshift(newProduct);
      this.save(data);
      return newProduct;
    },

    updateProduct: function (id, updatedFields) {
      const data = this.getAll();
      const index = data.products.findIndex(p => String(p.id) === String(id));
      if (index !== -1) {
        const status = updatedFields.stock > 0 ? "Còn hàng" : "Hết hàng";
        data.products[index] = { ...data.products[index], ...updatedFields, id: id, status };
        this.save(data);
        return true;
      }
      return false;
    },

    deleteProduct: function (id) {
      const data = this.getAll();
      data.products = data.products.filter(p => String(p.id) !== String(id));
      this.save(data);
    },

    // --- QUẢN LÝ YÊU THÍCH (WISHLIST) ---
    getWishlist: function() {
      const user = JSON.parse(localStorage.getItem("auroraUser") || "{}");
      if (!user.email) return [];
      const data = this.getAll();
      const userWishlist = data.wishlists?.[user.email] || [];
      return data.products.filter(p => userWishlist.includes(String(p.id)));
    },

    toggleWishlist: function(productId) {
      const user = JSON.parse(localStorage.getItem("auroraUser") || "{}");
      if (!user.email) return false;
      
      const data = this.getAll();
      if (!data.wishlists) data.wishlists = {};
      if (!data.wishlists[user.email]) data.wishlists[user.email] = [];
      
      const pid = String(productId);
      const index = data.wishlists[user.email].indexOf(pid);
      
      if (index === -1) {
        data.wishlists[user.email].push(pid);
      } else {
        data.wishlists[user.email].splice(index, 1);
      }
      
      this.save(data);
      return index === -1; // Trả về true nếu là thêm vào, false nếu là bỏ ra
    }
  };

  // Xuất ra global để các file khác sử dụng
  window.AuroraDB = AuroraDB;
})();
