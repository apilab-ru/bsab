const fs = require('fs');
const path = require('path');

const sourceDir = "G:\\Steam\\steamapps\\common\\Ratopia\\Ratopia_Data\\exports\\ExportedProject\\Assets\\Texture2D";; // Укажи путь к исходной папке
const destDir = 'S:\\projects\\bsab\\apps\\ratopia-dictionary\\src\\assets\\resources'; // Укажи путь к папке, куда копировать

// Проверяем, существует ли папка назначения, если нет — создаем
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Читаем файлы в исходной директории
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Ошибка при чтении директории:', err);
        return;
    }

    files.forEach(file => {
        if (file.includes('Object') && file.endsWith('.png')) { // Проверяем, есть ли слово "Object" в названии
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);

            fs.copyFile(sourceFile, destFile, (err) => {
                if (err) {
                    console.error(`Ошибка копирования файла ${file}:`, err);
                } else {
                    console.log(`Файл ${file} скопирован.`);
                }
            });
        }
    });
});