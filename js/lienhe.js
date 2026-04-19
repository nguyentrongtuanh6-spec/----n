const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email || !phone || !message) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Vui lòng nhập email hợp lệ.");
      return;
    }

    const phonePattern = /^[0-9+\s().-]{8,15}$/;
    if (!phonePattern.test(phone)) {
      alert("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }

    alert("Gửi yêu cầu thành công!");
    contactForm.reset();
  });
}