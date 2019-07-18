import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController} from '@ionic/angular'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passId = null
  constructor(private navParams:NavParams,private modal:PopoverController) { }

  ngOnInit() {
    this.passId = this.navParams.get('custom_id');
  }

  closeModal(){
    this.modal.dismiss()
  }

}
