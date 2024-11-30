import {
  DynamicModule,
  ForwardReference,
  Global,
  Module,
  Provider,
  Type,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export interface CloudinaryAsyncConfig {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  useFactory: (...args: any[]) => Promise<CloudinaryConfig> | CloudinaryConfig;
  inject?: any[];
}

@Global()
@Module({
  providers: [CloudinaryService],
})
export class CloudinaryModule {
  static forRoot(config: CloudinaryConfig): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        {
          provide: 'CLOUDINARY_CONFIG',
          useValue: config,
        },
        CloudinaryService,
      ],
      exports: [CloudinaryService],
    };
  }

  static forRootAsync(asyncConfig: CloudinaryAsyncConfig): DynamicModule {
    const asyncProviders: Provider[] = [
      {
        provide: 'CLOUDINARY_CONFIG',
        useFactory: asyncConfig.useFactory,
        inject: asyncConfig.inject || [],
      },
    ];

    return {
      module: CloudinaryModule,
      imports: [],
      providers: [...asyncProviders, CloudinaryService],
      exports: [CloudinaryService],
    };
  }
}
