import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|)$/))
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);

    cb(null, true);
}