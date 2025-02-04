const testFolder = 'G:\\Steam\\steamapps\\common\\Ratopia\\Ratopia_Data';
const fs = require('fs');
const path = require('path');

fs.readdir(testFolder, (err, files) => {
    console.log(files);

    fs.writeFile(path.resolve(testFolder, './result.json'), JSON.stringify(files), () => {});
});