import { Component } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service'
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ParamlocsService } from './paramlocs.service'
import { Pages } from './interfaces/pages';

import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router'
import { ProviderService } from './provider.service'
import { AuthenticationService } from './services/authentication.service';
import * as microgear from 'microgear';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public appPages: Array<Pages>;
	status:string = "Disconnected"
	APPID = "ProjectCounter";
	KEY = "SEjoTEAEM3v2TFt";
	SECRET = "lT3zhoAxDsJvhJRw507Vk1EwQ";
	alias: string;
	microgear: any;
	messages: any = [];
	text: string;
	checkStatus: boolean = false
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public navCtrl: NavController,
		public alertController: AlertController,
		public event: Events,
		public router: Router,
		public param: ParamlocsService,
		public authen: AuthenticationService,
		public provider: ProviderService
	) {
		this.appPages = [
			{
				title: 'Home',
				url: '/members/home-results',
				direct: 'root',
				icon: 'home'
			},
			{
				title: 'Data',
				url: '/members/data',
				direct: 'forward',
				icon: 'pie'
			}


		];

		this.initializeApp();
		this.connect()
		this.event.subscribe('component', (body, time) => {
			console.log(body, time)
			this.microgear.chat('Webapp', body)
		});
		this.event.subscribe('check', (body, time) => {
			console.log(this.microgear.client.connected)
			this.checkStatus = this.microgear.client.connected
			if(this.microgear.client.connected){
				this.status = "Connected"
			}else{
				this.status = "Disconnected"
			}
			
			
		});
	}
	getValue: any
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.authen.authenticationState.subscribe(state => {

				if (state) {
					this.router.navigate(['members', 'home-results'])
				} else {
					this.router.navigate(['login'])
				}
			})
		})

	}

	goToEditProgile() {
		this.navCtrl.navigateForward('edit-profile');
	}

	logout() {
		this.authen.logout()
	}

	connect() {

		let that = this;
		this.microgear = microgear.create({
			key: this.KEY,
			secret: this.SECRET
		});
		this.microgear.connect(this.APPID);
		console.log(this.microgear)
	
		this.microgear.on('connected', function () {
			
			console.log('Connected...');
			that.microgear.setalias("Webapp");
		
			that.status = "Connected"
			that.checkStatus = true
		});
		this.microgear.on('message', function (topic, body) {
			
			var convert = "" + body
			console.log(convert)
			if (body == "testsend") {
				console.log("send")
				that.microgear.chat('pi', 'pass');
			} else {
				console.log("pass")
				var splitted = convert.split(" ", 4);
				let date = splitted[0]
				let time = splitted[1]
				let numIn = splitted[2]
				let numOut = splitted[3]
				console.log(date, time, numIn, numOut)
				that.check(date, time, numIn, numOut)

			}
		});
		this.microgear.on('closed', function () {
			console.log('Closed...');
		});
	}
	check(datePush, time, numIn, numOut) {

		this.provider.readOne("peopleCounting", [
			{
				$project: {
					_id: "$_id",
					date: "$date",
					time: "$time",
					in: "$in",
					out: "$out"
				}
			}
			, {
				$match: {
					date: datePush
				}
			}
		])
			.subscribe(date => {
				console.log(date)
				if (date == null) {
					console.log("Create")
					this.createNowDate(datePush, time, numIn, numOut)
				} else {
					console.log("update")
					this.getValue = date
					this.getdata(time, numIn, numOut)
				}
			})
	}
	createNowDate(datePush, time, numIn, numOut) {
		this.provider.readOne("peopleCounting", [
			{
				$project: {

					date: { $toDate: "$date" },
					time: "$time",
					in: "$in",
					out: "$out"
				}
			},
		]).subscribe(obj => {
			console.log(obj)
			delete obj["_id"]

			this.getValue = obj
			this.getValue.date = datePush
			this.getValue.time.forEach((element, i) => {
				this.getValue.in[i].Number = 0
				this.getValue.out[i].Number = 0
				if (element.time == time) {
					this.getValue.in[i].Number = numIn
					this.getValue.out[i].Number = numOut
				}
			});
			this.send()
		})



	}
	send() {
		console.log(this.getValue)
		this.provider.create("peopleCounting", this.getValue)
			.subscribe(date => {

				this.event.publish('user:created', this.getValue.date, Date.now());
				console.log(date.date)

			})
	}
	getdata(time, numIn, numOut) {
		console.log(this.getValue)
		this.getValue.time.forEach((element, i) => {
			if (element.time == time) {
				this.getValue.in[i].Number = numIn
				this.getValue.out[i].Number = numOut
			}
		});
		this.provider.update("peopleCounting", this.getValue)
			.subscribe(date => {
				console.log(date)
				this.event.publish('update', this.getValue.date, Date.now());

			})
	}
	///////////////----------------//////////
	

}