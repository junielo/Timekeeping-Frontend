import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  enableLog: boolean;

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  public handleError<T>(operation = 'operation', result?: T) {
    return (response: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      this.error(response);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${response.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T); 
      return of(response.error as T);
    };
  }

  public log(message: any) { if (this.enableLog) console.log(message); }
  public error(message: string) { if (this.enableLog) console.error(message); }

  constructor(public http: HttpClient) { this.enableLog = true }

  get(url: string) {
    return this.http.get<any>(url).pipe(
      tap(_ => this.log('fetched data by id')),
      catchError(this.handleError<any>(`get error`))
    )
  }

  post(url: string, body: any) {
    return this.http.post<any>(url, body).pipe(
      tap((result: any) => this.log(`post data from ${url}`)),
      catchError(this.handleError<any>('post error'))
    )
  }
}

export const HTTP_API_URL = "http://localhost:8090/";
export const getEmployees = HTTP_API_URL + 'employees'