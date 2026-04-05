window.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const emailFromRegister = params.get("email");

  if (emailFromRegister) {
    document.getElementById("email").value = emailFromRegister;
  }
});

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (!email || !password) {
    error.textContent = "PHẢI NHẬP ĐỦ CÁC THÔNG TIN";
    return;
  }

  const storedUserRaw = localStorage.getItem("auroraUser");
  if (storedUserRaw) {
    const storedUser = JSON.parse(storedUserRaw);
    if (storedUser.email !== email || storedUser.password !== password) {
      error.textContent = "EMAIL HOẶC MẬT KHẨU KHÔNG ĐÚNG.";
      return;
    }
  }

  alert("Đăng nhập thành công!");
  sessionStorage.setItem("auroraAccess", "member");
  window.location.href = "./trangchu.html";
}

function guestAccess() {
  sessionStorage.setItem("auroraAccess", "guest");
  localStorage.removeItem("auroraUserTemp");
  window.location.href = "./trangchu.html";
}
