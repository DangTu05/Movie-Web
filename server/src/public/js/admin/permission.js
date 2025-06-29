import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();
window.onload = () => {
  const tablePermission = document.querySelector("[table-permissions]");
  const buttonSubmit = document.querySelector(".update-btn");
  if (tablePermission) {
    buttonSubmit.addEventListener("click", async () => {
      let permissionMap = new Map();
      const rows = tablePermission.querySelectorAll("[data-name]");
      rows.forEach((row) => {
        const data_name = row.getAttribute("data-name");
        const inputs = row.querySelectorAll("input");
        if (data_name == "id") {
          inputs.forEach((input) => {
            const id = input.value;
            permissionMap.set(id, { _id: id, permissions: [] });
          });
        } else {
          inputs.forEach((item, index) => {
            const checked = item.checked;
            if (checked) {
              // Lấy id từ hàng "id" tương ứng theo chỉ số
              const idRow = tablePermission.querySelector('[data-name="id"]');
              const idInput = idRow.querySelectorAll("input")[index];
              const id = idInput.value;
              if (permissionMap.has(id)) {
                permissionMap.get(id).permissions.push(data_name);
              }
            }
          });
        }
      });
      const permissions = Array.from(permissionMap.values());
      showConfirm("Cập nhật", "Bạn có muốn cập nhật?").then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await _baseService.update(permissions, "admin/role/update-permission");
            if (response.status === 200) {
              await showInfo("Cập nhật thành công", "", "success");
              location.reload();
            } else {
              showInfo("Cập nhật thất bại", response.error, "error");
            }
          } catch (error) {
            showInfo("Lỗi khi cập nhật", " Vui lòng thử lại!", "error");
          }
        }
      });
    });
  }
  /// checked
  const data = JSON.parse(document.querySelector(".content-container")?.getAttribute("data"));
  if (data) {
    const tablePermission = document.querySelector("[table-permissions]");
    data.forEach((item, index) => {
      const permissions = item.permissions;
      permissions.forEach((permission) => {
        const row = tablePermission.querySelector(`[data-name="${permission}"]`);
        const input = row.querySelectorAll("input")[index];
        input.checked = true;
      });
    });
  }
};
