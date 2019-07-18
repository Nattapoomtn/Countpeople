import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ProviderService } from 'src/app/provider.service';
import * as microgear from 'microgear';
import {AuthenticationService} from'../../services/authentication.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  APPID  = "ProjectCounter";
  KEY    = "SEjoTEAEM3v2TFt";
  SECRET = "lT3zhoAxDsJvhJRw507Vk1EwQ";
  alias : string;
  microgear : any;
  messages : any = [];
  text : string;
  constructor(

    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public provider: ProviderService,
    public authen : AuthenticationService
  ) { 
    console.log("microgear")

  }
  ID: any = ""
  password: any = ""
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
   
  }
  
 
login() {
    this.provider.readOne("users", [
      {
        $match: {
          $and: [
            {
              username: this.ID
            },
            {
              password: this.password
            }
          ]}},
      {
        $project: {
          _id: "$_id",
        }
      }
    ])
      .subscribe(user => {
        if(user!=null){
        this.authen.login(user._id)
        }else{
        this.presentAlert()
        }
      })
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login Failed',
      message: 'Please check you username and or password and try again',
      buttons: ['OK']
    });

    await alert.present();
  }
  }




