import { Request, Response } from "express";
class ActorController {
  async showViewCreateActor(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-actor");
  }
}
export default ActorController;
