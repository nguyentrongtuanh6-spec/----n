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


// --- NEW CHARMS (101-120) ---
products.push(
  { id: 101, category: "charm", name: "Charm Cỏ 4 Lá May Mắn", price: "250.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm cỏ 4 lá mang lại may mắn." },
  { id: 102, category: "charm", name: "Charm Ngôi Sao Hy Vọng", price: "200.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm ngôi sao sáng lấp lánh." },
  { id: 103, category: "charm", name: "Charm Bướm Xinh", price: "300.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm hình bướm tinh xảo." },
  { id: 104, category: "charm", name: "Charm Trái Tim Kim Cương", price: "450.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm trái tim đính đá lấp lánh." },
  { id: 105, category: "charm", name: "Charm Hoa Hướng Dương", price: "280.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm hoa hướng dương rực rỡ." },
  { id: 106, category: "charm", name: "Charm Đôi Cánh Thiên Thần", price: "350.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm đôi cánh thiên thần bình an." },
  { id: 107, category: "charm", name: "Charm Vương Miện", price: "400.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm vương miện quyền quý." },
  { id: 108, category: "charm", name: "Charm Chìa Khóa Tình Yêu", price: "320.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm chìa khóa mở cửa trái tim." },
  { id: 109, category: "charm", name: "Charm Thỏ Trắng", price: "270.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm thỏ trắng dễ thương." },
  { id: 110, category: "charm", name: "Charm Mặt Trăng Khuyết", price: "240.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm mặt trăng huyền bí." },
  { id: 111, category: "charm", name: "Charm Gấu Bông", price: "290.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm gấu bông đáng yêu." },
  { id: 112, category: "charm", name: "Charm Hoa Hồng Ân", price: "310.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm hoa hồng lãng mạn." },
  { id: 113, category: "charm", name: "Charm Mũi Tên Tình Yêu", price: "260.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm mũi tên Cupid." },
  { id: 114, category: "charm", name: "Charm Quả Cầu Tuyết", price: "380.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm quả cầu pha lê." },
  { id: 115, category: "charm", name: "Charm Chuông Gió", price: "330.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm chuông ngân vang." },
  { id: 116, category: "charm", name: "Charm Cá Heo", price: "280.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm cá heo thông minh." },
  { id: 117, category: "charm", name: "Charm Pháo Hoa", price: "340.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm pháo hoa rực rỡ." },
  { id: 118, category: "charm", name: "Charm Ánh Dương", price: "370.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm mặt trời tỏa nắng." },
  { id: 119, category: "charm", name: "Charm Lá Phong", price: "230.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm lá phong mùa thu." },
  { id: 120, category: "charm", name: "Charm Nơ Xinh", price: "250.000đ", image: "../ảnh/charm-gen/charm-collection.png", description: "Charm chiếc nơ điệu đà." }
);

// --- NEW BASES (201-212) ---
products.push(
  { id: 201, category: "base", name: "Vòng Tay Bạc Trơn Cơ Bản", price: "500.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng bạc 925 trơn thanh lịch." },
  { id: 202, category: "base", name: "Vòng Tay Bạc Mắt Xích", price: "600.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng mắt xích cá tính." },
  { id: 203, category: "base", name: "Vòng Tay Bạc Cứng", price: "550.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng kiềng bạc cứng cáp." },
  { id: 204, category: "base", name: "Vòng Tay Bạc Dây Xoắn", price: "650.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng dây xoắn độc đáo." },
  { id: 205, category: "base", name: "Vòng Tay Bạc Nam Châm", price: "700.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng khóa nam châm tiện lợi." },
  { id: 206, category: "base", name: "Vòng Tay Vàng Trắng", price: "1.200.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Vòng mạ vàng trắng cao cấp." },
  { id: 207, category: "base", name: "Dây Chuyền Bạc Sợi Mảnh", price: "400.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây chuyền mảnh nữ tính." },
  { id: 208, category: "base", name: "Dây Chuyền Bạc Xích Tròn", price: "450.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây xích tròn thời trang." },
  { id: 209, category: "base", name: "Dây Chuyền Bạc Ý", price: "500.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây chuyền bạc Ý 925." },
  { id: 210, category: "base", name: "Dây Chuyền Bạc Chữ V", price: "550.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây thiết kế chữ V." },
  { id: 211, category: "base", name: "Dây Chuyền Bạc Đính Bi", price: "600.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây chuyền điểm bi bạc." },
  { id: 212, category: "base", name: "Dây Chuyền Mạ Vàng 14K", price: "900.000đ", image: "../ảnh/charm-gen/base-collection.png", description: "Dây mạ vàng 14K sang trọng." }
);

if (window.AuroraDB) {
  window.AuroraDB.init(products);
}

