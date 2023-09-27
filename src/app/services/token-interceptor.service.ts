import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { SpringAuthService } from './spring-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private inject:Injector) {
 
      
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJET0NUT1IiXSwic3ViIjoieWFzc2luZWNoZXJuaTlAZ21haWwuY29tc3FiYiIsImlhdCI6MTY4NDYzNTA1MSwiZXhwIjoxNjg0ODk0MjUxfQ.E579vzL_hjzSCyPRi9Zgbmj1foan70zbLIR-tO375sg"
    let authService= this.inject.get(SpringAuthService)
    let jwttoken= req.clone({
      setHeaders:{
        Authorization:'Bearer '+authService.GetToken()
      }
    })
    return next.handle(jwttoken)
  }}