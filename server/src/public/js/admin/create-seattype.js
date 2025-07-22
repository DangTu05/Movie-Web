import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import SeatTypeValidate from "../validations/SeattypeValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const seat_type = document.getElementById("seat_type");
  const createSeatTypeForm = document.querySelector(".create-seattype-form");
  const btnSubmit = createSeatTypeForm.querySelector("button[type=submit]");
  const mode = createSeatTypeForm.getAttribute("data-mode");
  if (createSeatTypeForm) {
    createSeatTypeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        seat_type: seat_type.value.trim()
      };
      const isValid = SeatTypeValidate.validateCreateSeatType(data);
      if (!isValid) {
        return;
      }
      try {
        btnSubmit.disabled = true;
        if (mode === "Create SeatType") {
          const response = await _baseService.create(data, "admin/seattype/create-seattype");
          if (response.status === 201) {
            showInfo("Tạo loại ghế thành công", "", "success");
            createSeatTypeForm.reset();
          } else if (response.status === 400) {
            showInfo("Loại ghế đã tồn tại", "Vui lòng kiểm tra lại thông tin loại ghế!", "error");
          } else if (response.status === 500) {
            showInfo("Lỗi máy chủ", "Vui lòng thử lại sau!", "error");
          } else {
            showInfo("Tạo loại ghế thất bại", "", "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật loại ghế này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const seatTypeId = createSeatTypeForm.getAttribute("data-seat-type-id");
          btnSubmit.disabled = true;
          const response = await _baseService.update(data, `admin/seattype/update-seattype/${seatTypeId}`);
          if (response.status === 200) {
            showInfo("Cập nhật loại ghế thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật loại ghế thất bại", "", "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo loại ghế", " Vui lòng thử lại!", "error");
      }
      btnSubmit.disabled = false;
    });
  }
};
