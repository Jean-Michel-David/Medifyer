import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('authenticationToken');
    
    //If there isn't any jwt stored
    if (jwt === null || jwt.length < 1 || jwt == 'undefined')
      return next.handle(request);

    //If the request isn't sent to our backend
    if (! request.url.startsWith(environment.backendUrl))
      return next.handle(request);

    //Adding jwt
    const newRequest = request.clone({
      setHeaders: {
        Authorization: jwt
      }
    });
    return next.handle(newRequest);
  }
}
