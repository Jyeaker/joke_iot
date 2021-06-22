import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  gaugeType = "semi";

  

  public readTemp;
  public readHum;
  public readLux;
  

  constructor(public fb: AngularFireDatabase) {}
  
 ngOnInit(){
  this.fb
  .object("/set/readsensor")
  .valueChanges()
  .subscribe((value: any) => {
  console.log(value);
    this.readLux = `${value}`.split(",")[0];
    this.readTemp = `${value}`.split(",")[1];
    this.readHum = `${value}`.split(",")[2];
    
  });
 }
}
