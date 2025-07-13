/* eslint-disable no-undef */
tinymce.init({
  selector: "textarea",
  license_key: "gpl",
  plugins: "lists link image table code help wordcount",
  /* enable automatic uploads of images represented by blob or data URIs*/
  images_upload_url: "/upload-image", // xử lý riêng
  automatic_uploads: true
});
