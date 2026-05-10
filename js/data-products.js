const products = [
  {
    id: 1,
    category: "couple",
    name: "Nhẫn cặp đôi bạc đính kim cương Moissanite Layla AURORA",
    price: "2.741.000đ",
    image: "../ảnh/Ảnh chụp màn hình/2.png",
    description: "Nhẫn cặp đôi bạc đính đá phong cách hiện đại AURORA mang đến sự kết nối tinh tế.",
    images: ["../ảnh/Ảnh chụp màn hình/3.png", "../ảnh/Ảnh chụp màn hình/3.png"],
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
    price: "1.520.000đ",
    image: "../ảnh/Ảnh chụp màn hình/3.png",
    description: "Lắc tay bạc cặp đôi thời thượng Love Forever với họa tiết độc đáo.",
    images: ["../ảnh/Ảnh chụp màn hình/3.png", "../ảnh/Ảnh chụp màn hình/4.png"]
  },
  {
    id: 3,
    category: "couple",
    name: "Dây chuyền bạc đôi đính đá cá voi và biển Lance AURORA",
    price: "2.060.000đ",
    image: "../ảnh/Ảnh chụp màn hình/4.png",
    description: "Mẫu dây chuyền đôi bán chạy nhất năm với sự tinh xảo trong từng đường nét.",
    images: ["../ảnh/Ảnh chụp màn hình/4.png"]
  },
  {
    id: 4,
    category: "couple",
    name: "Dây chuyền bạc đôi đính đá cá voi và biển Lance AURORA",
    price: "2.449.000đ",
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
    name: "Bộ trang sức đính đá hình bông tuyết Zoe AURORA",
    price: "3.225.000đ",
    discount: "-6%",
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
    price: "1.120.000đ",
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
    id: 30,
    category: "favorite",
    name: "Dây chuyền bạc mặt chữ V thanh lịch",
    price: "760.000đ",
    image: "../ảnh/Ảnh chụp màn hình/11.png",
    description: "Thiết kế chữ V tinh tế, tôn vinh vùng cổ quyến rũ.",
    images: ["../ảnh/Ảnh chụp màn hình/11.png"]
  },
  {
    id: 31,
    category: "favorite",
    name: "Bông tai bạc trơn hình học phong cách tối giản",
    price: "550.000đ",
    image: "../ảnh/Ảnh chụp màn hình/13.png",
    description: "Bông tai hình học tối giản, dễ phối đồ hàng ngày.",
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
    name: "Charm ME Bạc Cánh Thiên Thần Ôm Trái Tim Hồng  AURORA",
    price: "660.000đ",
    image: "../ảnh/Ảnh chụp màn hình/1.png",
    description: "Charm bạc nữ tinh tế cao cấp với thiết kế hiện đại, tỉ mỉ.",
    images: ["../ảnh/Ảnh chụp màn hình/1.png"]
  },
  {
    id: 19,
    category: "charm",
    name: "Hạt charm bạc nữ đính đá hình chiếc nơ Sienna AURORA",
    price: "450.000đ",
    image: "../ảnh/Ảnh chụp màn hình/54.png",
    description: "Charm trái tim nhỏ đính đá mang thông điệp tình yêu ngọt ngào.",
    images: ["../ảnh/Ảnh chụp màn hình/54.png"]
  },
  {
    id: 20,
    category: "charm",
    name: "Hạt charm bạc nữ đính đá hình ngôi sao băng Astrid AURORA",
    price: "777.000đ",
    image: "../ảnh/Ảnh chụp màn hình/55.png",
    description: "Charm trăng sao phối đá màu tạo điểm nhấn huyền bí.",
    images: ["../ảnh/Ảnh chụp màn hình/55.png"]
  },
  {
    id: 21,
    category: "charm",
    name: "Hạt charm bạc nữ đính đá hình tiên cá AURORA",
    price: "580.000đ",
    image: "../ảnh/Ảnh chụp màn hình/56.png",
    description: "Charm bạc kiểu hiện đại AURORA tôn vinh vẻ đẹp cá nhân.",
    images: ["../ảnh/Ảnh chụp màn hình/56.png"]
  },
  {
    id: 22,
    category: "charm",
    name: "Charm Bạc Moments Khế Ước Vô Cực AURORA",
    price: "918.000đ",
    image: "../ảnh/Ảnh chụp màn hình/14.png",
    description: "Charm bướm dịu dàng nữ tính cho sự uyển chuyển tự nhiên.",
    images: ["../ảnh/Ảnh chụp màn hình/14.png"]
  },
  {
    id: 23,
    category: "charm",
    name: "Charm hoa tuyết lấp lánh AURORA",
    price: "1.423.000đ",
    image: "../ảnh/Ảnh chụp màn hình/15.png",
    description: "Charm hoa tuyết lấp lánh AURORA cho mùa đông thêm rạng rỡ.",
    images: ["../ảnh/Ảnh chụp màn hình/15.png"]
  }
];

