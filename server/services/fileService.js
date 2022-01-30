const fs = require('fs');
const file = require('../models/File');
const config = require('config');


class FileService {
    
    createDir(file) {
        const filePath = this.getPath(req, file);
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {  //проверка на существования файла
                    fs.mkdirSync(filePath);  //создание файла
                    return resolve({message: 'File was created'})
                } else {
                    reject({message:'File already exits'})
                }
            } catch (error) {
                console.log(error)
                return reject({message:'File Error'})
            }
        }))
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file);
        if (file.type === 'dir') {
            fs.rmdirSync(path); //удаление папки
        } else {
            fs.unlinkSync(path); //удаление файла
        }
    }

    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path;
    }

}

module.exports = new FileService()