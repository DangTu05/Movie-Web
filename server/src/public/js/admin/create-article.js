import { showInfo, showConfirm } from "../shared/alert.js";
import ArticleValidate from "../validations/ArticleValidate.js";
import { handleImagePreview } from "../shared/previewMediaFile.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();
window.onload = () => {
  const article_title = document.getElementById("title");
  // const article_content = document.getElementById("content");
  const createArticleForm = document.querySelector(".create-article-form");
  const btnSubmit = createArticleForm.querySelector("button[type=submit]");
  const image = document.getElementById("image");
  const preview = document.querySelector(".preview");

  if (createArticleForm) {
    createArticleForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const data = {
        title: article_title.value,
        // eslint-disable-next-line no-undef
        content: tinymce.get("content").getContent(),
        image: image.files[0] ?? preview.src
      };
      if (!ArticleValidate.validateCreateArticle(data)) {
        return;
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image);
      try {
        btnSubmit.disabled = true;
        const response = await _baseService.create(formData, "admin/article/create-article");
        if (response.status === 201) {
          await showInfo("Tạo bài viết thành công", "", "success");
          createArticleForm.reset();
          preview.src = "";
        } else {
          showInfo("Tạo bài viết thất bại", "", "error");
        }
      } catch {
        showInfo("Lỗi khi tạo bài viết", " Vui lòng thử lại!", "error");
      }
      btnSubmit.disabled = false;
    });
  }
  /// xử lý preview img
  handleImagePreview(image, preview);
  ///end preview img
};
