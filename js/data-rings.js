const ringData = [
  // NHẪN NỮ (IDs 1000+)
  { id: 1001, detailId: 1, name: "Nhẫn bạc nữ mạ bạch kim đính đá cỏ 4 lá AURORA", image: "../ảnh/Ảnh chụp màn hình/24.png", price: "600.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 1, category: "ring" },
  { id: 1002, detailId: 2, name: "Nhẫn bạc nữ đính đá hình cành lộc non AURORA", image: "../ảnh/Ảnh chụp màn hình/25.png", price: "569.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 2, category: "ring" },
  { id: 1003, detailId: 3, name: "Nhẫn bạc nữ đính đá vương miện công chúa AURORA", image: "../ảnh/Ảnh chụp màn hình/26.png", price: "710.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 3, category: "ring" },
  { id: 1004, detailId: 4, name: "Nhẫn bạc nữ đính kim cương Moissanite Alaia AURORA", image: "../ảnh/Ảnh chụp màn hình/27.png", price: "2.810.000đ", gender: "Nữ", rating: 4.9, inStock: true, order: 4, discount: "-2%", category: "ring" },
  { id: 1005, detailId: 5, name: "Nhẫn bạc nữ đính đá hình bạch xà AURORA", image: "../ảnh/Ảnh chụp màn hình/28.png", price: "1.630.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 5, discount: "-2%", category: "ring" },
  { id: 1006, detailId: 6, name: "Nhẫn bạc nữ đính kim cương Moissanite Sophie AURORA", image: "../ảnh/Ảnh chụp màn hình/29.png", price: "655.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 6, category: "ring" },
  { id: 1007, detailId: 7, name: "Nhẫn bạc nữ đính đá hình hoa mai cách điệu Brianna AURORA", image: "../ảnh/Ảnh chụp màn hình/30.png", price: "900.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 7, discount: "-2%", category: "ring" },
  { id: 1008, detailId: 8, name: "Nhẫn bạc nữ đính đá hình cáo hồ ly AURORA", image: "../ảnh/Ảnh chụp màn hình/31.png", price: "733.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 8, category: "ring" },
  { id: 1009, detailId: 9, name: "Nhẫn bạc nữ đính kim cương Moissanite hình trái tim AURORA", image: "../ảnh/Ảnh chụp màn hình/93.png", price: "325.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 9, category: "ring" },
  { id: 1010, detailId: 10, name: "Nhẫn Bạc đính đá Silver AURORA", image: "../ảnh/Ảnh chụp màn hình/94.png", price: "775.000đ", gender: "Nữ", rating: 4.4, inStock: true, order: 10, category: "ring" },
  { id: 1011, detailId: 11, name: "Nhẫn Bạc đính đá STYLE AURORA", image: "../ảnh/Ảnh chụp màn hình/95.png", price: "425.000đ", gender: "Nữ", rating: 4.3, inStock: true, order: 11, category: "ring" },
  { id: 1012, detailId: 12, name: "Nhẫn Bạc đính đá bông hoa STYLE By AURORA", image: "../ảnh/Ảnh chụp màn hình/96.png", price: "855.000đ", gender: "Nữ", rating: 4.7, inStock: true, order: 12, category: "ring" },
  { id: 1013, name: "Nhẫn bạc nữ đính đá CZ hình trái tim AURORA", image: "../ảnh/Ảnh chụp màn hình/124.png", price: "790.000đ", gender: "Nữ", rating: 4.8, inStock: true, order: 13, category: "ring" },
  { id: 1014, name: "Nhẫn bạc nữ đính đá vô cực tình yêu vĩnh cửu AURORA", image: "../ảnh/Ảnh chụp màn hình/125.png", price: "550.000đ", gender: "Nữ", rating: 4.5, inStock: true, order: 14, category: "ring" },
  { id: 1015, name: "Nhẫn bạc nữ đính đá CZ hình trái tim AURORA", image: "../ảnh/Ảnh chụp màn hình/126.png", price: "390.000đ", gender: "Nữ", rating: 4.6, inStock: true, order: 15, category: "ring" },
  { id: 1016, name: "Nhẫn bạc nữ đính đá Moissanite hình vương miện AURORA", image: "../ảnh/Ảnh chụp màn hình/127.png", price: "3.900.000đ", gender: "Nữ", rating: 4.9, inStock: true, order: 16, category: "ring" },
  { id: 1017, name: "Nhẫn bạc nữ đính đá CZ hình hồ điệp Margot AURORA", image: "../ảnh/Ảnh chụp màn hình/128.png", price: "380.000đ", gender: "Nữ", rating: 5.0, inStock: true, order: 17, category: "ring" },
  { id: 1018, name: "Nhẫn bạc nữ đính đá phong thủy tự nhiên Josephine AURORA", image: "../ảnh/Ảnh chụp màn hình/129.png", price: "780.000đ", gender: "Nữ", rating: 4.4, inStock: true, order: 18, category: "ring" },

  // NHẪN NAM (IDs 1100+)
  { id: 1101, detailId: 1, name: "Nhẫn nam Đính đá AURORA", image: "../ảnh/Ảnh chụp màn hình/81.png", price: "650.000đ", gender: "Nam", rating: 4.8, inStock: true, order: 1, category: "ring" },
  { id: 1102, detailId: 2, name: "Nhẫn bạc nam đính đá Roderick AURORA", image: "../ảnh/Ảnh chụp màn hình/80.png", price: "860.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 2, category: "ring" },
  { id: 1103, detailId: 3, name: "Nhẫn bạc nam đính đá Sage AURORA", image: "../ảnh/Ảnh chụp màn hình/82.png", price: "910.000đ", gender: "Nam", rating: 4.9, inStock: true, order: 3, discount: "-2 %", category: "ring" },
  { id: 1104, detailId: 4, name: "Nhẫn bạc nam hình 12 con giáp Axton AURORA", image: "../ảnh/Ảnh chụp màn hình/83.png", price: "890.000đ", gender: "Nam", rating: 4.2, inStock: true, order: 4, discount: "-2 %", category: "ring" },
  { id: 1105, detailId: 5, name: "Nhẫn bạc nam tròn trơn Kannon AURORA", image: "../ảnh/Ảnh chụp màn hình/84.png", price: "230.000đ", gender: "Nam", rating: 5.0, inStock: true, order: 5, category: "ring" },
  { id: 1106, detailId: 6, name: "Bông tai bạc nam đính đá hình những bông hoa AURORA", image: "../ảnh/Ảnh chụp màn hình/85.png", price: "255.000đ", gender: "Nam", rating: 4.7, inStock: true, order: 6, category: "ring" },
  { id: 1107, name: "Nhẫn bạc nam vòng tròn ma thuật AURORA", image: "../ảnh/Ảnh chụp màn hình/86.png", price: "500.000đ", gender: "Nam", rating: 4.4, inStock: true, order: 7, category: "ring" },
  { id: 1108, name: "Nhẫn nam Đính đá Thuận Buồm Xuôi Gió AURORA", image: "../ảnh/Ảnh chụp màn hình/87.png", price: "1.120.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 8, discount: "-6 %", category: "ring" },
  { id: 1109, name: "Nhẫn bạc nam hình vân mây Charlie AURORA", image: "../ảnh/Ảnh chụp màn hình/88.png", price: "345.000đ", gender: "Nam", rating: 4.7, inStock: true, order: 9, category: "ring" },
  { id: 1110, name: "Nhẫn nam Đính đá Topaz MANCODE AURORA", image: "../ảnh/Ảnh chụp màn hình/90.png", price: "978.000đ", gender: "Nam", rating: 4.3, inStock: true, order: 10, discount: "-2 %", category: "ring" },
  { id: 1111, name: "Nhẫn nam Bạc đính đá chữ Love AURORA", image: "../ảnh/Ảnh chụp màn hình/91.png", price: "330.000đ", gender: "Nam", rating: 4.9, inStock: true, order: 11, category: "ring" },
  { id: 1112, name: "Nhẫn bạc nam trơn Ahmed AURORA", image: "../ảnh/Ảnh chụp màn hình/92.png", price: "279.000đ", gender: "Nam", rating: 4.5, inStock: true, order: 12, category: "ring" },
  { id: 1113, name: "Nhẫn bạc nam tròn trơn đơn giản Teen Top AURORA", image: "../ảnh/Ảnh chụp màn hình/89.png", price: "210.000đ", gender: "Nam", rating: 4.8, inStock: true, order: 13, category: "ring" },
  { id: 1114, name: "Nhẫn bạc nam hình rồng Raphael AURORA", image: "../ảnh/Ảnh chụp màn hình/119.png", price: "2.180.000đ", gender: "Nam", rating: 4.6, inStock: true, order: 14, category: "ring" },
  { id: 1115, name: "Nhẫn bạc nam đính kim cương Moissanite Matthew AURORA", image: "../ảnh/Ảnh chụp màn hình/120.png", price: "3.040.000đ", gender: "Nam", rating: 4.4, inStock: true, order: 15, discount: "-2 %", category: "ring" },
  { id: 1116, name: "Nhẫn bạc nam cá tính phong cách mới Ryland AURORA", image: "../ảnh/Ảnh chụp màn hình/121.png", price: "550.000đ", gender: "Nam", rating: 4.9, inStock: true, order: 16, category: "ring" },
  { id: 1117, name: "Nhẫn bạc nam hình con hổ Gideon AURORA", image: "../ảnh/Ảnh chụp màn hình/122.png", price: "780.000đ", gender: "Nam", rating: 4.2, inStock: true, order: 17, category: "ring" },
  { id: 1118, name: "Nhẫn bạc nam tròn trơn Ezequiel AURORA", image: "../ảnh/Ảnh chụp màn hình/123.png", price: "200.000đ", gender: "Nam", rating: 5.0, inStock: true, order: 18, category: "ring" },

  // NHẪN ĐÔI (IDs 1200+)
  { id: 1201, detailId: 1, name: "Nhẫn cặp đôi bạc đính kim cương Moissanite Layla AURORA", image: "../ảnh/Ảnh chụp màn hình/2.png", price: "2.7410.000đ", gender: "Cặp đôi", rating: 4.9, inStock: true, order: 1, category: "couple" },
  { id: 1202, detailId: 2, name: "Nhẫn đôi bạc free size đính đá CZ hiệp sĩ và công chúa AURORA", image: "../ảnh/Ảnh chụp màn hình/52.png", price: "1.820.000đ", gender: "Cặp đôi", rating: 5.0, inStock: true, order: 2, category: "couple" },
  { id: 1203, detailId: 3, name: "Nhẫn cặp đôi bạc đính kim cương Moissanite Beloved AURORA", image: "../ảnh/Ảnh chụp màn hình/135.png", price: "4.950.000đ", gender: "Cặp đôi", rating: 4.8, inStock: true, order: 3, discount: "-2 %", category: "couple" },
  { id: 1204, detailId: 4, name: "Nhẫn đôi bạc đính đá CZ Alma AURORA", image: "../ảnh/Ảnh chụp màn hình/136.png", price: "1.100.000đ", gender: "Cặp đôi", rating: 4.9, inStock: true, order: 4, category: "couple" }
];

if (window.AuroraDB) {
  window.AuroraDB.init(ringData);
}
if (!window.allProducts) window.allProducts = [];
window.allProducts = [...window.allProducts, ...ringData];
