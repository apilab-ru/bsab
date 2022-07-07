import * as express from 'express';
import * as https from 'https';
import { MapsController } from './app/maps.controller';
import { ProxyController } from "./app/proxy.controller";
import { environment } from "./environments/environment";
import { PlaylistController } from "./app/playlist.controller";
const fs = require('fs');

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
app.get('/maps/install', () => mapsController.installPreparedMap(true));

app.get('/playlists', playlistController.getPlaylists.bind(playlistController));
app.post('/playlist/:id', playlistController.updatePlaylist.bind(playlistController));

app.get('/proxy/song', proxyController.proxySong.bind(proxyController))
app.get('/proxy/source', proxyController.proxySource.bind(proxyController))

mapsController.installPreparedMap();

const port = environment.port;
const server = app.listen(port, () => {
  console.log('Listening at ' + environment.host + '/api');
});
server.on('error', console.error);

const key = fs.readFileSync(__dirname + '/assets/sert/localhost-key.pem');
const cert = fs.readFileSync(__dirname + '/assets/sert/localhost.pem');

const portHttps = environment.portHttps;
const serverHttps = https.createServer({key, cert }, app);
serverHttps.listen(portHttps, () => { console.log('listening on ' + portHttps) })
serverHttps.on('error ssl', console.error);
