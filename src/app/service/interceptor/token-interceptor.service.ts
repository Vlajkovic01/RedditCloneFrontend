import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authenticationService:AuthenticationService = this.inj.get(AuthenticationService);
    request = request.clone({
      setHeaders: {
        // 'Authorization': `JWT ${authenticationService.getToken()}`
      }
    });

    return next.handle(request);
  }

}
