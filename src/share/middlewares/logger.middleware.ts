import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const userAgent = req.headers['user-agent'] || '';
    const forwardedIp =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const startTime = Date.now();

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const logMessage = `${forwardedIp} {${originalUrl}, ${method}} ${statusCode}  ${responseTime}ms  Body: ${body ? JSON.stringify(body) : null}  User-Agent: ${userAgent}`;

      Logger.log(logMessage, LoggerMiddleware.name);
    });

    next();
  }
}
