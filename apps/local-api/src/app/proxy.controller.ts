import { Request, Response } from "express-serve-static-core";
import { environment } from "../environments/environment";
import { Readable } from "stream";
const fs = require('fs');

export class ProxyController {
  async proxySong(req: Request, res: Response) {
    try {
      const file = req.query.file + '/song.egg';
      const buffer = await fs.promises.readFile(environment.levelsPath + file);
      const stream = new Readable();

      stream.push(buffer);
      stream.push(null);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
      });

      stream.pipe(res);
    } catch (e) {
      res.status(404);
      res.send('File not found');
    }
  }

  async proxyImage(req: Request, res: Response) {
    try {
      const file = req.query.file + '/song.egg';
      const buffer = await fs.promises.readFile(environment.levelsPath + file);
      const stream = new Readable();

      stream.push(buffer);
      stream.push(null);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
      });

      stream.pipe(res);
    } catch (e) {
      res.status(404);
      res.send('File not found');
    }
  }
}
