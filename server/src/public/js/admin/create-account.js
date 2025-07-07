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
  const mode = createAccountForm.getAttribute("data-mode");

  if (createAccountForm) {
    createAccountForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        role_id: role.value
      };
      if (mode === "Create Account") {
        if (!AccountValidate.validateCreateAccount(data)) {
          return;
        }
      } else if (!AccountValidate.validateUpdateAccount(data)) {
        return;
      }

      try {
        if (mode === "Create Account") {
          const response = await _baseService.create(data, "admin/account/create-account");
          if (response.status === 201) {
            showInfo("Tạo tài khoản thành công", "", "success");
            createAccountForm.reset();
          } else {
            showInfo("Tạo tài khoản thất bại", response.error, "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật thể loại này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const account_id = createAccountForm.getAttribute("account_id");
          const dataUpdate = {
            username: username.value,
            email: email.value,
            role_id: role.value
          };
          if (password.value) dataUpdate.password = password.value;
          const response = await _baseService.update(dataUpdate, `admin/account/update-account/${account_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật tài khoản thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật tài khoản thất bại", response.error, "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo tài khoản", " Vui lòng thử lại!", "error");
      }
    });
  }
};
