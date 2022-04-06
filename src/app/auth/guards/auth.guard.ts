import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if( this.authService.auth.id ){
    //   return true;
    // }
    // console.log(`Bloqueado por el AuthGard - CanActivate`);   
    // return false;
    return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ){
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    // if( this.authService.auth.id ){
    //   return true;
    // }
    // console.log(`Bloqueado por el AuthGard - CanLoad`);        
    // return false;

    return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ){
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
    return true;
  }
}
