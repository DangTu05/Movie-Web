/**
 * Updated by trungquandev.com's author on Sep 27 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 * NOTE: (Muốn hiểu rõ hơn về code trong file này thì vui lòng xem video 54 trong bộ MERN Stack trên kênh Youtube của mình.)
 */
/**
 * Định nghĩa kiểu dữ liệu lỗi chuẩn trong hệ thống.
 */
export type ErrorType = {
  statusCode: number; // Mã HTTP trả về (vd: 400, 401, 500, ...)
  isOperational: boolean; // Xác định đây là lỗi nghiệp vụ (true) hay lỗi không mong muốn (false)
  message: string; // Thông điệp lỗi chính
  errors?: unknown; // Chi tiết lỗi phụ (nếu có), ví dụ như mảng lỗi validation
};
/**
 * Định nghĩa riêng một Class ApiError kế thừa class Error sẵn (điều này cần thiết và là Best Practice vì class Error nó là class built-in sẵn)
 */
// T là kiểu dữ liệu của phần `errors` (thường là chi tiết lỗi)
class ApiError<T = ErrorType> extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean; // Đánh dấu lỗi nghiệp vụ (true) hay lỗi không lường trước (false)
  public readonly errors: T | null; // Chi tiết lỗi, có thể null nếu không có
  constructor(statusCode: number, message: string, isOperational = true, errors?: T) {
    // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
    super(message);
    // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = "ApiError";
    // Gán thêm http status code của chúng ta ở đây
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors ?? null; // Nếu không có `errors` truyền vào, gán là null
    // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ApiError;
