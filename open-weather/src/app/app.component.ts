import { Component } from '@angular/core';
import {ConfigService} from './config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // providers:[ConfigService],//used when you want lazy loadig
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  city="Pune";
  country="IN";
  zip="";
  
  long="73.8567";
  lat="18.5204";

  title = 'Open Weather';
error:any;
config:any;
moreInfo:boolean=false;
foreCastError:any;
foreCast:any;
constructor(private configService:ConfigService) {}
infoBtnName:string="Show";

showConfig(){
  console.log("Clicked");
  this.configService.getConfig(this.city,this.country,this.zip,this.long,this.lat)
  .subscribe(
    (data)=>this.config=data,
    error => this.error=error
    );
}

getForeCast(){
  console.log("ForeCast Clicked");
this.foreCast="";
  this.configService.getForeCast(this.lat,this.long)
  .subscribe(
    (data)=>this.foreCast=data,
    error=>this.foreCastError=error
  )
}

showInfo(){
  this.moreInfo=!this.moreInfo;
  if(this.moreInfo){
this.infoBtnName="Hide";
  }else{
    this.infoBtnName="Show";

  }
}

}


