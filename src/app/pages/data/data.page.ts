import { Component, OnInit } from '@angular/core';
import {
	NavController,
	AlertController,
	MenuController,
	ToastController,
	PopoverController,
	ModalController,
	LoadingController,
	NavParams,
	
} from '@ionic/angular';
import { Events } from '@ionic/angular';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ProviderService } from './../../provider.service'

import { ParamlocsService } from '../../paramlocs.service'
import * as microgear from 'microgear';
import { DataService } from '../../services/data.service'
import { duration } from 'moment';
import {Router} from '@angular/router'
import * as moment from 'moment';
@Component({
	selector: 'app-data',
	templateUrl: './data.page.html',
	styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
    search: string = '';
    searchControl: FormControl;
    items: any;
    searching: any = false;
	startD
	endD
	maxD
	minD
	list: any[]
	dummy: any[]
	keyword: string = ""
	Select:any = []
	testD:any = [{
		date:"",
		in:[0],
		out:[0]
	}
	]
	now:string
	constructor(public modalCtrl: ModalController,
		public Provider: ProviderService,
		public NavCtrl: NavController,
		public Paramloc: ParamlocsService,
		public loaddingCtrl: LoadingController,
		private dataService: DataService,
		public menuCtrl: MenuController,
		public router:Router,
		public events: Events,
		private alert:AlertController
	) {
		this.searchControl = new FormControl();
		this.test()
		this.initializeItems()
	}
	ngOnInit() {
		this.menuCtrl.enable(true)
	}
	ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.events.publish('check',"2019-05-13 11:00 21 22", Date.now());
  }

	checkTrue(check){
		this.Select.push(check)
	}
	checkfalse(check){
		this.Select.forEach( (item, index) => {
			if(item._id === check._id) this.Select.splice(index,1);
		  });
	}
	check(check){
		if(check.check == true)
		this.checkTrue(check)
		if(check.check == false)
		this.checkfalse(check)
	}
		initializeItems(){ 
			this.items = this.dummy
		}
		getItems(ev: any) {
			this.initializeItems();
			this.list =this.items.filter((item) => {
				return this.startD <= item.date && this.endD >= item.date
			  })
			if (this.search && this.search.trim() != '') {
			  this.list = this.items.filter((item) => {
				return (item.date.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
				(item.nDayOfWeek.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
			  })
			  
			}
		  }
	test() {
		this.now = moment().format('YYYY-MM-DD')
		this.Provider.read("peopleCounting", [
			{
				$project :{
						_id:"$_id",
						date:{$toDate:"$date"},
						time:"$time",
						in:"$in",
						out:"$out"
				}
				},
					{
							$project:
							{
								date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
								dayOfWeek: { $dayOfWeek: "$date" },
								time:"$time",
								in: "$in",
								month: { $dateToString: { format: "%m", date: "$date" } },
								out: "$out",
								year: { $dateToString: { format: "%Y", date: "$date" } },
							}
						},
						{
							$project:
							{
								date:"$date",
								delete: { $ne: [ "$date", this.now ] },
								time:"$time",
								month:"$month",
								year:"$year",
								in: "$in",
								out: "$out",
								numDay:"$dayOfWeek",
								nDayOfWeek: {
									$switch:
									{
										branches: [
											{
												"case": { $eq: ["$dayOfWeek", 1] },
												then: 'Sunday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 2] },
												then: 'Monday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 3] },
												then: 'Tuesday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 4] },
												then: 'Wednesday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 5] },
												then: 'Thursday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 6] },
												then: 'Friday'
											},
											{
												"case": { $eq: ["$dayOfWeek", 7] },
												then: 'Saturday'
											},
										],
										default: "No scores found."
									}
								}
							}
						},
						{
								$match:{
										date:{$not:{$eq:this.now}}
								}
						},
						{
							$sort: { date: -1 }
			
						}
		])
			.subscribe(date => {
				date.forEach(element => {
					element.check = false
				});
				this.dummy = date
				this.list = date
				this.endD = date[0].date
				this.maxD = this.endD
				let i = date.length
				this.startD = date[i-1].date
				this.minD = this.startD
				console.log(this.maxD+"min"+this.minD)
			})
	}
	showTable() {
		this.Select = this.Select.sort((obj1, obj2) => {
			if (obj1.year > obj2.year) {
					return 1;
			}
			if (obj1.year < obj2.year) {
					return -1;
			}
			return 0;
	})
		if(this.Select.length !=0){
		
			if(this.Select.length == 1){
			this.Paramloc.setExtras(this.Select)
			this.chart()
			}else {
				this.Paramloc.setExtras(this.Select)
				this.mutichart()
			}
		}
		else {
			this.presentAlert()
		}
	}
	async mutichart() {
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
		this.router.navigate(['/members/mutichart'])
  }
	async chart() {
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
		this.router.navigate (['/members/charts'])
  }
	async presentLoadingWithOptions() {
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
		this.test()

	
	}
	async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Confirm!',
      message: 'Are You Sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
						console.log('Confirm Okay');
						this.presentLoadingWithOptions()
          }
        }
      ]
    });

    await alert.present();
	}
	async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      
      message: 'Please Select at least one date',
      buttons: ['OK']
    });

    await alert.present();
  }
	deleteTable(){
		if(this.Select.length > 0){
		var item = []
		this.Select.forEach(element => {
			item.push(element._id)
		});
		this.Provider.delete("peopleCounting",item)
		.subscribe(_id => {
			this.presentAlertConfirm()
		})
	}
	this.presentAlert()


// var g = {date:"2019-11-11",time:[{"Number":11}],in:[12],out:13}
// console.log(g)
// this.Provider.create("users",g)
// .subscribe(_id=>{
// 	console.log(_id)
// })
	}
}





