import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import CategoryValidate from "../validations/CategoryValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const category_name = document.getElementById("category_name");
  const createCategoryForm = document.querySelector(".create-category-form");
  const mode = createCategoryForm.getAttribute("data-mode");
  const btnSubmit = createCategoryForm.querySelector("button[type=submit]");
  if (createCategoryForm) {
    createCategoryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        category_name: category_name.value.trim()
      };
      // Validate thông tin gửi lên phía client
      if (!CategoryValidate.validateCreateCategory(data)) {
        return;
      }
      try {
        btnSubmit.disabled = true;
        if (mode === "Create Category") {
          const response = await _baseService.create(data, "admin/category/create-category");
          if (response.status === 201) {
            showInfo("Tạo thể loại thành công", "", "success");
            createCategoryForm.reset(); // Reset form
          } else {
            showInfo("Tạo thể loại thất bại", response.error, "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật thể loại này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const category_id = createCategoryForm.getAttribute("category_id");
          const response = await _baseService.update(data, `admin/category/update-category/${category_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật thể loại thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật thể loại thất bại", response.error, "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo thể loại", " Vui lòng thử lại!", "error");
      }
      btnSubmit.disabled = false;
    });
  }
};
