import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { FelicaPlugin } from '@awesome-cordova-plugins/felica-plugin/ngx';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public idm = '';
  public pmm = '';
  public waonno = '';
  public enabled = true;
  constructor(private zone: NgZone, private felica: FelicaPlugin) {}

  public async readNFC() {
    this.enabled = false;
    this.idm = '';
    this.pmm = '';
    this.waonno = '';

    var success = (message) => {
      //alert(message);
      console.log(message.idm);
      console.log(message.pmm);
      console.log(message.waonno);
      this.zone.run(() => {
        this.idm = message.idm;
        this.pmm = message.pmm;
        this.waonno = message.waonno;
      });
    };

    var failure = function (error) {
      console.log(error);
      //alert(error);
    };
    //window.cordova.plugins.FelicaPlugin.startNfc('', success, failure);
    this.felica
      .startNfc('')
      .then((res) => {
        this.zone.run(() => {
          this.idm = res.idm;
          this.pmm = res.pmm;
          this.waonno = res.waonno;
        });
      })
      .catch((e) => {
        //console.log(e);
      });
    //let res = await this.felica.startNfc();
    //console.log(res);
  }
  /* public async Hello() {
    let hello = await this.felica.Hello("Testetststs");
    let coolmethod = await this.felica.coolMethod();
    let nativeToast = await this.felica.nativeToast();
    console.log(hello);
    console.log(coolmethod);
    console.log(nativeToast);
  } */
  public async stopNFC() {
    this.enabled = true;
    var success = function (message) {
      console.log('closed NFC');
    };

    var failure = function (error) {
      console.log(error);
      //alert(error);
    };
    //window.cordova.plugins.FelicaPlugin.stopNfc('', success, failure);
    await this.felica.stopNfc();
  }
}
