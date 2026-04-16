import multer from 'multer';
import path from 'path';
import fs from 'fs';
import util from 'util';

// configuring multer to store incoming files under /bucket/uploaded-files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './bucket/uploaded-files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

// configured multer object
const upload = multer({storage: storage})


// Function to delete an image from the filesystem
const unlinkFile = util.promisify(fs.unlink);

// util function to delte
const deleteFile = async (filePath) => {
    try {
        await unlinkFile(filePath);
        console.log('File successfully deleted');
    } catch (error) {
        console.error('There was an error deleting the file:', error);
        throw error;
    }
};


export {upload, deleteFile}