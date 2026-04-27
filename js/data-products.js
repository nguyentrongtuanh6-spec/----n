const products = [
  {
    id: 1,
    category: "couple",
    name: "Nhẫn cặp đôi bạc đính đá phong cách hiện đại AURORA",
    price: "1.641.000đ",
    image: "../ảnh/Ảnh chụp màn hình/2.png",
    description: "Nhẫn cặp đôi bạc đính đá phong cách hiện đại AURORA mang đến sự kết nối tinh tế.",
    images: ["../ảnh/Ảnh chụp màn hình/2.png", "../ảnh/Ảnh chụp màn hình/3.png"],
    type: "Nhẫn",
    color: "Bạc",
    material: "Bạc 925",
    stone: "Moissanite",
    gender: "Couple (Đôi)",
    finish: "Xuất sắc"
  },
  {
    id: 2,
    category: "couple",
    name: "Lắc tay bạc cặp đôi thời thượng Love Forever",
    price: "1.582.000đ",
    image: "../ảnh/Ảnh chụp màn hình/3.png",
    description: "Lắc tay bạc cặp đôi thời thượng Love Forever với họa tiết độc đáo.",
    images: ["../ảnh/Ảnh chụp màn hình/3.png", "../ảnh/Ảnh chụp màn hình/4.png"]
  },
  {
    id: 3,
    category: "couple",
    name: "Dây chuyền bạc đôi đính đá tròn cao cấp AURORA",
    price: "2.060.000đ",
    image: "../ảnh/Ảnh chụp màn hình/4.png",
    description: "Mẫu dây chuyền đôi bán chạy nhất năm với sự tinh xảo trong từng đường nét.",
    images: ["../ảnh/Ảnh chụp màn hình/4.png"]
  },
  {
    id: 4,
    category: "couple",
    name: "Dây chuyền đôi bạc phối charm thời trang trẻ trung",
    price: "2.419.000đ",
    image: "../ảnh/Ảnh chụp màn hình/5.png",
    description: "Mẫu dây chuyền đôi trẻ trung, phù hợp phong cách năng động.",
    images: ["../ảnh/Ảnh chụp màn hình/5.png", "../ảnh/Ảnh chụp màn hình/4.png"]
  },
  {
    id: 5,
    category: "favorite",
    name: "Lắc tay bạc nữ đính pha lê tinh xảo kiểu bản mảnh AURORA",
    price: "975.000đ",
    image: "../ảnh/Ảnh chụp màn hình/6.png",
    description: "Thiết kế bản mảnh thanh lịch, dễ phối trang phục hàng ngày.",
    images: ["../ảnh/Ảnh chụp màn hình/6.png"]
  },
  {
    id: 6,
    category: "favorite",
    name: "Lắc chân bạc nữ đính đá hình hoa mềm mại AURORA",
    price: "799.000đ",
    image: "../ảnh/Ảnh chụp màn hình/7.png",
    description: "Mẫu lắc chân nữ tính giúp tôn vẻ đẹp nhẹ nhàng.",
    images: ["../ảnh/Ảnh chụp màn hình/7.png"]
  },
  {
    id: 7,
    category: "favorite",
    name: "Bông tai bạc nơ đính đá xanh sang trọng AURORA",
    price: "1.041.000đ",
    image: "../ảnh/Ảnh chụp màn hình/8.png",
    description: "Điểm nhấn nơ đính đá xanh cho phong cách sang trọng.",
    images: ["../ảnh/Ảnh chụp màn hình/8.png"]
  },
  {
    id: 8,
    category: "favorite",
    name: "Nhẫn bạc nơ đính kim cương mô phỏng tinh tế AURORA",
    price: "1.299.000đ",
    image: "../ảnh/Ảnh chụp màn hình/9.png",
    description: "Thiết kế nhẫn nơ thanh lịch phù hợp nhiều dịp.",
    images: ["../ảnh/Ảnh chụp màn hình/9.png"]
  },
  {
    id: 9,
    category: "favorite",
    name: "Bộ trang sức đính đá đồng bộ hoa tuyết cá tính",
    price: "1.255.000đ",
    image: "../ảnh/Ảnh chụp màn hình/10.png",
    description: "Bộ trang sức đồng bộ nổi bật với họa tiết hoa tuyết.",
    images: ["../ảnh/Ảnh chụp màn hình/10.png"]
  },
  {
    id: 10,
    category: "favorite",
    name: "Dây chuyền đá AURORA thiết kế thanh lịch",
    price: "1.780.000đ",
    image: "../ảnh/Ảnh chụp màn hình/11.png",
    description: "Mẫu dây chuyền sang trọng, phù hợp phong cách tinh tế.",
    images: ["../ảnh/Ảnh chụp màn hình/11.png"]
  },
  {
    id: 11,
    category: "favorite",
    name: "Dây chuyền bạc nữ đính đá hình thiên nga AURORA",
    price: "1.030.000đ",
    image: "../ảnh/Ảnh chụp màn hình/12.png",
    description: "Mặt dây chuyền thiên nga biểu tượng của vẻ đẹp duyên dáng.",
    images: ["../ảnh/Ảnh chụp màn hình/12.png"]
  },
  {
    id: 12,
    category: "favorite",
    name: "Bông tai bạc nữ đính đá AURORA thanh mảnh",
    price: "850.000đ",
    image: "../ảnh/Ảnh chụp màn hình/13.png",
    description: "Thiết kế bông tai thanh mảnh, dễ phối đồ hằng ngày.",
    images: ["../ảnh/Ảnh chụp màn hình/13.png"]
  },
  {
    id: 13,
    category: "custom",
    name: "Dây chuyền bạc đính đá",
    price: "490.000đ",
    image: "../ảnh/Ảnh chụp màn hình/57.png",
    description: "Dây chuyền bạc đính đá với thiết kế gọn nhẹ.",
    images: ["../ảnh/Ảnh chụp màn hình/57.png"]
  },
  {
    id: 14,
    category: "custom",
    name: "Dây chuyền bạc thiết kế mắt xích",
    price: "415.000đ",
    image: "../ảnh/Ảnh chụp màn hình/58.png",
    description: "Thiết kế mắt xích hiện đại cho phong cách trẻ trung.",
    images: ["../ảnh/Ảnh chụp màn hình/58.png"]
  },
  {
    id: 15,
    category: "custom",
    name: "Vòng tay bạc Marvel khóa Logo Marvel",
    price: "480.000đ",
    image: "../ảnh/Ảnh chụp màn hình/59.png",
    description: "Vòng tay cá tính với khóa logo độc đáo.",
    images: ["../ảnh/Ảnh chụp màn hình/59.png"]
  },
  {
    id: 16,
    category: "custom",
    name: "Dây chuyền Moments dạng xích nút thắt dài",
    price: "560.000đ",
    image: "../ảnh/Ảnh chụp màn hình/60.png",
    description: "Kiểu dáng xích nút thắt tạo điểm nhấn thời thượng.",
    images: ["../ảnh/Ảnh chụp màn hình/60.png"]
  },
  {
    id: 17,
    category: "custom",
    name: "Vòng cổ bạc phối charm AURORA",
    price: "750.000đ",
    image: "../ảnh/Ảnh chụp màn hình/34.png",
    description: "Mẫu vòng cổ phối charm linh hoạt theo phong cách riêng.",
    images: ["../ảnh/Ảnh chụp màn hình/34.png"]
  },
  {
    id: 18,
    category: "charm",
    name: "Charm bạc nữ tinh tế cao cấp",
    price: "660.000đ",
    image: "../ảnh/Ảnh chụp màn hình/1.png",
    description: "Charm bạc nữ tinh tế cao cấp với thiết kế hiện đại, tỉ mỉ.",
    images: ["../ảnh/Ảnh chụp màn hình/1.png"]
  },
  {
    id: 19,
    category: "charm",
    name: "Charm trái tim nhỏ đính đá",
    price: "450.000đ",
    image: "../ảnh/Ảnh chụp màn hình/54.png",
    description: "Charm trái tim nhỏ đính đá mang thông điệp tình yêu ngọt ngào.",
    images: ["../ảnh/Ảnh chụp màn hình/54.png"]
  },
  {
    id: 20,
    category: "charm",
    name: "Charm trăng sao phối đá màu",
    price: "220.000đ",
    image: "../ảnh/Ảnh chụp màn hình/55.png",
    description: "Charm trăng sao phối đá màu tạo điểm nhấn huyền bí.",
    images: ["../ảnh/Ảnh chụp màn hình/55.png"]
  },
  {
    id: 21,
    category: "charm",
    name: "Charm bạc kiểu hiện đại AURORA",
    price: "880.000đ",
    image: "../ảnh/Ảnh chụp màn hình/56.png",
    description: "Charm bạc kiểu hiện đại AURORA tôn vinh vẻ đẹp cá nhân.",
    images: ["../ảnh/Ảnh chụp màn hình/56.png"]
  },
  {
    id: 22,
    category: "charm",
    name: "Charm bướm dịu dàng nữ tính",
    price: "650.000đ",
    image: "../ảnh/Ảnh chụp màn hình/14.png",
    description: "Charm bướm dịu dàng nữ tính cho sự uyển chuyển tự nhiên.",
    images: ["../ảnh/Ảnh chụp màn hình/14.png"]
  },
  {
    id: 23,
    category: "charm",
    name: "Charm hoa tuyết lấp lánh AURORA",
    price: "1.243.000đ",
    image: "../ảnh/Ảnh chụp màn hình/15.png",
    description: "Charm hoa tuyết lấp lánh AURORA cho mùa đông thêm rạng rỡ.",
    images: ["../ảnh/Ảnh chụp màn hình/15.png"]
  }
];

window.productData = products;

// Khởi tạo Database nếu chưa có
if (window.AuroraDB) {
  window.AuroraDB.init(products);
}
