const gamePath = 'S:\\Games\\Steam\\steamapps\\common\\Beat Saber\\';
const port = 3433;
const portHttps = 3333;

export const environment = {
  port,
  portHttps,
  host: 'https://localhost:' + portHttps + '/',
  production: false,
  levelsPath: gamePath + 'Beat Saber_Data/CustomLevels/',
  playlistsPath: gamePath + 'Playlists/',
  installPath: 'D:\\YandexDisk\\Загрузки\\map-install'
};
