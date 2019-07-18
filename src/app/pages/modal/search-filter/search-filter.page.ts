import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };
  peakhour:string

  constructor(private modalCtrl: ModalController,private navParams:NavParams) { }

  ngOnInit() {
    this.peakhour = this.navParams.get('custom_id');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}