import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import AccountValidate from "../validations/AccountValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const role = document.getElementById("role");
  const createAccountForm = document.querySelector(".create-account-form");
  if (createAccountForm) {
    createAccountForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        role_id: role.value
      };
      if (!AccountValidate.validateCreateAccount(data)) {
        return;
      }
      try {
        const response = await _baseService.create(data, "admin/account/create-account");
        if (response.status === 201) {
          showInfo("Tạo tài khoản thành công", "", "success");
          createAccountForm.reset();
        } else {
          showInfo("Tạo tài khoản thất bại", response.error, "error");
        }
      } catch (error) {
        showInfo("Lỗi khi tạo tài khoản", " Vui lòng thử lại!", "error");
      }
    });
  }
};
