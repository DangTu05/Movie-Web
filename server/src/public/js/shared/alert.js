export const showConfirm = (title, text, icon = "warning", confirmText = "Yes") => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText
  });
};
export const showInfo = (title, text, icon = "info") => {
  Swal.fire({
    title,
    text,
    icon
  });
};
