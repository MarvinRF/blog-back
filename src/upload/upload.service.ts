import { BadRequestException, Injectable } from '@nestjs/common';

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateRandomSuffix } from 'src/common/utils/generate-random-suffix';

@Injectable()
export class UploadService {
  async handleUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No files sent');
    }
    const maxFileSize = 900 * 1024;

    if (file.size > maxFileSize) {
      throw new BadRequestException(
        'File size exceeds the maximum allowed size',
      );
    }
    // 🚀 GAMBIARRA - Importação dinâmica do file-type
    const { fileTypeFromBuffer } = await import('file-type');

    const fileType = await fileTypeFromBuffer(file.buffer);
    if (
      !fileType ||
      !['image/png', 'image/webp', 'image/jpeg', 'image/gif'].includes(
        fileType.mime,
      )
    ) {
      throw new BadRequestException('Invalid file type');
    }
    // exemplo de retorno 2025-04-29T16:48:23.123Z hora, minuto, segundo e milissegundos "Z" → indica que a hora está em UTC (Zulu time)
    const today = new Date().toISOString().split('T')[0];
    const uploadPath = resolve(__dirname, '..', '..', 'uploads', today);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${generateRandomSuffix()}`;
    const fileExtension = fileType.ext;
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    const fileFullPath = resolve(uploadPath, fileName);

    //Salva o buffer no Disco
    writeFileSync(fileFullPath, file.buffer);

    return {
      url: `/uploads/${today}/${fileName}`,
    };
  }
}
