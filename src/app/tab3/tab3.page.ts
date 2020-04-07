import { Component } from '@angular/core';
import { Plugins, ActionSheetOptionStyle } from "@capacitor/core"
import { ToastController } from '@ionic/angular';
const {CustomNativePlugin, Browser, Keyboard, Modals} = Plugins
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  status
  constructor(private toastCtrl: ToastController) {}


  // Modals
  async openModalAlert() {
    let alertRet = await Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    });
  }

  async showConfirm() {
    let confirmRet = await Modals.confirm({
      title: 'Confirm',
      message: 'Are you sure you\'d like to press the red button?'
    });
    console.log('Confirm ret', confirmRet);
  }
  
  async showPrompt() {
    let promptRet = await Modals.prompt({
      title: 'Hello',
      message: 'What\'s your name?'
    });
    console.log('Prompt ret', promptRet);
  }
  
  async showActions() {
    let promptRet = await Modals.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload'
        },
        {
          title: 'Share'
        },
        {
          title: 'Remove',
          style: ActionSheetOptionStyle.Destructive
        }
      ]
    })
    console.log('You selected', promptRet);
  }











  // otherts

  gopromise() {
    CustomNativePlugin.customCall({ message: "CUSTOM MESSAGE" }).then(res => {
      this.presentToast(res)
    });
  }

  gofunc() {
    CustomNativePlugin.customFunction({aaa: "I am a teacher!"}).then(res => {
      this.status = res
      this.presenttopToast(res)
    });
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({ message: msg.mymessage, duration: 3000, position: 'bottom' });

    toast.present();
  }

  async presenttopToast(msg) {
    let toast = await this.toastCtrl.create({ message: msg.bbb, duration: 3000, position: 'top' });

    toast.present();
  }

  async openBrowser() {
    await Browser.open({ url: "https://www.baidu.com" });
  }

  openKeyboard() {
    Keyboard.show()
  }

}
