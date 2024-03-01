import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

export const imageStorage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        cb(null, `${Date.now()}-img${fileExtName}`)
    }
})

export const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|)$/))
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);

    cb(null, true);
}