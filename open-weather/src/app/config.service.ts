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


  configUrl="http://api.openweathermap.org/data/2.5/weather?";
  key="&appid=dc99a6c820d43d7d214cbdd8b8375672";
  lat="";
  long="";
  foreCastUrl="https://api.openweathermap.org/data/2.5/onecall?lat=";
  // +this.lat+"lon="+this.long+"&exclude=current,minutely,hourly"+this.key;


  getConfig(city:string,country:string,zip:string,long:string,lat:string){
    console.log("getConfig called");
    let url="";
    if(!zip){
      url=this.configUrl+"q="+city+","+country;

    }else{
      url=this.configUrl+="zip="+zip+","+""+country;
    }

    return this.http.get(url+this.key)
    .pipe(
      retry(3),
    catchError(this.handleError)
    );
  }

  getForeCast(lat:string,long:string){
    this.lat=lat;
    this.long=long;
    console.log("getForeCast called");

    return this.http.get(this.foreCastUrl+lat+"&lon="+long+"&exclude=current,minutely,hourly"+this.key)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError (error:HttpErrorResponse){
return throwError("Error");
  }
}
