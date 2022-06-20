import * as express from 'express';
import { MapsController } from './app/maps.controller';
import { ProxyController } from "./app/proxy.controller";
import { environment } from "./environments/environment";
import { PlaylistController } from "./app/playlist.controller";

const cors = require('cors');

const app = express();
const mapsController = new MapsController();
const proxyController = new ProxyController();
const playlistController = new PlaylistController();

app.use(cors({
  origin: '*'
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

app.use('/map', express.static(environment.levelsPath));

app.get('/api', (req, res) => {
  res.send({ message: 'Test' });
});

app.get('/maps', mapsController.getListMaps.bind(mapsController));

app.get('/playlists', playlistController.getPlaylists.bind(playlistController));
app.post('/playlist/:id', playlistController.updatePlaylist.bind(playlistController));

app.get('/proxy/song', proxyController.proxySong.bind(proxyController))


const port = environment.port;
const server = app.listen(port, () => {
  console.log('Listening at' + environment.host + '/api');
});
server.on('error', console.error);
