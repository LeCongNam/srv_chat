import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from './cloudinary.module';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY_CONFIG') private config: CloudinaryConfig) {
    cloudinary.config({
      cloud_name: this.config.cloudName,
      api_key: this.config.apiKey,
      api_secret: this.config.apiSecret,
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    folder: string = 'temp',
    options?: {
      isWillExpired?: boolean;
      timeExpired?: number;
    },
  ): Promise<string> {
    let expirationTime = 3600;
    if (options?.isWillExpired) {
      expirationTime = options?.timeExpired ?? 3600;
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            public_id: `${folder}/${Date.now()}`,
            expire_at: Math.floor(Date.now() / 1000) + expirationTime,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result?.secure_url);
          },
        )
        .end(fileBuffer);
    });
  }

  async deleteFile(publicId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result?.result === 'ok') {
          resolve('File deleted successfully');
        } else {
          reject('Failed to delete file');
        }
      });
    });
  }

  async moveFile(oldPublicId: string, newFolder: string): Promise<string> {
    const fileName = oldPublicId.split('/').pop();
    const newPublicId = `${newFolder}/${fileName}`;

    return new Promise(async (resolve, reject) => {
      try {
        // Step 1: Copy the file to the new folder (uploading again)
        const uploadResult = await cloudinary.uploader.upload(
          `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${oldPublicId}`,
          { public_id: newPublicId },
        );

        // Step 2: Delete the original file
        const deleteResult = await cloudinary.uploader.destroy(oldPublicId);

        if (deleteResult.result === 'ok') {
          resolve(`File moved successfully: ${uploadResult.secure_url}`);
        } else {
          reject('Failed to delete the original file');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
