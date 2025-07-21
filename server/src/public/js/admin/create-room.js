import { showConfirm, showInfo } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import RoomValidate from "../validations/RoomValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const room_number = document.getElementById("room_number");
  const chair_total = document.getElementById("chair_total");
  const createRoomForm = document.querySelector(".create-room-form");
  const btnSubmit = createRoomForm.querySelector("button[type=submit]");
  const mode = createRoomForm.getAttribute("data-mode");
  if (createRoomForm) {
    createRoomForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        room_number: parseInt(room_number.value.trim(), 10),
        chair_total: parseInt(chair_total.value.trim(), 10)
      };
      if (!RoomValidate.validateCreateRoom(data)) {
        return;
      }
      try {
        btnSubmit.disabled = true;
        if (mode === "Create Room") {
          const response = await _baseService.create(data, "admin/room/create-room");
          if (response.status === 201) {
            showInfo("Tạo phòng thành công", "", "success");
            createRoomForm.reset();
          } else {
            showInfo("Tạo phòng thất bại", "", "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật phòng này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const room_id = createRoomForm.getAttribute("room_id");
          const response = await _baseService.update(data, `admin/room/update-room/${room_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật phòng thành công", "", "success");
            location.reload();
          } else {
            showInfo("Cập nhật phòng thất bại", "", "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo phòng", " Vui lòng thử lại!", "error");
      }
      btnSubmit.disabled = false;
    });
  }
};
