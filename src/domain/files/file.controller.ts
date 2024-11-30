import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/libs/Cloudinary/cloudinary.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileUploadService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const fileUrl = await this.fileUploadService.uploadFile(
      file.buffer,
      file.originalname,
      undefined,
      {
        isWillExpired: true,
      },
    );
    return { url: fileUrl };
  }
}
