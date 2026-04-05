function register() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (
    !fullName ||
    !email ||
    !phone ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    error.textContent = "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.textContent = "EMAIL KHÔNG HỢP LỆ.";
    return;
  }

  if (password.length < 6) {
    error.textContent = "MẬT KHẨU PHẢI TỪ 6 KÝ TỰ TRỞ LÊN.";
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = "XÁC NHẬN MẬT KHẨU KHÔNG KHỚP.";
    return;
  }

  const user = { fullName, email, phone, address, password };
  localStorage.setItem("auroraUser", JSON.stringify(user));

  alert("Đăng ký thành công! Mời bạn đăng nhập.");
  window.location.href =
    "./trangdangnhap.html?email=" + encodeURIComponent(email);
}
