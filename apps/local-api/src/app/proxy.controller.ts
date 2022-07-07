import { Request, Response } from "express-serve-static-core";
import { environment } from "../environments/environment";
import { Readable } from "stream";
const fs = require('fs');
import * as JSZip from 'jszip';

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

  async proxySource(req: Request, res: Response) {
    try {
      const dir = environment.levelsPath + req.query.name;
      const listFiles = await fs.promises.readdir(dir);

      const allFiles = await Promise.all(
        listFiles.map(file => fs.promises.readFile(dir + '/' + file).then(data => ({
          file, data
        })))
      );

      const zip = new JSZip();
      allFiles.forEach(({ file, data }) => {
        zip.file(file, data);
      });

      const stream = zip.generateNodeStream({ type: "nodebuffer" });

      res.set({
        'Content-Type': 'application/zip',
        // 'Content-Length': buffer.length,
      });

      stream.pipe(res);

    } catch (e) {
      res.status(404);
      console.error(e);
      res.send('File not found');
    }
  }
}