window.productData = products;


// --- NEW CHARMS (101-120) ---
products.push(
  {
    id: 101, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình trái tim đóng mở gắn ảnh AURORA",
    price: "2.222.000đ",
    image: "../ảnh/Ảnh chụp màn hình/18.png",
    description: "Hạt charm bạc nữ đính đá hình trái tim đóng mở gắn ảnh AURORA."
  },

  {
    id: 102, category: "charm",
    name: "Hạt charm bạc nữ đính đ hình giấc mơ trời sao Harow AURORA",
    price: "1.450.000đ",
    image: "../ảnh/Ảnh chụp màn hình/20.png",
    description: "Hạt charm bạc nữ đính đá hình giấc mơ trời sao Harow AURORA."
  },

  {
    id: 103, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình hồ điệp AURORA",
    price: "1.107.000đ",
    image: "../ảnh/Ảnh chụp màn hình/23.png",
    description: "Hạt charm bạc nữ đính đá hình hồ điệp AURORA."
  },

  {
    id: 104,
    category: "charm",
    name: "Hạt charm bạc nữ đính đá tròn Florence AURORA",
    price: "950.000đ",
    image: "../ảnh/Ảnh chụp màn hình/21.png",
    description: "Hạt charm bạc nữ đính đá tròn Florence AURORA."
  },

  {
    id: 105, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình hoa mặt trời Elsie AURORA",
    price: "1.515.000đ",
    image: "../ảnh/Ảnh chụp màn hình/22.png",
    description: "Hạt charm bạc nữ đính đá hình hoa mặt trời Elsie AURORA."
  },

  {
    id: 108, category: "charm",
    name: "Hạt charm bạc nữ đính đá Alayna AURORA",
    price: "890.000đ",
    image: "../ảnh/Ảnh chụp màn hình/67.png",
    description: "Hạt charm bạc nữ đính đá Alayna AURORA."
  },

  {
    id: 109, category: "charm",
    name: "Hạt charm bạc nữ đính đá Milani AURORA", price: "965.000đ",
    image: "../ảnh/Ảnh chụp màn hình/68.png",
    description: "Hạt charm bạc nữ đính đá Milani AURORA."
  },

  {
    id: 110, category: "charm",
    name: "Hạt charm bạc nữ đính đá Amira AURORA", price: "810.000đ",
    image: "../ảnh/Ảnh chụp màn hình/69.png",
    description: "Hạt charm bạc nữ đính đá Amira AURORA."
  },

  {
    id: 111, category: "charm",
    name: "Hạt charm bạc nữ đính đá Everleigh AURORA", price: "979.000đ",
    image: "../ảnh/Ảnh chụp màn hình/70.png",
    description: "Hạt charm bạc nữ đính đá Everleigh AURORA."
  },

  {
    id: 112, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình đôi cánh thiên thần Mariana", price: "855.000đ",
    image: "../ảnh/Ảnh chụp màn hình/71.png",
    description: "Hạt charm bạc nữ đính đá hình đôi cánh thiên thần Mariana."
  },

  {
    id: 113, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình hồ điệp AURORA", price: "520.000đ",
    image: "../ảnh/Ảnh chụp màn hình/72.png",
    description: "Hạt charm bạc nữ đính đá hình hồ điệp AURORA."
  },

  {
    id: 116, category: "charm",
    name: "Hạt charm bạc nữ đính đá hình hoa tuyết AURORA", price: "990.000đ",
    image: "../ảnh/Ảnh chụp màn hình/73.png",
    description: "Hạt charm bạc nữ đính đá hình hoa tuyết AURORA."
  },

  {
    id: 117, category: "charm",
    name: "Hạt charm bạc nữ đính đá phù thủy xứ OZ Mila AURORA", price: "999.000đ",
    image: "../ảnh/Ảnh chụp màn hình/74.png",
    description: "Hạt charm bạc nữ đính đá phù thủy xứ OZ Mila AURORA."
  },
  {
    id: 118, category: "charm",
    name: "Hạt charm bạc nữ DIY đính đá hình hồ điệp Jenesis AURORA", price: "1.080.000đ",
    image: "../ảnh/Ảnh chụp màn hình/75.png",
    description: "Hạt charm bạc nữ DIY đính đá hình hồ điệp Jenesis AURORA."
  },

  {
    id: 119, category: "charm",
    name: "Hạt charm bạc nữ đính đá giấc mơ vũ trụ Monica AURORA", price: "892.000đ",
    image: "../ảnh/Ảnh chụp màn hình/76.png",
    description: "Hạt charm bạc nữ đính đá giấc mơ vũ trụ Monica AURORA."
  },

  {
    id: 120, category: "charm",
    name: "Hạt charm bạc nữ DIY đính đá hình động vật AURORA", price: "1.150.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Hạt charm bạc nữ DIY đính đá hình động vật AURORA."
  }
);

