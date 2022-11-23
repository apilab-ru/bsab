const gamePath = 'S:\\Games\\Steam\\steamapps\\common\\Beat Saber\\';
const port = 3333;
const portHttps = 3433;

export const environment = {
  port,
  portHttps,
  host: 'http://localhost:' + port + '/',
  production: false,
  levelsPath: gamePath + 'Beat Saber_Data/CustomLevels/',
  playlistsPath: gamePath + 'Playlists/',
  installPath: 'D:\\YandexDisk\\Загрузки\\map-install'
};
