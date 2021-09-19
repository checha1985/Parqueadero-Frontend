import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Propietario } from './propietario';
import { Message } from './message';


@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private baseUrl = 'http://localhost:8090/api/propietario';

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
   * Do a posting Propietario
   * @param propietario 
   */
   createPropietario(propietario: Propietario): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}` + `/create`, propietario)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}

updatePropietario(propietario: Propietario): Observable<Message> {
    return this.http.put<Message> (`${this.baseUrl}` + `/updatebyid/` + propietario.id, propietario)
      .pipe(
          retry(3),
          catchError(this.handleError)
        );
}

deletePropietario(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}` + `/deletebyid/` + id)
          .pipe(
            retry(3),
            catchError(this.handleError)  
          );
}

/**
 * Retrieve all propietario from Backend
 */
retrieveAllPropietarios(): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}` + `/retrieveinfos`)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
}

findByNumeroDocumento(numeroDocumento: number): Observable<Message> {
  return this.http.get<Message>(`${this.baseUrl}` + `/findByNumDocumento/` + numeroDocumento)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}

}