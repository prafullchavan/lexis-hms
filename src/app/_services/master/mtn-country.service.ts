import { Injectable } from '@angular/core';
import {MtnCountry, MtnCountryResponse} from '../../_model/Master/mtn-country';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ErrorHandler} from '../../_services/errorHandler';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class MtnCountryService {
  baseUrl = environment.baseUrl;
  loginApiUrl = this.baseUrl + 'MtnCountries';
  constructor(private http: HttpClient, private _errorHandler: ErrorHandler) { }


  createCountry(mtnCountry: MtnCountry): Observable<MtnCountryResponse> {
    console.log('1');
    console.log(mtnCountry);
      return this.http.post<MtnCountryResponse>(this.loginApiUrl, mtnCountry, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      })
      .pipe(
        catchError(this._errorHandler.handleError)
      );
    }

  getAllCountries(): Observable<MtnCountryResponse> {
    console.log('Insid getAllCountries');
      return this.http.get<MtnCountryResponse>(this.loginApiUrl)
      .pipe(
        catchError(this._errorHandler.handleError)
      );
    }
  }



