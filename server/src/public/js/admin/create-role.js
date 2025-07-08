import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import RoleValidate from "../validations/RoleValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const role_name = document.getElementById("role_name");
  const description = document.getElementById("description");
  const createRoleForm = document.querySelector(".create-role-form");
  const mode = createRoleForm.getAttribute;
  if (createRoleForm) {
    createRoleForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        role_name: role_name.value.trim(),
        description: description.value.trim()
      };
      if (!RoleValidate.validateCreateRole(data)) {
        return;
      }
      try {
        if (mode === "Create Role") {
          const response = await _baseService.create(data, "admin/role/create-role");
          if (response.status === 201) {
            showInfo("Tạo role thành công", "", "success");
            createRoleForm.reset();
          } else {
            showInfo("Tạo role thất bại", response.error, "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật role này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const role_id = createRoleForm.getAttribute("role_id");
          const response = await _baseService.update(data, `admin/role/update-role/${role_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật role thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật role thất bại", response.error, "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo role", " Vui lòng thử lại!", "error");
      }
    });
  }
};
