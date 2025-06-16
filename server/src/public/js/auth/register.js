import { showInfo, showConfirm } from "../shared/alert.js";
import { isValidEmail } from "../shared/validate.js";
import AuthServices from "../service/auth.js";
import ValidateAuth from "../validations/ValidateAuth.js";
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
      if (!ValidateAuth.validateRegister(data)) return;
      try {
        registerButton.disabled = true;
        const response = await _authServices.registerUser(data);
        if (response.status === 201) {
          showInfo("Đăng ký thành công", " Vui lòng đăng nhập!", "success")
            .then((result) => {
              window.location.href = "/login";
              return;
            })
            .catch((err) => {});
        } else {
          showInfo("Đăng ký thất bại", " Vui lòng thử lại!", "error");
        }
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        showInfo("Đăng ký thất bại", "Đã xảy ra lỗi. Vui lòng thử lại sau!", "error");
      } finally {
        registerButton.disabled = false;
      }
    });
  }
};
