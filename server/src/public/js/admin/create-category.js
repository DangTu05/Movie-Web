import { showInfo } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import CategoryValidate from "../validations/CategoryValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const category_name = document.getElementById("category_name");
  const createCategoryForm = document.querySelector(".create-category-form");
  if (createCategoryForm) {
    createCategoryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        category_name: category_name.value.trim()
      };
      if (!CategoryValidate.validateCreateCategory(data)) {
        return;
      }
      try {
        const response = await _baseService.create(data, "admin/category/create-category");
        if (response.status === 201) {
          showInfo("Tạo thể loại thành công", "", "success");
          category_name.value = ""; // Reset input field
        } else {
          showInfo("Tạo thể loại thất bại", response.error, "error");
        }
      } catch (error) {
        showInfo("Lỗi khi tạo thể loại", " Vui lòng thử lại!", "error");
      }
    });
  }
};
