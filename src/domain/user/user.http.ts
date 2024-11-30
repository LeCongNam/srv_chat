import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserHttpService {
  private _userBaseUrl: string;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _configSrv: ConfigService,
  ) {
    this._userBaseUrl = this._configSrv.get('USER_SERVICE');
  }

  async getOne(id: string, token: string): Promise<User> {
    try {
      const response = await lastValueFrom(
        this._httpService.get(this._userBaseUrl + `/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      return response.data as User;
    } catch (error) {
      Logger.error(error, UserHttpService.name);
      throw error;
    }
  }

  async check(id: string): Promise<User> {
    try {
      const response = await lastValueFrom(
        this._httpService.get(this._userBaseUrl + `/users/${id}/check`),
      );

      return response.data as User;
    } catch (error) {
      Logger.error(error, UserHttpService.name);
      throw error;
    }
  }
}
