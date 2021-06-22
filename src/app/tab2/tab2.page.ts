import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{
  public setTimeStart1:string = '--:--';
  public setTimeEnd1:string = '--:--';
  public setTemp1:string ="";
  public setTemp2:string ="";
  public setLux:string="";
  constructor(public fb:AngularFireDatabase) {}
  ngOnInit(){
    this.fb
    .object("/set/timeall")
    .valueChanges()
    .subscribe((value: any) => {
      console.log(this.setTimeStart1);
      
      this.setTimeStart1 = `${value}`.split(",")[0];
      this.setTimeEnd1 = `${value}`.split(",")[1];
      
      
    });
    this.fb
    .object("/set/sensorall")
    .valueChanges()
    .subscribe((value: any) => {
    
      this.setLux = `${value}`.split(",")[0];
      this.setTemp1 = `${value}`.split(",")[1];
      this.setTemp2 = `${value}`.split(",")[2];
      
      console.log(this.setTemp1);
      console.log(this.setTemp2);
      
      
    });
   }

  
  
  public getTimeStart1(time:any) {
    let dt = new Date(time);
 
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(dt.getMinutes())}`;
    this.setTimeStart1 = timeset;
    this.fb
      .object("set/timeall")
      .set(this.setTimeStart1+","+this.setTimeEnd1)
      .then(() => {
      });
  }
  public getTimeEnd1(time:any) {
    let dt = new Date(time);
 
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(dt.getMinutes())}`;
    this.setTimeEnd1 = timeset;
    this.fb
      .object("set/timeall")
      .set(this.setTimeStart1+","+this.setTimeEnd1)
      .then(() => {
      });
  }
    private zeroPad(nr, base = 10) {
      return nr;
      var len = (String(base).length - String(nr).length) + 1;
      //return len > 0 ? new Array(len).join('0') + nr : nr;
    }
   public SetLux(val:any){
    
    this.setLux = val;
    console.log(this.setLux);
    if(val<=70000){
      Swal.fire({
        title: 'ต้องการยืนยัน?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ตกลง!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'อุณภูมิ '+this.setLux,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500
          })
          this.fb
          .object("set/sensorall")
          .set(this.setLux+","+this.setTemp1+","+this.setTemp2)
          .then(() => {
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'ทำการยกเลิก',
            icon:"error",
            timer: 1500
          }
           
            
            
          )
        }
      })
  
    }else{
      Swal.fire({
        title: 'ค่าความเข้มแสงสุงเกินไป!',
        text: 'โปรดใส่ไม่เกิน 70000 Lux',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
        timer: 1500

      })
    }
       }
   public SetTemp(val:any,val1:any){
     let str = 0;
    this.setTemp1 = val;
    this.setTemp2 = val1;
    if(val <= 40 && val1 <=40){
      Swal.fire({
        title: 'ต้องการยืนยัน?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ตกลง!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'อุณภูมิ '+this.setLux,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500
          })
          this.fb
          .object("set/sensorall")
          .set(this.setLux+","+this.setTemp1+","+this.setTemp2)
          .then(() => {
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'ทำการยกเลิก',
            icon:"error",
            timer: 1500
          }
           
            
            
          )
        }
      })
    }
    
    else {
     
      
       
      Swal.fire({
        title: 'อุหภูมิสุงเกินไป!',
        text: 'โปรดใส่ไม่เกิน 40 องศา',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        timer: 1500

      })
         
         
      
      
     
    }
    
    
   }
}
