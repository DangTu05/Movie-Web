import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();
window.onload = () => {
  const deletes = document.querySelectorAll(".delete");
  if (deletes) {
    deletes.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const isConfirmed = await showConfirm("Xóa", "Bạn có chắc chắn muốn xóa không?", "question");
        if (!isConfirmed.isConfirmed) return;
        // Gọi API hoặc submit form
        const href = deleteBtn.getAttribute("href");
        try {
          const response = await _baseService.delete(href);
          if (response.status === 200) {
            await showInfo("Xóa thành công", "", "success");
            location.reload();
          } else {
            showInfo("Xóa thất bại", "", "error");
          }
        } catch {
          showInfo("Lỗi khi xóa", " Vui lòng thử lại!", "error");
        }
      });
    });
  }
};
