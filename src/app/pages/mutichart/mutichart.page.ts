import { Component, OnInit } from '@angular/core';
import { ParamlocsService } from 'src/app/paramlocs.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import * as group from 'group-array'
import { MenuController,ModalController,PopoverController,Events } from '@ionic/angular';
import {SearchFilterPage} from '../modal/search-filter/search-filter.page'
@Component({
  selector: 'app-mutichart',
  templateUrl: './mutichart.page.html',
  styleUrls: ['./mutichart.page.scss'],
})
export class MutichartPage implements OnInit {
  data:any = []
  allPeak = []
  now:string
  checkPeak:boolean = false
  public pieChartData: any[] = [34, 50];
  public pieChartOptions: ChartOptions = {
   tooltips: {
     
   },
   responsive: true,
   legend: {
     position: 'top',
   },
 plugins: {
         datalabels: {
             formatter: (value, ctx) => {
                 let sum = 0;
                
                sum = this.pieChartData[0]+this.pieChartData[1]
 
               
                 let percentage = (value*100 / sum).toFixed(2)+"%";
                 return percentage;
             },
             color: '#ffffff',
         }
     }
 };
  public pieChartLabels: Label[] = [[ 'In'], ['out']];

public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['#ff6b81', '#5352ed', 'rgba(0,0,255,0.3)'],
  },
];

public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{   scaleLabel: {
    display: true,
  
  },
  ticks: {
  
    min: 0,
   
  }
   
  }] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] = ['20012'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];
