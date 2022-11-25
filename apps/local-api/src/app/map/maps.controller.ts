import { Request, Response } from "express-serve-static-core";
import { MapsService } from "./maps-service";

export class MapsController {
  private mapsService = new MapsService();

  async getListMaps(req: Request, res: Response): Promise<void> {
    const maps = await this.mapsService.loadMaps();

    res.send({ maps });
  }

  async getIdsMaps(req: Request, res: Response): Promise<void> {
    const maps = await this.mapsService.loadMaps();
    const ids = this.mapsService.getBeatSaverIds(maps);

    res.send(ids);
  }

  async installPreparedMap(withDelete = true): Promise<void> {
    return this.mapsService.installPreparedMaps(withDelete).then(count => {
      console.log('xxx complete files', count);
    })
  }

}
