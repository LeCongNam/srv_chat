import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserHttpService } from '../user/user.http';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [JwtStrategy, UserHttpService],
  exports: [JwtStrategy],
})
export class AuthModule {}
