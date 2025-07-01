import { showInfo } from "../shared/alert.js";
import { handleImagePreview } from "../shared/previewMediaFile.js";
import ActorValidate from "../validations/ActorValidate.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();
window.onload = () => {
  const actor_name = document.getElementById("actor_name");
  const birthDate = document.getElementById("birthDate");
  const biography = document.getElementById("biography");
  const gender = document.getElementById("gender");
  const nationality = document.getElementById("nationality");
  const actor_image = document.getElementById("actor_image");
  const preview = document.querySelector(".preview");
  const createActorForm = document.querySelector(".create-actor-form");
  if (createActorForm) {
    createActorForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const data = {
        actor_name: actor_name.value,
        birthDate: birthDate.value,
        biography: biography.value,
        gender: gender.value,
        nationality: nationality.value,
        actor_image: actor_image.files[0]
      };
      if (!ActorValidate.validateCreateActor(data)) {
        return;
      }
      formData.append("actor_name", actor_name.value);
      formData.append("birthDate", birthDate.value);
      formData.append("biography", biography.value);
      formData.append("gender", gender.value);
      formData.append("nationality", nationality.value);
      formData.append("actor_image", actor_image.files[0]);
      try {
        const response = await _baseService.create(formData, "admin/actor/create-actor");
        if (response.status === 201) {
          showInfo("Tạo diễn viên thành công", "", "success");
          createActorForm.reset();
        } else {
          showInfo("Tạo diễn viên thất bại", response.error, "error");
        }
      } catch (error) {
        showInfo("Lỗi khi tạo diễn viên", " Vui lòng thử lại!", "error");
      }
    });
  }
  /// xử lý preview img
  handleImagePreview(actor_image, preview);
  ///end preview img
};
