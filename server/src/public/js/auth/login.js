import { showInfo, showConfirm } from "../shared/alert.js";
import AuthServices from "../service/auth.js";
import AuthValidate from "../validations/AuthValidate.js";
const _authServices = new AuthServices();
window.onload = () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginForm = document.querySelector(".login-container");
  const loginButton = document.querySelector(".login-button");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: username.value,
        password: password.value
      };
      if (!AuthValidate.validateLogin(data)) return;
      try {
        const response = await _authServices.loginUser(data);
        if (response.status === 200) {
          showInfo("Thành Công", "Đăng nhập thành công!", "success").then((result) => {
            window.location.href = "/";
            return;
          });
        } else {
          // thường là mk không đúng
          showInfo("Thất bại", response.message, "error");
        }
      } catch (error) {
        showInfo("Thất bại", error.message, "error");
        return;
      } finally {
        loginButton.disabled = false;
      }
    });
  }
};
