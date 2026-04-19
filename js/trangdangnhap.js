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

  // --- LOGIC ĐĂNG NHẬP ADMIN ---
  if (email === "admin@aurora.vn" && password === "admin") {
    alert("Đăng nhập QUẢN TRỊ VIÊN thành công!");
    sessionStorage.setItem("auroraAccess", "admin");
    window.location.href = "./thongkeadm.html";
    return;
  }

  // --- LOGIC ĐĂNG NHẬP MEMBER ---
  const storedUserRaw = localStorage.getItem("auroraUser");
  if (storedUserRaw) {
    const storedUser = JSON.parse(storedUserRaw);
    if (storedUser.email === email && storedUser.password === password) {
       alert("Đăng nhập thành công!");
       sessionStorage.setItem("auroraAccess", "member");
       window.location.href = "./trangchu.html";
       return;
    }
  }

  // Tài khoản test mặc định cho Nguyễn Minh Quân
  if (email === "quan.nm@example.com" && password === "123") {
    const defaultUser = { fullName: "Nguyễn Minh Quân", email: "quan.nm@example.com", password: "123" };
    localStorage.setItem("auroraUser", JSON.stringify(defaultUser));
    alert("Đăng nhập tài khoản Test thành công!");
    sessionStorage.setItem("auroraAccess", "member");
    window.location.href = "./trangchu.html";
    return;
  }

  error.textContent = "EMAIL HOẶC MẬT KHẨU KHÔNG ĐÚNG.";
}

function guestAccess() {
  sessionStorage.setItem("auroraAccess", "guest");
  localStorage.removeItem("auroraUserTemp");
  window.location.href = "./trangchu.html";
}
