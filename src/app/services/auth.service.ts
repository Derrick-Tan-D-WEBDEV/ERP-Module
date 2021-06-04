import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of,throwError } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(public router: Router,private httpClient: HttpClient) {}

  base_path = 'http://localhost/API/';

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

    public login(email,password):Observable<any>{
        return this.httpClient.post<any>(this.base_path+'User/login.php',{email,password}).pipe(
          map((res) => {
              return res;
          }),
          catchError(this.handleError));
    }

    public loginAdmin(username,password):Observable<any>{
        return this.httpClient.post<any>(this.base_path+'Admin/login.php',{username,password}).pipe(
            map((res) => {
              return res;
          }),
          catchError(this.handleError));
    }

    public logout(){
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('Role');
        localStorage.removeItem('Username');
        localStorage.removeItem('ID');
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('ACCESS_TOKEN') !== null;
    }

    setAccessToken(token){
        localStorage.setItem('ACCESS_TOKEN',token);
    }
    
    setUsername(username){
        localStorage.setItem('Username',username);
    }
    
    setRole(role){
        localStorage.setItem('Role',role);
    }

    setID(id){
        localStorage.setItem('ID',id);
    }

    setCredits(credits){
        localStorage.setItem('Credits',credits);
    }

    setActionRole(role){
        localStorage.setItem('ActionRole',role);
    }
    
    setVersion(ver){
        localStorage.setItem('Version',ver);
    }

    getRole(){
        return localStorage.getItem('Role');
    }

    getVersion(){
        return localStorage.getItem('Version');
    }

    getUsername(){
        return localStorage.getItem('Username');
    }

    getAccessToken(){
        return localStorage.getItem('ACCESS_TOKEN');
    }

    getCredits(){
        return localStorage.getItem('Credits');
    }

    getActionRole(){
        return localStorage.getItem('ActionRole');
    }

    getUserID(){
        return localStorage.getItem('ID');
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        const currentRole = this.getRole();
        if (!this.isAuthenticated() || expectedRole != currentRole) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
