import { z } from "zod";
import BaseValidate from "./BaseValidate";
const seattypeSchema = z.object({
  seat_type: z.string().min(1, "Loại ghế không được để trống")
});
type SeatType = z.infer<typeof seattypeSchema>;
class SeatTypeValidate extends BaseValidate<SeatType> {
  protected schema = seattypeSchema;
}
export default SeatTypeValidate;
