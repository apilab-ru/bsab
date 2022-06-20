import { Request, Response } from "express-serve-static-core";
import { MapsService } from "./maps-service";

export class MapsController {
  private mapsService = new MapsService();

  async getListMaps(req: Request, res: Response): Promise<void> {
    const maps = await this.mapsService.loadMaps();

    res.send({ maps });
  }

}