// --- NEW BASES (201-212) ---
products.push(
  {
    id: 201, category: "base",
    name: "Vòng cổ bạc trơn AURORA", price: "350.000đ",
    image: "../ảnh/Ảnh chụp màn hình/32.png",
    description: "Vòng cổ bạc trơn AURORA."
  },

  {
    id: 202, category: "base",
    name: "Lắc tay bạc nữ trơn AURORA",
    price: "410.000đ",
    image: "../ảnh/Ảnh chụp màn hình/78.png",
    description: "Lắc tay bạc nữ trơn AURORA."
  },

  {
    id: 203, category: "base",
    name: "Vòng bạc nữ DIY dạng chuỗi xoắn Sabrina AURORA", price: "420.000đ",
    image: "../ảnh/Ảnh chụp màn hình/59.png",
    description: "Vòng bạc nữ DIY dạng chuỗi xoắn Sabrina AURORA."
  },

  {
    id: 204, category: "base",
    name: "Vòng Cổ Bạc Thái AURORA", price: "450.000đ",
    image: "../ảnh/Ảnh chụp màn hình/34.png",
    description: "Vòng Cổ Bạc Thái AURORA."
  },

  {
    id: 205, category: "base",
    name: "Vòng Tay Bạc Nam Châm", price: "700.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Vòng khóa nam châm tiện lợi."
  },

  {
    id: 206, category: "base",
    name: "Vòng Tay Vàng Trắng", price: "1.200.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Vòng mạ vàng trắng cao cấp."
  },

  {
    id: 207, category: "base",
    name: "Dây Chuyền Bạc Sợi Mảnh", price: "400.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Dây chuyền mảnh nữ tính."
  },

  {
    id: 208, category: "base",
    name: "Dây Chuyền Bạc Xích Tròn", price: "450.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Dây xích tròn thời trang."
  },

  {
    id: 209, category: "base",
    name: "Dây Chuyền Bạc Ý", price: "500.000đ",
    image: "../ảnh/Ảnh chụp màn hình/77.png",
    description: "Dây chuyền bạc Ý 925."
  },

  {
    id: 210, category: "base",
    name: "Dây Chuyền Bạc Chữ V",
    price: "550.000đ",
    image: "../ảnh/charm-gen/base-collection.png",
    description: "Dây thiết kế chữ V."
  },

);

// --- BỘ SƯU TẬP MỚI (301-308) ---
products.push(
  {
    id: 301, category: "new",
    name: "Nhẫn Kim Cương Ánh Sao", price: "15.000.000đ",
    image: "https://images.unsplash.com/photo-1605100804763-247f66156eb4?w=500&q=80",
    description: "Nhẫn Kim Cương Ánh Sao sang trọng, tinh tế.",
    images: ["https://images.unsplash.com/photo-1605100804763-247f66156eb4?w=500&q=80"]
  },
  {
    id: 302, category: "new",
    name: "Dây Chuyền Mặt Trăng", price: "8.500.000đ",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=500&q=80",
    description: "Dây Chuyền Mặt Trăng cuốn hút.",
    images: ["https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=500&q=80"]
  },
  {
    id: 303, category: "new",
    name: "Bông Tai Ngôi Sao Nhỏ", price: "4.500.000đ",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    description: "Bông Tai Ngôi Sao Nhỏ lấp lánh.",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80"]
  },
  {
    id: 304, category: "new",
    name: "Lắc Tay Dạ Quang", price: "6.200.000đ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    description: "Lắc Tay Dạ Quang nổi bật trong đêm.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80"]
  },
  {
    id: 305, category: "new",
    name: "Nhẫn Đôi Thiên Hà", price: "18.000.000đ",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80",
    description: "Nhẫn Đôi Thiên Hà gắn kết tình yêu.",
    images: ["https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80"]
  },
  {
    id: 306, category: "new",
    name: "Dây Chuyền Ngọc Trai Đen", price: "12.000.000đ",
    image: "https://images.unsplash.com/photo-1599643477874-befaf88288eb?w=500&q=80",
    description: "Dây Chuyền Ngọc Trai Đen quý phái.",
    images: ["https://images.unsplash.com/photo-1599643477874-befaf88288eb?w=500&q=80"]
  },
  {
    id: 307, category: "new",
    name: "Bông Tai Giọt Lệ", price: "5.200.000đ",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80",
    description: "Bông Tai Giọt Lệ thanh khiết.",
    images: ["https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80"]
  },
  {
    id: 308, category: "new",
    name: "Vòng Cổ Ánh Chớp", price: "9.900.000đ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    description: "Vòng Cổ Ánh Chớp cá tính.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80"]
  }
);

if (window.AuroraDB) {
  window.AuroraDB.init(products);
}
