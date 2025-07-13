import { showInfo, showConfirm } from "../shared/alert.js";
import ArticleValidate from "../validations/ArticleValidate.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();
window.onload = () => {
  const article_title = document.getElementById("title");
  // const article_content = document.getElementById("content");
  const createArticleForm = document.querySelector(".create-article-form");
  const btnSubmit = createArticleForm.querySelector("button[type=submit]");
  if (createArticleForm) {
    createArticleForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        title: article_title.value,
        // eslint-disable-next-line no-undef
        content: tinymce.get("content").getContent()
      };
      if (!ArticleValidate.validateCreateArticle(data)) {
        return;
      }
      try {
        btnSubmit.disabled = true;
        const response = await _baseService.create(data, "admin/article/create-article");
        if (response.status === 201) {
          await showInfo("Tạo bài viết thành công", "", "success");
          createArticleForm.reset();
        } else {
          showInfo("Tạo bài viết thất bại", "", "error");
        }
      } catch {
        showInfo("Lỗi khi tạo bài viết", " Vui lòng thử lại!", "error");
      }
      btnSubmit.disabled = false;
    });
  }
};
