import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare var window: any;
declare var SMS:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public smses:any;
  constructor(public navCtrl: NavController, public androidPermissions: AndroidPermissions, public platform:Platform) {

  }


  ionViewWillEnter()
  {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
        success => console.log('Permission granted'),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

    this.platform.ready().then((readySource) => {

      if(SMS) SMS.startWatch(()=>{
        console.log('watching started');
      }, Error=>{
        console.log('failed to start watching');
      });

      document.addEventListener('onSMSArrive', (e:any)=>{
        var sms = e.data;
        console.log(sms);

      });

    });
  }

  getSMS(){
    if(window.SMS) window.SMS.listSMS({},data=>{
      setTimeout(()=>{
        console.log(data);
        this.smses=data;
      },0)

    },error=>{
      console.log(error);
    });
  }
}