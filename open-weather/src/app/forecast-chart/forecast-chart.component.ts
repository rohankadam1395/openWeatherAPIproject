import { Component, OnInit,Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.css']
})
export class ForecastChartComponent implements OnInit {

  constructor() { }
  @Input() getit:string;
  @Input() foreCast:[{}];
width=500;
height=300;
svg;
padding=25;
dates=[];
// scale=d3.scaleLinear().domain([0,7]).range([this.padding,this.width-this.padding]);
scale;
miny;
y;
yScale;
output=0;
xAxis;
yAxis;
domain;

  ngOnInit() {
    this.y=d3.max(this.foreCast["daily"],(d)=>parseInt(d['temp'].max));
    this.miny=d3.min(this.foreCast["daily"],(d)=>parseInt(d['temp'].min));

    this.yScale=d3.scaleLinear().domain([this.miny,this.y]).range([this.height-this.padding,this.padding]);
   this.yAxis= d3.axisLeft(this.yScale);
this.datasety=this.foreCast["daily"].map((value,index)=>{
  console.log(value.temp.min);
  this.dates.push(new Date(1000*value.dt));
  return value.temp.min;
   });

   this.domain=d3.extent(this.dates);
this.scale=d3.scaleTime().domain(this.domain).range([this.padding,this.width-this.padding]);
this.xAxis=d3.axisBottom(this.scale);

   this.dataset2y=this.foreCast["daily"].map((value,index)=>{
    console.log(value.temp.max);
    return value.temp.max;
     });


    this.output=this.yScale(480);

    this.svg=d3.select("#chart").append("svg").attr("width",this.width).attr("height",this.height);

    this.svg.append("path")
    .datum(this.datasety)
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width", 1.5)
    .attr("d",d3.line()
    .x((d,i)=>this.scale(this.dates[i]))
    .y((d,i)=>this.yScale(d)));

    this.svg
    .selectAll("circle")
    .data(this.datasety)
    .enter()
    .append("circle")
    .style("fill","red")
    .attr("cx",(d,i)=>this.scale(this.dates[i]))
    .attr("cy",(d,i)=>this.yScale(d))
    .attr("r",3)
    ;


    this.svg.append("path")
    .datum(this.dataset2y)
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width", 1.5)
    .attr("d",d3.line()
    .x((d,i)=>this.scale(this.dates[i]))
    .y((d,i)=>this.yScale(d)));
    
    this.svg.selectAll("g")
    .data(this.dataset2y)
    .enter()
    .append("g")
    .append("circle")
    .style("fill","green")
    .attr("cx",(d,i)=>this.scale(this.dates[i]))
    .attr("cy",(d,i)=>this.yScale(d))
    .attr("r",3)
    ;

    d3.select("h2").text(this.output);

    this.svg.append("g").attr("transform","translate(0,"+(this.height-this.padding)+")").call(this.xAxis.ticks(d3.timeDay).tickFormat(d3.timeFormat("%a %d")));
this.svg.append("g").attr("transform","translate("+this.padding+",0)").call(this.yAxis);
  }
//  dataset=[0,1,2,3,4,5,6,7];
 datasety=[];

 dataset2y=[];
 
 




}
