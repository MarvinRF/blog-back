import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { fileFilter, storage } from './upload.config';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(jwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.uploadService.handleUpload(file);
    return {
      success: true,
      message: 'File uploaded successfully',
      data: uploadedFile,
    };
  }
}
