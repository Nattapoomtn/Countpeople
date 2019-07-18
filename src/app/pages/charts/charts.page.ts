import { Component, OnInit } from '@angular/core';
import { ParamlocsService } from 'src/app/paramlocs.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import { Events,ModalController,PopoverController } from '@ionic/angular';
import { ProviderService } from 'src/app/provider.service';
import {SearchFilterPage} from '../modal/search-filter/search-filter.page'
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  data
  totalIn: Number
  totalOut: Number
  peakhour = []
  allPeak = []
  checkPeak:boolean = false
  dateShow:string
  now:string
  private lineChartData: Array<any> = [
    { data: [0, 1], label: 'Time/IN' },
    { data: [0], label: 'Time/OUT' }
  ];
  public lineChartLabels: Array<any> = ['23:00-00:00','00:00-01:00','01:00-02:00', "02:00-03:00",'03:00-04:00','04:00-05:00', "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", '09:00-10:00', "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", '14:00-15:00', "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", '19:00-20:00', "20:00-21:00", "21:00-22:00","22:00-23:00"]
  private lineChartOptions: any = {
    plugins: {
      datalabels: {
        anchor: 'end',
      align: 'end',
      }
    },
    scaleShowVerticalLines: true,
    responsive: true,
    legend: { display: false },
    scales: {
      xAxes: [{
        // type: 'time',
        // time: {
        //   format: "HH:mm",
        //   unit: 'hour',
        //   unitStepSize: 1,
        //   displayFormats: {
        //     'minute': 'HH:mm',
        //     'hour': 'HH:mm',
        //     min: '00:00',
        //     max: '23:59'
        //   },
        // }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
        
        },
        ticks: {
        
          min: 0,
         
        }
      }]
    },
  };

  private lineChartColours: Array<any> = [
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
  private lineChartType: string = 'bar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  //pieChart//
  public pieChartData: any[] = [34, 50];
  public pieChartOptions: ChartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
        }
      }
    },
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;

          sum = this.pieChartData[0] + this.pieChartData[1]


          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#ffffff',
      }
    }
  };
  public pieChartLabels: Label[] = [['In'], ['out']];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#ff6b81', '#5352ed', 'rgba(0,0,255,0.3)']
    },
  ];
  cloneC: any
  
  constructor(public pramloc: ParamlocsService, public events: Events, private Provider: ProviderService,private pop:PopoverController,private modal:ModalController) {

    this.showChart()
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
  
    this.events.publish('check',"2019-05-13 11:00 21 22", Date.now());
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

  public showChart(): void {
    this.data = this.pramloc.getExtras()
    let i = 0
    let inn = 0
    let out = 0
    let numPeak = 0
    let clone = []
    this.cloneC = [
      { data: [], label: 'Time/IN' },
      { data: [], label: 'Time/OUT' }
    ];
    console.log(this.data)
    this.now = this.data[0].date
    
    console.log(this.now)
    this.data[0].time.forEach(num => {
      out = +this.data[0].out[i].Number + out
      inn = +this.data[0].in[i].Number + inn
      this.cloneC[0].data.push(+this.data[0].in[i].Number)
      this.cloneC[1].data.push(+this.data[0].out[i].Number)
      if (numPeak == +this.data[0].in[i].Number + +this.data[0].out[i].Number && +this.data[0].in[i].Number + +this.data[0].out[i].Number  != 0) {
        numPeak = +this.data[0].in[i].Number + +this.data[0].out[i].Number
        var splitted = num.time.split(":", 1);
        var hr = +splitted
        this.allPeak.push(this.lineChartLabels[hr])
        if(this.peakhour.length < 3){
          this.peakhour.push(this.lineChartLabels[hr])
        }
      }
      if (numPeak < +this.data[0].in[i].Number + +this.data[0].out[i].Number) {
        numPeak = +this.data[0].in[i].Number + +this.data[0].out[i].Number
        var splitted = num.time.split(":", 1);
        var hr = +splitted
        this.peakhour = [] 
        this.peakhour[0] = this.lineChartLabels[hr]
        this.allPeak = []
        this.allPeak[0] = this.lineChartLabels[hr]
        console.log(this.peakhour)

      }
      
   
      i++
    })
    this.lineChartData = this.cloneC
    this.pieChartData = [inn, out]
    if(this.allPeak.length > 3){
      this.checkPeak = true
    }
    this.totalIn = inn
    this.totalOut = out

  }
  async searchFilter () {
    const modal = await this.modal.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }
  


  // update() {
  //   // this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  //   this.Provider.read("peopleCounting", [
  // 		{
  // 			$project :{
  // 					_id:"$_id",
  // 					date:{$toDate:"$date"},
  // 					time:"$time",
  // 					in:"$in",
  // 					out:"$out"
  // 			}
  // 			},
  // 				{
  // 						$project:
  // 						{
  // 							date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
  // 							dayOfWeek: { $dayOfWeek: "$date" },
  // 							time:"$time",
  // 							in: "$in",
  // 							month: { $dateToString: { format: "%m", date: "$date" } },
  // 							out: "$out",
  // 							year: { $dateToString: { format: "%Y", date: "$date" } },
  // 						}
  // 					},
  // 					{
  // 						$project:
  // 						{
  // 							date: "$date",
  // 							time:"$time",
  // 							in: "$in",
  // 							out: "$out",
  // 								}
  // 							}
  // 	])
  // 		.subscribe(date => {
  //     this.data = date
  //     console.log("5555555")
  //       this.showChart()
  // 		})
  // }
}
