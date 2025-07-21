import z from "zod";
import BaseValidate from "./BaseValidate";
const roleSchema = z.object({
  room_number: z.number().min(1, "Số phòng không được để trống"),
  chair_total: z.number().min(1, "Tổng số ghế không được để trống"),
  format_room: z.string().optional()
});
type RoleType = z.infer<typeof roleSchema>;
class RoomValidate extends BaseValidate<RoleType> {
  protected schema = roleSchema;
}
export default RoomValidate;
