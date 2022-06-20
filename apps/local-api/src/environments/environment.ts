const gamePath = 'S:\\Steam\\steamapps\\common\\Beat Saber\\';
const port = 3333;

export const environment = {
  port,
  host: 'http://localhost:' + port + '/',
  production: false,
  levelsPath: gamePath + 'Beat Saber_Data/CustomLevels/',
  playlistsPath: gamePath + 'Playlists/'
};
