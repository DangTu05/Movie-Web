import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import VoucherValidate from "../validations/VoucherValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const voucher_name = document.getElementById("voucher_name");
  const voucher_start = document.getElementById("voucher_start");
  const voucher_end = document.getElementById("voucher_end");
  const voucher_discount = document.getElementById("voucher_discount");
  const voucher_script = document.getElementById("voucher_script");
  const createVoucherForm = document.querySelector(".create-voucher-form");
  const mode = createVoucherForm.getAttribute("data-mode");
  if (createVoucherForm) {
    createVoucherForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        voucher_name: voucher_name.value,
        voucher_start: voucher_start.value,
        voucher_end: voucher_end.value,
        voucher_discount: voucher_discount.value ? parseFloat(voucher_discount.value) : 0,
        voucher_script: voucher_script.value
      };
      if (!VoucherValidate.validateCreateVoucher(data)) {
        return;
      }
      try {
        if (mode === "Create Voucher") {
          const response = await _baseService.create(data, "admin/voucher/create-voucher");
          if (response.status === 201) {
            showInfo("Tạo voucher thành công", "", "success");
            createVoucherForm.reset();
          } else {
            showInfo("Tạo voucher thất bại", response.error, "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật voucher này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const voucher_id = createVoucherForm.getAttribute("voucher_id");
          const response = await _baseService.update(data, `admin/voucher/update-voucher/${voucher_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật voucher thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật voucher thất bại", response.error, "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo voucher", " Vui lòng thử lại!", "error");
      }
    });
  }
};
