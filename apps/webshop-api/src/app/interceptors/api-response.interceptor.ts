import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {ApiResponse} from "@mono-webshop/domain";

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<unknown>> {
    return next.handle()
      .pipe(
        map((data) => {
          if (data) {
            return {
              result: data,
              info: {
                status: context.switchToHttp().getResponse().statusCode,
                message: 'OK',
                count: data instanceof Array ? data.length : 1,
              }
            };
          } else {
            return {
              result: {},
              info: {
                status: context.switchToHttp().getResponse().statusCode,
                message: context.switchToHttp().getResponse().message,
                count: 0,
              }
            };
          }
        })
      );
  }
}
