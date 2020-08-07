import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { doesNotThrow } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http:HttpClient) { }

  configUrl="http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=dc99a6c820d43d7d214cbdd8b8375672";

  getConfig(){
    console.log("getConfig called");
    return this.http.get(this.configUrl)
    .pipe(
      retry(3),
    catchError(this.handleError)
    );
  }

  private handleError (error:HttpErrorResponse){
return throwError("Error");
  }
}