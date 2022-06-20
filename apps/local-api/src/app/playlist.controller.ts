import { PlaylistsService } from "./playlists-service";
import { Request, Response } from "express-serve-static-core";

export class PlaylistController {
  private playlistsService = new PlaylistsService();

  async getPlaylists(req: Request, res: Response): Promise<void> {
    const list = await this.playlistsService.getList();

    res.send({ list });
  }

  async updatePlaylist(req: Request, res: Response) {
    await this.playlistsService.updatePlaylist(req.params.id, req.body);

    res.send({ status: 'ok' });
  }
}
