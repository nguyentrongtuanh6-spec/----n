function resetPassword() {
  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmNewPassword").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (!email || !newPassword || !confirmPassword) {
    error.textContent = "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.textContent = "EMAIL KHÔNG HỢP LỆ.";
    return;
  }

  const storedUserRaw = localStorage.getItem("auroraUser");
  if (!storedUserRaw) {
    error.textContent = "EMAIL KHÔNG ĐƯỢC ĐĂNG KÝ.";
    return;
  }

  const storedUser = JSON.parse(storedUserRaw);
  if (storedUser.email !== email) {
    error.textContent = "EMAIL KHÔNG ĐƯỢC ĐĂNG KÝ.";
    return;
  }

  if (newPassword.length < 6) {
    error.textContent = "MẬT KHẨU PHẢI TỪ 6 KÝ TỰ TRỞ LÊN.";
    return;
  }

  if (newPassword !== confirmPassword) {
    error.textContent = "MẬT KHẨU XÁC NHẬN KHÔNG KHỚP.";
    return;
  }

  storedUser.password = newPassword;
  localStorage.setItem("auroraUser", JSON.stringify(storedUser));

  alert("Mật khẩu đã được cập nhật thành công!");
  window.location.href =
    "./trangdangnhap.html?email=" + encodeURIComponent(email);
}
