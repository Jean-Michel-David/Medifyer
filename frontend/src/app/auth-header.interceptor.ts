import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwt = localStorage.getItem('authenticationToken');
    
    //If there isn't any jwt stored
    if (jwt === null || jwt.length < 1 || jwt == 'undefined')
      return next.handle(request);

    //If the request isn't sent to our backend
    if (! request.url.startsWith(environment.backendUrl))
      return next.handle(request);

    //Adding jwt
    jwt = 'Bearer ' + jwt;
    const newRequest = request.clone({
      setHeaders: {
        Authorization: jwt
      }
    });
    
    return next.handle(newRequest).pipe(
      tap(
        event => { 
          if (event instanceof HttpResponse)
            console.log('request succeeded');
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            //Déconnecter utilisateur si unauthorized
            if (error.status === 401) {
              localStorage.removeItem('authenticationToken');
            }
          }
        }
      ));    
  }
}
