import { showInfo } from "../shared/alert.js";
import AuthServices from "../service/auth.js";
import AuthValidate from "../validations/AuthValidate.js";
const _authServices = new AuthServices();
window.onload = () => {
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const registerForm = document.querySelector(".register-container");
  const registerButton = document.querySelector(".register-button");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: email.value,
        username: username.value,
        password: password.value
      };
      if (!AuthValidate.validateRegister(data)) return;
      try {
        registerButton.disabled = true;
        const response = await _authServices.registerUser(data);
        if (response.status === 201) {
          await showInfo("Đăng ký thành công", " Vui lòng đăng nhập!", "success");
          window.location.href = "/auth/login";
        } else {
          showInfo("Đăng ký thất bại", " Vui lòng thử lại!", "error");
        }
      } catch {
        showInfo("Đăng ký thất bại", "Đã xảy ra lỗi. Vui lòng thử lại sau!", "error");
      } finally {
        registerButton.disabled = false;
      }
    });
  }
};
