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
  public setTimeStart2:string = '--:--';
  public setTimeEnd2:string = '--:--';
  public setTemp1:string ="";
  public setTemp2:string ="";
  public setLux1:string="";
  public setLux2:string="";
  constructor(public fb:AngularFireDatabase) {}
  ngOnInit(){
    this.fb
    .object("/set/timeall")
    .valueChanges()
    .subscribe((value: any) => {
      console.log(this.setTimeStart1);
      
      this.setTimeStart1 = `${value}`.split(",")[0];
      this.setTimeEnd1 = `${value}`.split(",")[1];
      this.setTimeStart2 = `${value}`.split(",")[2];
      this.setTimeEnd2 = `${value}`.split(",")[3];
      
      
    });
    this.fb
    .object("/set/sensorall")
    .valueChanges()
    .subscribe((value: any) => {
    
      this.setLux1 = `${value}`.split(",")[0];    
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
      .set(this.setTimeStart1+","+this.setTimeEnd1+","+this.setTimeStart2+","+this.setTimeEnd2)
      .then(() => {
      });
  }
  public getTimeEnd1(time:any) {
    let dt = new Date(time);
 
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(dt.getMinutes())}`;
    this.setTimeEnd1 = timeset;
    this.fb
      .object("set/timeall")
      .set(this.setTimeStart1+","+this.setTimeEnd1+","+this.setTimeStart2+","+this.setTimeEnd2)
      .then(() => {
      });
  }
  public getTimeStart2(time:any) {
    let dt = new Date(time);
 
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(dt.getMinutes())}`;
    this.setTimeStart2= timeset;
    this.fb
      .object("set/timeall")
      .set(this.setTimeStart1+","+this.setTimeEnd1+","+this.setTimeStart2+","+this.setTimeEnd2)
      .then(() => {
      });
  }
  public getTimeEnd2(time:any) {
    let dt = new Date(time);
 
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(dt.getMinutes())}`;
    this.setTimeEnd2 = timeset;
    this.fb
      .object("set/timeall")
      .set(this.setTimeStart1+","+this.setTimeEnd1+","+this.setTimeStart2+","+this.setTimeEnd2)
      .then(() => {
      });
  }
    private zeroPad(nr, base = 10) {
      return nr;
      var len = (String(base).length - String(nr).length) + 1;
  
    }
   public SetLux(val:any){ 

    this.setLux1 = val;
    this.setLux2 = val;
    console.log(this.setLux1,this.setLux2);
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
            text: 'ความเข้มแสงที่เหมาะสม '+this.setLux1+' ถึง '+this.setLux2,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500
          })
          this.fb
          .object("set/sensorall")
          .set(this.setLux1+","+this.setTemp1+","+this.setTemp2)
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
            text: 'อุณภูมิ '+this.setTemp1 +"ถึง"+this.setTemp2,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500
          })
          this.fb
          .object("set/sensorall")
          .set(this.setLux1+","+this.setTemp1+","+this.setTemp2)
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


   public Settimesy(val:any){ 
    
    this.setLux1 = val;
    console.log(this.setLux1);
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
            text: 'อุณภูมิ '+this.setLux1,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            timer: 1500
          })
          this.fb
          .object("set/sensorall")
          .set(this.setLux1+","+this.setTemp1+","+this.setTemp2)
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

}
