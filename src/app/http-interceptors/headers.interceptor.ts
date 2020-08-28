import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private isProduction: boolean = environment.production;
  private nutritionApiHost: string = environment.nutritionApiHost;
  private nutritionServiceKey: string = environment.nutritionServiceKey;

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isProduction) {
      request = request.clone({
        setHeaders: {
          'x-rapidapi-host': this.nutritionApiHost,
          'x-rapidapi-key': this.nutritionServiceKey,
          useQueryString: 'true',
        },
      });
    }
    return next.handle(request);
  }
}
