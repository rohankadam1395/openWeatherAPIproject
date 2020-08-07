import { Component } from '@angular/core';
import {ConfigService} from './config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // providers:[ConfigService],//used when you want lazy loadig
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'open-weather';
error:any;
config:any;
constructor(private configService:ConfigService) {}

showConfig(){
  console.log("Clicked");
  this.configService.getConfig()
  .subscribe(
    (data)=>this.config=data,
    error => this.error=error
    );
}

}


