import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class TipologiaService {


  private baseUrl = 'http://localhost:8090/api/tipologia';

  constructor(private http: HttpClient) { }
  

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};


/**
 * Retrieve all usuario from Backend
 */
 retrieveAllTipoDocumentos(): Observable<Message> {
  return this.http.get<Message>(`${this.baseUrl}` + `/recuperarTiposDocumentos`)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}

retrieveAllTipoVehiculos(): Observable<Message> {
  return this.http.get<Message>(`${this.baseUrl}` + `/recuperarTiposVehiculos`)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );               
}

retrieveAllTipoTiempos(): Observable<Message> {
  return this.http.get<Message>(`${this.baseUrl}` + `/recuperarTiposTiempos`)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}

retrieveAllTipoUsuarios(): Observable<Message> {
  return this.http.get<Message>(`${this.baseUrl}` + `/recuperarTiposUsuarios`)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}


}
