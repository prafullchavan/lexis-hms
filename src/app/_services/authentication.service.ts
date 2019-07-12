import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../_model/loginmodel';
import { LoginResponse } from '../_model/loginmodel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {ErrorHandler} from '../_services/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  loginApiUrl = this.baseUrl + 'login';

  constructor(private http: HttpClient, private _errorHandler: ErrorHandler) {
  }

authenticate(loginmodel: LoginRequestModel): Observable<LoginResponse> {
  console.log(loginmodel);
    return this.http.post<LoginResponse>(this.loginApiUrl, loginmodel, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    })
    .pipe(
      catchError(this._errorHandler.handleError)
    );
  }

  logout(): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(this.loginApiUrl, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      })
      .pipe(
        catchError(this._errorHandler.handleError)
      );
    }

  public handleError1(errorResponse:  HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error( 'client Side Error:', errorResponse.error.message);
    } else {
      console.error( 'Server Side Error:', errorResponse.error.message);
    }
    return new Observable<never>();
  }



  // public handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

}

