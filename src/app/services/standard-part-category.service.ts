import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StandardPartCategoryService {

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

  base_path = 'http://192.168.31.42:4000/SPCategory/';

  getAllSPCategory():Observable<any>{
    return this.httpClient.get<any>(this.base_path+'getAllSPCategory').pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  getByIdSPCategory(id):Observable<any>{
    return this.httpClient.post<any>(this.base_path+'getByIdSPCategory',{id}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  
}
