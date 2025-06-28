import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import SettingValidate from "../validations/SettingValidate.js";
const _baseService = new BaseService();
window.onload = () => {
  const website_name = document.getElementById("website_name");
  const email = document.getElementById("email");
  const hotline = document.getElementById("hotline");
  const address = document.getElementById("address");
  const map = document.getElementById("map");
  const logo = document.getElementById("logo");
  const settingForm = document.querySelector(".setting-form");
  const preview = document.querySelector(".preview");
  if (settingForm) {
    settingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const data = {
        website_name: website_name.value,
        email: email.value,
        hotline: hotline.value,
        logo: logo.files[0],
        address: address.value,
        map: map.value
      };
      if (!SettingValidate.validateCreateSetting(data)) {
        return;
      }
      formData.append("website_name", data.website_name);
      formData.append("email", data.email);
      formData.append("hotline", data.hotline);
      formData.append("logo", data.logo);
      formData.append("address", data.address);
      formData.append("map", data.map);
      try {
        const response = await _baseService.create(formData, "admin/setting/update-setting");
        if (response.status === 201) {
          showInfo("Cập nhật thành công", "", "success");
        } else {
          showInfo("Cập nhật thất bại", response.error, "error");
        }
      } catch (error) {
        showInfo("Lỗi khi cập nhật thông tin trang web", " Vui lòng thử lại!", "error");
      }
    });
  }
  /// xử lý preview img
  logo.addEventListener("change", () => { 
    if (logo.type === "file") {
      const [file] = logo.files;
      preview.src = URL.createObjectURL(file);
    }
  });
  ///end preview img
};