private barChartColors: Array<any> = [
  { // grey
    backgroundColor: '#ff6b81',
    borderColor: '#ff6b81',
    pointBackgroundColor: '#ff6b81',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: '#5352ed',
    borderColor: '#5352ed',
    pointBackgroundColor: '#5352ed',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
];
public barChartData: ChartDataSets[] = [
  { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
  { data: [0, 0, 20, 0, 0, 0, 0], label: 'Out' }
];
  clone:any 
  cloneM:any
  cloneY:any
  totalIn:any
  totalOut:any
  dSelect:string
  peakhour = []
  getpeak = []
  dummyChart:any = ['23:00-00:00','00:00-01:00','01:00-02:00', "02:00-03:00",'03:00-04:00','04:00-05:00', "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", '09:00-10:00', "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", '14:00-15:00', "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", '19:00-20:00', "20:00-21:00", "21:00-22:00","22:00-23:00"]
  constructor(private pramloc:ParamlocsService,public menuCtrl:MenuController,private pop:PopoverController,private modal:ModalController,public events: Events) { 
   
  }

  ngOnInit() {
    this.data = this.pramloc.getExtras()
    console.log(this.data)  
    this.first()
    
  }
  
  segmentChanged(select){
    console.log(select)

    if(select == "Days"){
      this.days()
    }else if(select == "Months"){
      this.month()
    }else {
      this.years()
    }

  }
  days(){
    var tempIn = [0,0,0,0,0,0,0]
    var tempOut = [0,0,0,0,0,0,0]
    var countIn,countOut

    this.clone = JSON.parse(JSON.stringify(this.barChartData));
    this.clone= [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
    ];
    this.barChartData = this.clone
    this.barChartLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    this.data.forEach(function(element,j)  {
        countIn=0
        countOut=0
      element.time.forEach(function(num,i) {
        countIn = +element.in[i].Number + countIn
        countOut = +element.out[i].Number + countOut
      });
     tempIn[element.numDay - 1] += countIn
     tempOut[element.numDay - 1] += countOut
    });
    this.clone[0].data = tempIn
    this.clone[1].data = tempOut
    this.barChartData = this.clone
  }
  first(){
    this.now =  this.data[0].date
    this.dSelect = "Days"
    console.log("work")
 
    console.log(this.peakhour)
    var tempIn = [0,0,0,0,0,0,0]
    var tempOut = [0,0,0,0,0,0,0]
    var countIn,countOut
    var tCountI = 0
    var tCountO = 0
    this.clone = JSON.parse(JSON.stringify(this.barChartData));
    this.clone= [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
    ];
    console.log(this.clone)
    this.barChartData = this.clone
    var numPeak = 0
        var clone = []
        var aPeak = []
    this.barChartLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    var peak = []
    let i = 0
    console.log(this.data)
    this.data.forEach(element => {
      let j = 0
     
        countIn=0
        countOut=0
        let that = this
      element.time.forEach(num=> {
        countIn = +element.in[j].Number + countIn
        countOut = +element.out[j].Number + countOut  
        console.log(num.time)
        if (numPeak == +element.in[j].Number + element.out[j].Number && +element.in[j].Number + element.out[j].Number  != 0) {
          
          numPeak = +element.in[j].Number + +element.out[j].Number
          var splitted = num.time.split(":", 1);
          var hr = +splitted
          aPeak.push(that.dummyChart[hr])
        
        }
        if (numPeak < +element.in[j].Number + +element.out[j].Number) {
          numPeak = +element.in[j].Number + +element.out[j].Number
          var splitted = num.time.split(":", 1);
          var hr = +splitted
          aPeak = []
          aPeak[0] = that.dummyChart[hr]
        }
      
       
        j++

      
        
      });
      i++
     console.log(countIn)
     tempIn[element.numDay - 1] += countIn
     tCountI += countIn
     tCountO += countOut
     tempOut[element.numDay - 1] += countOut

    });
    
    this.allPeak = aPeak
    this.allPeak = this.allPeak.sort()
    let group = []
    let j = 0
    
    this.allPeak.forEach(function(year,i){
      
      if(i == 0){
        group.push(year)
        peak.push(year)
      }
  
   
      if(i > 0){
        if(group[j] != year){
          group.push(year)
          tempIn.push(0)
          tempOut.push(0)
          if(peak.length < 3){
            peak.push(year)
            
          }
          j++
        }
          
      }
    })
    console.log(group)
    this.allPeak =group
    this.getpeak = peak
    if(this.allPeak.length > 3){
      this.checkPeak = true
    }
   
    this.totalIn = tCountI
    this.totalOut = tCountO
    this.pieChartData = [tCountI,tCountO]

    console.log(tCountI)
    this.clone[0].data = tempIn
    this.clone[1].data = tempOut
  
    console.log(this.clone)
    this.barChartData = this.clone
    console.log(this.barChartOptions)
  }
  ionViewWillEnter() {
      this.events.publish('check',"2019-05-13 11:00 21 22", Date.now());
    
  }
  month(){
    this.barChartLabels = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    var tempIn =  [0,0,0,0,0,0,0,0,0,0,0,0]
    var tempOut = [0,0,0,0,0,0,0,0,0,0,0,0]
    var countIn,countOut
    this.cloneM = JSON.parse(JSON.stringify(this.barChartData));
    this.cloneM= [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
    ];
    this.data.forEach(function(element,j)  {
      countIn=0
      countOut=0
    element.time.forEach(function(num,i) {
      countIn = +element.in[i].Number + countIn
      countOut = +element.out[i].Number + countOut
    });
   var x = +element.month -1
   tempIn[x] += countIn
   tempOut[x] += countOut
  });
  this.cloneM[0].data = tempIn
  this.cloneM[1].data = tempOut
  this.barChartData = this.cloneM
  }
  years(){
    this.barChartLabels = ["2015"]
    var tempIn =  [0]
    var tempOut = [0]
    var countIn,countOut
    var year = []
    var tempY = []
    var compare 
    this.cloneY= [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
    ];
    this.data.forEach(function(element,j)  {
      year.push(element.year)
    });
    year = year.sort()
    var j = 0
    year.forEach(function(year,i){
      if(i == 0){
        tempY.push(year)
      }
      if(i > 0){
        if(tempY[j] != year){
          tempY.push(year)
          tempIn.push(0)
          tempOut.push(0)
          j++
        }
          
      }
    })
    this.barChartLabels = tempY
      j = 0
    this.data.forEach(function(element,i)  {
      countIn=0
      countOut=0
      if(i == 0){
        compare = element.year
      }
      if(compare != element.year){
        compare = element.year
        j++
      }
        var g = 0
        element.time.forEach(num => {
            countIn += +element.in[g].Number
            countOut += +element.out[g].Number
            g++
        });
        tempIn[j] += countIn
        tempOut[j] += countOut
    });
    this.cloneY[0].data = tempIn
    this.cloneY[1].data = tempOut
    this.barChartData = this.cloneY
}
async popOver(ev: Event){
  console.log("pop")
  const modal = await this.modal.create({
    component: SearchFilterPage,
    componentProps:{
      custom_id:this.allPeak
    }
   
  })
return await modal.present()
}

  


}
