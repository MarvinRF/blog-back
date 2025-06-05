import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const storage = memoryStorage();

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
// export const limits = {
//   // fileSize: 900 * 1024, // 900 KB
// };
