import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Plugins, NetworkStatus, StatusBarStyle} from '@capacitor/core'; 

const {Network, Share, StatusBar, Toast, Accessibility, Modals, LocalNotifications } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab2Page {
  status: NetworkStatus;
  newstatus = {aa: '1111', bb: '555'}
  listener: any;
  isStatusBarLight = true
  constructor(private toastCtrl: ToastController, private cdf: ChangeDetectorRef) { 
    Accessibility.addListener('accessibilityScreenReaderStateChange', (state) => {
      console.log(state.value);
    });
  }

  async dingshi() {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: "Body",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }

  async isVoiceOverEnabled() {
    var vo = await Accessibility.isScreenReaderEnabled();
    alert('Voice over enabled? ' + vo.value);
  }
  
  async speak() {
    var value = await Modals.prompt({
      title: "Value to speak",
      message: "Enter the value to speak"
    });
  
    Accessibility.speak({value: value.value});
  }

  ionViewDidEnter() {
    this.getStatus();
    this.startListenNetwork();
  }

  ionViewWillLeave() {
    this.stopListenNetwork();
  }

  changejson() {
    this.newstatus = {aa: '777', bb: '8888'}
  }

  async getStatus() {
    try {
      this.status = await Network.getStatus();
    } catch (e) { console.log("Error", e) }
  }

  startListenNetwork() {
    this.listener = Network.addListener('networkStatusChange', (res:NetworkStatus) => {
      this.newstatus = JSON.parse(JSON.stringify(res))
      this.status = res
      this.cdf.markForCheck();    // 进行标注
      this.cdf.detectChanges();   // 要多加一行这个 执行一次变化检测
      this.presentToast(res);
    });
  }

  stopListenNetwork() {
    if (this.listener) this.listener.remove();
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({ message: msg.connectionType, duration: 3000, position: 'top' });

    toast.present();
  }

  async share() {
    let shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }

  changeStatusBar() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
    });
    this.isStatusBarLight = !this.isStatusBarLight;
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }

  async showToast() {
    await Toast.show({
      text: 'Hello!'
    });
  }

}
