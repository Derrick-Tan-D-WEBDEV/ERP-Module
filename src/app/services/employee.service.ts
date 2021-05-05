import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public router: Router,private httpClient: HttpClient) { }

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

  base_path = 'http://192.168.0.24:4000/users/';

  login(employeeID,password):Observable<any>{
      return this.httpClient.post<any>(this.base_path+'loginUser',{employeeID ,password}).pipe(
        map((res) => {
          return res;
      }),
      catchError(this.handleError));
  }
  
  updatePassword(user_id,newPassword,oldPassword):Observable<any>{
    return this.httpClient.post<any>(this.base_path+'changePassword',{user_id, newPassword ,oldPassword}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));    
  }

  getUserbyID(user_id):Observable<any>{
    return this.httpClient.post<any>(this.base_path+'getUserbyID',{user_id}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));    
  }
}
