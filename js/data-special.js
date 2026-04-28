/**
 * AURORA Special Collections Data
 * Dữ liệu cho Trang sức bộ và Trang sức đôi
 */

const specialProducts = [
  // --- TRANG SỨC BỘ (JEWELRY SETS) ---
  {
    id: 1001,
    category: "set",
    name: "Bộ trang sức Bạc Ý Crystal Tear",
    price: "3.500.000đ",
    image: "../ảnh/special/set-1.png",
    description: "Bộ trang sức tinh tế bao gồm dây chuyền, bông tai hình giọt lệ và nhẫn mảnh, mang lại vẻ đẹp thanh lịch và thuần khiết.",
    images: ["../ảnh/special/set-1.png"],
    type: "Bộ trang sức",
    color: "Bạc",
    material: "Bạc 925",
    stone: "Zirconia",
    gender: "Nữ",
    finish: "Bóng gương"
  },
  {
    id: 1002,
    category: "set",
    name: "Bộ trang sức Vàng Hồng Emerald Luxury",
    price: "5.800.000đ",
    image: "../ảnh/special/set-2.png",
    description: "Sự kết hợp hoàn hảo giữa sắc vàng hồng thời thượng và đá Emerald xanh huyền bí, tạo nên đẳng cấp cho những buổi tiệc sang trọng.",
    images: ["../ảnh/special/set-2.png"],
    type: "Bộ trang sức",
    color: "Vàng hồng",
    material: "Vàng 14K",
    stone: "Emerald",
    gender: "Nữ",
    finish: "Cao cấp"
  },
  {
    id: 1003,
    category: "set",
    name: "Bộ trang sức Ngọc Trai Empress",
    price: "4.200.000đ",
    image: "../ảnh/special/set-3.png",
    description: "Vẻ đẹp cổ điển từ ngọc trai thiên nhiên kết hợp cùng thiết kế hiện đại, bộ sản phẩm tôn vinh nét dịu dàng của phái đẹp.",
    images: ["../ảnh/special/set-3.png"],
    type: "Bộ trang sức",
    color: "Trắng",
    material: "Bạc mạ bạch kim",
    stone: "Ngọc trai",
    gender: "Nữ",
    finish: "Mượt mà"
  },
  {
    id: 1004,
    category: "set",
    name: "Bộ trang sức Ruby Royal",
    price: "6.500.000đ",
    image: "../ảnh/special/set-4.png",
    description: "Đá Ruby đỏ rực rỡ tượng trưng cho tình yêu và quyền lực, bộ trang sức là lựa chọn hoàn hảo cho những quý cô quyến rũ.",
    images: ["../ảnh/special/set-4.png"],
    type: "Bộ trang sức",
    color: "Đỏ/Bạc",
    material: "Bạc Ý 925",
    stone: "Ruby",
    gender: "Nữ",
    finish: "Sắc sảo"
  },

  // --- TRANG SỨC ĐÔI (COUPLE JEWELRY) ---
  {
    id: 2001,
    category: "couple",
    name: "Cặp nhẫn bạc Eternal Love",
    price: "1.800.000đ",
    image: "../ảnh/special/couple-1.png",
    description: "Thiết kế tối giản nhưng ý nghĩa, cặp nhẫn gắn kết hai trái tim đồng điệu với điểm nhấn đá nhỏ tinh tế.",
    images: ["../ảnh/special/couple-1.png"],
    type: "Nhẫn đôi",
    color: "Bạc",
    material: "Bạc 925",
    stone: "Kim cương nhân tạo",
    gender: "Unisex",
    finish: "Chà nhám/Bóng"
  },
  {
    id: 2002,
    category: "couple",
    name: "Vòng tay đôi Minimalist Soul",
    price: "1.200.000đ",
    image: "../ảnh/special/couple-2.png",
    description: "Cặp vòng tay bạc nguyên khối với mặt khắc chữ theo yêu cầu, món quà kỉ niệm lý tưởng cho các cặp đôi.",
    images: ["../ảnh/special/couple-2.png"],
    type: "Vòng tay đôi",
    color: "Bạc",
    material: "Bạc 925",
    stone: "Không",
    gender: "Unisex",
    finish: "Cổ điển"
  },
  {
    id: 2003,
    category: "couple",
    name: "Dây chuyền đôi Interlocking Circles",
    price: "2.100.000đ",
    image: "../ảnh/special/couple-3.png",
    description: "Biểu tượng hai vòng tròn đan xen thể hiện sự gắn bó không thể tách rời, phối màu đen và bạc hiện đại.",
    images: ["../ảnh/special/couple-3.png"],
    type: "Dây chuyền đôi",
    color: "Bạc/Đen",
    material: "Titanium & Bạc",
    stone: "Zircon",
    gender: "Unisex",
    finish: "Phối màu"
  },
  {
    id: 2004,
    category: "couple",
    name: "Cặp nhẫn vàng hồng Royal Promise",
    price: "7.200.000đ",
    image: "../ảnh/special/couple-4.png",
    description: "Chế tác từ vàng hồng 10K với hoa văn chạm khắc thủ công, khẳng định một lời hứa bền lâu.",
    images: ["../ảnh/special/couple-4.png"],
    type: "Nhẫn đôi",
    color: "Vàng hồng",
    material: "Vàng 10K",
    stone: "Kim cương tự nhiên",
    gender: "Unisex",
    finish: "Chạm khắc"
  }
];

// Xuất dữ liệu ra global để sử dụng
window.specialProducts = specialProducts;

// Tự động thêm vào productData nếu đã tồn tại
if (window.productData) {
  window.productData = [...window.productData, ...specialProducts];
}

// Cập nhật Database nếu có AuroraDB
if (window.AuroraDB) {
  const currentProducts = window.AuroraDB.getProducts();
  // Chỉ thêm nếu chưa có trong DB để tránh trùng lặp khi load lại
  const newItems = specialProducts.filter(sp => !currentProducts.find(p => p.id === sp.id));
  if (newItems.length > 0) {
    const updatedProducts = [...currentProducts, ...newItems];
    window.AuroraDB.save({
      ...window.AuroraDB.getAll(),
      products: updatedProducts
    });
    console.log("AuroraDB: Đã cập nhật thêm " + newItems.length + " sản phẩm đặc biệt.");
  }
}
