import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController
} from '@ionic/angular';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Events } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// Modals

import * as moment from 'moment';
import { ProviderService } from 'src/app/provider.service';

import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AppComponent } from '../../app.component'
import { ParamlocsService } from '../../paramlocs.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  testtime: string = "09.00"
  searchKey = '';
  yourLocation = '123 Test Street';
  test = 'assets/img/test.jpeg';
  status:string ="Disconnected"
  private barChartData: Array<any> = [
    { data: [0], label: 'Time/IN' },
    { data: [0], label: 'Time/OUT' }
  ];
  public barChartLabels: Array<any> = ['23:00-00:00','00:00-01:00','01:00-02:00', "02:00-03:00",'03:00-04:00','04:00-05:00', "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", '09:00-10:00', "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", '14:00-15:00', "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", '19:00-20:00', "20:00-21:00", "21:00-22:00","22:00-23:00"]
  private barChartOptions: any = {
    plugins: {
      datalabels: {
        anchor: 'end',
      align: 'end',
      }
    },
    scaleShowVerticalLines: true,
    responsive: true,
    legend: { display: true },
    scales: {
      xAxes: [{
        // type: 'time',
        // time: {
        //   format: "HH:mm",
        //   unit: 'hour',
        //   unitStepSize: 2,
        //   displayFormats: {
        //     'minute': 'HH:mm',
        //     'hour': 'HH:mm',
        //     min: '00:00',
        //     max: '23:00'
        //   },
        // }
      }],
      yAxes: [{
        scaleLabel: {
          
        },
        ticks: {
          
          min: 0,
         
        }
      }]
    },
  };
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
  private barChartType: string = 'bar';
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
  file: any
  now: string
  time: Date
  totalIn: number = 0
  totalOut: number = 0
  cloneC:any
   //////////////////pie///////
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
      backgroundColor: ['#ff6b81', '#5352ed', 'rgba(0,0,255,0.3)'],
      color:'#ffffff'
    },
  ];
  constructor(
    private InAppBrowser: InAppBrowser,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private Provider: ProviderService,
    public activeRoute: ActivatedRoute,
    public param: ParamlocsService,
    public events: Events,
    public loaddingCtrl: LoadingController,
  ) {
    this.check()
    
  
  }
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.events.publish('check',"2019-05-13 11:00 21 22", Date.now());
  }

  ngOnInit(){
   
    this.events.subscribe('user:created', (body, time) => {
      console.log(body)
      if(this.now == body){
        this.update()
      }
    
   
    });
    this.events.subscribe('update', (body, time) => {
      console.log(body)
    this.check()
      
   
    });
  }
  data:any
 
  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
  check() {
    this.now = moment().format('YYYY-MM-DD')
    this.Provider.readOne("peopleCounting", [
      {
        $project: {
          _id: "$_id",
          date: { $toDate: "$date" },
          time: "$time",
          in: "$in",
          out: "$out"
        }
      },
      {
        $project:
        {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          dayOfWeek: { $dayOfWeek: "$date" },
          time: "$time",
          in: "$in",
          month: { $dateToString: { format: "%m", date: "$date" } },
          out: "$out",
          year: { $dateToString: { format: "%Y", date: "$date" } },
          ISO: "$date"
        }
      }
      , {
        $match: {
          date: this.now
        }
      }
    ])
      .subscribe(date => {
        if (date.length == 0) {
          
        }else {
          this.data = date
          this.count()
        }
      })
  }
  async update() {
    const loading = await this.loaddingCtrl.create({
      spinner: "circles",
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
		await loading.present()
		await loading.onDidDismiss()
		console.log("work")
    this.check()
  }
 
  count() {
    var countin = 0, countout = 0 
    this.cloneC= [
          { data: [], label: 'Time/IN' },
          { data: [], label: 'Time/OUT' }
        ];
        let that = this
    this.data.time.forEach(function (element, i) {
      countin = +that.data.in[i].Number+countin
      countout += +that.data.out[i].Number
      that.cloneC[0].data.push(+that.data.in[i].Number)
      that.cloneC[1].data.push(+that.data.out[i].Number)
    });
    this.totalIn = countin
    this.totalOut = countout
    this.barChartData = this.cloneC
    this.pieChartData = [countin,countout]
    
  }
  createNowDate(now) {
    //   var gg = new Date("2017-10-13T10:53:53Z").toISOString
    //  console.log(gg)
    //   this.Provider.create("users",{"$date":gg,time:"new"
    // })
    //   .subscribe(date => {

    //     console.log(datP
// var g = {date:"2019-11-11",time:[{"Number":11}],in:[12],out:13}
// console.log(g)
// this.Provider.create("users",g)
// .subscribe(_id=>{
// 	console.log(_id)
// })
  }
  deleteTable(){
    this.events.publish('component', "2019-05-16 16:00 20 40", Date.now());
  }

}
