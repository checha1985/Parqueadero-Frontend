import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Costo } from './costo';
import { Message } from './message';


@Injectable({
  providedIn: 'root'
})
export class CostoService {

  private baseUrl = 'http://localhost:8090/api/costo';

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
   * Do a posting Costo
   * @param costo 
   */
   createCosto(costo: Costo): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}` + `/create`, costo)
                .pipe(
                  retry(3),
                  catchError(this.handleError)
                );
}

updateCosto(costo: Costo): Observable<Message> {
    return this.http.put<Message> (`${this.baseUrl}` + `/updatebyid/` + costo.id, costo)
      .pipe(
          retry(3),
          catchError(this.handleError)
        );
}

deleteCosto(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}` + `/deletebyid/` + id)
          .pipe(
            retry(3),
            catchError(this.handleError)  
          );
}

/**
 * Retrieve all costo from Backend
 */
retrieveAllCostos(): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}` + `/retrieveinfos`)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
}



}