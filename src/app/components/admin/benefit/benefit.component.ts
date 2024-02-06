import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table'; 
import { MegaMenuItem, MenuItem } from 'primeng/api';

import { InitialCurrent } from '../../../config/initial_current';
import { AppConfig } from '../../../config/config';

import { BenefitModel } from '../../../models/benefit';
import { BenefitService } from '../../../services/benefit.service';


interface Dropdown {
  name: string,
  code: string
}

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit {

  ingredient!: string;

  @ViewChild(Table ) dt: Table | undefined ;
  
  constructor(private benefitService: BenefitService,     
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    ) { }
  
  loading: boolean = false;
  progress: boolean = false;

  // #region Language
  language!: string;

  title_grid_id: {[key: string]: string} = {  EN: "ID",  TH: "รหัส"}
  title_grid_from: {[key: string]: string} = {  EN: "From Date",  TH: "จากวันที่"}
  title_grid_to: {[key: string]: string} = {  EN: "To Date",  TH: "ถึงวันที่"}
  title_grid_text: {[key: string]: string} = {  EN: "Detail",  TH: "รายละเอียด"}
  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Modify date",  TH: "วันที่ทำรายการ"}

  title_new: {[key: string]: string} = {  EN: "New",  TH: "เพิ่ม"}
  title_edit: {[key: string]: string} = {  EN: "Edit",  TH: "แก้ไข"}
  title_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_more: {[key: string]: string} = {  EN: "More",  TH: "เพิ่มเติม"}
  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}
  title_upload: {[key: string]: string} = {  EN: "Upload",  TH: "อัพโหลด"}
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }

  title_confirm: {[key: string]: string} = {  EN: "Are you sure?",  TH: "ยืนยันการทำรายการ"}
  title_confirm_save: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการบันทึกข้อมูลใช่หรือไม่"}
  title_confirm_reduce: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการออกใบลดหนี้ใช่หรือไม่"}
  title_confirm_delete: {[key: string]: string} = {  EN: "Confirm to delete",  TH: "คุณต้องการลบรายการ"}
  title_confirm_yes: {[key: string]: string} = {  EN: "Yes",  TH: "ใช่"}
  title_confirm_no: {[key: string]: string} = {  EN: "No",  TH: "ยกเลิก"}
  title_confirm_cancel: {[key: string]: string} = {  EN: "You have cancelled",  TH: "คุณยกเลิกการทำรายการ"}

  title_page: {[key: string]: string} = {  EN: "Manage benefit information",  TH: "จัดการข้อมูลสิทธิประโยชน์"}
  title_search_condition: {[key: string]: string} = {  EN: "Search conditions",  TH: "เงื่อนไขการค้นหา"}


  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}
  
  // #endregion

  menu_benefit: MenuItem[] = [];
  
  public config:AppConfig = new AppConfig();
      
  ngOnInit(): void {
    this.language = "TH"      
    this.doGetInitialCurrent()
    this.doLoadMenu()
    
    setTimeout(async () => {
      this.doGetData()        
    }, 300);

  }

  doLoadMenu(){
    this.menu_benefit = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          
          
        }
      }      
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          
          this.exportAsExcel()
        }
      }     
      
    ];
  }

  @ViewChild('TABLE') table: ElementRef | any = null;
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_benefit.xlsx');

  }

    
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
      if (!this.initial_current.Token) {
          //this.router.navigateByUrl('login');
      }
      else{
        this.language = this.initial_current.Language
      }
  }

  displayManage: boolean = false;
  position: string = "right";
  doShowDetail(doc:string){
    this.displayManage = true
  }

  doCloseDetail(){
    this.displayManage = false
  }

 
  async doGetData() {
    this.loading = true
    await this.benefitService.getToken().then(async (res) => {    
      console.log(res)  
      
      setTimeout(() => {
        this.doGetBenefitList(res) 
        
      }, 300);
            
    });       

  }  


  fill_fromdate: Date = new Date()
  fill_todate: Date = new Date()
  benefit_list: BenefitModel[] = [];
  seletedBenefit:BenefitModel = new BenefitModel()
  async doGetBenefitList(token:string) {
    this.loading = true
   
    await this.benefitService.benefit_get(token, this.fill_fromdate, this.fill_todate).then(async (res) => {       
      
      //console.log(res.data.length)
      
      if(res.success === true){                    
        this.benefit_list = res.data           
        this.loading = false

        if(res.data.length == 0){
          this.messageService.add({severity:'info', summary: 'ไม่พบข้อมูล', detail: res.message});
        }

      }
      else{
        this.loading = false
      }
    });
  }  

  customer_name: string = ""
  
  benefit_fromdate: Date = new Date()
  benefit_todate: Date = new Date()
  
  doShowBenefitDetail(id:string){

    this.loading = true
    this.progress = false

    for (let i = 0; i < this.benefit_list.length; i++) {   
      if(this.benefit_list[i].BENEFIT_ID==id ){
        this.seletedBenefit = this.benefit_list[i];
                
        setTimeout(async () => {

        }, 300);

        setTimeout(async () => {
          this.displayManage = true
          this.loading = false

          this.benefit_fromdate = new Date( this.seletedBenefit.BENEFIT_FROM)
          this.benefit_todate = new Date( this.seletedBenefit.BENEFIT_TO)

          //console.log(this.seletedBenefit.BENEFIT_FROM)

        }, 400);

        break;         
      }                      
    }

  }

  onRowSelectFee(event: Event) {
    this.progress = false
  }

  async doRecord(){

    this.confirmationService.confirm({
      message: this.title_confirm_save[this.language],
      header: this.title_confirm[this.language],
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {

        try{

          await this.benefitService.getToken().then(async (token) => {    
                        
            setTimeout(async () => {

              this.seletedBenefit.BENEFIT_FROM = new Date(this.benefit_fromdate)
              this.seletedBenefit.BENEFIT_TO = new Date(this.benefit_todate)
              
              await this.benefitService.benefit_record(token, this.seletedBenefit).then(async (res) => {       
                      
                if(res.success === true){                   
                   
                  this.loading = false
          
                  this.messageService.add({severity:'success', summary: 'ทำรายการสำเร็จ', detail: res.message});
                  this.doGetData()
          
                  this.displayManage = false
                }
                else{

                  this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
                  this.loading = false

                }
              });
              
            }, 300);
                  
          });      

        }
        catch{
          this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
          this.progress = false
          
        }        

      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.language]});
        this.progress = false
      },
      key: "myDialog"
    });
  }

  async doRemove(id:string){

    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.language],
      header: this.title_confirm[this.language],
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {

        try{

          await this.benefitService.getToken().then(async (token) => {    
                        
            setTimeout(async () => {
              
              await this.benefitService.benefit_remove(token, id).then(async (res) => {       
                      
                if(res.success === true){                   
                   
                  this.loading = false
          
                  this.messageService.add({severity:'success', summary: 'ทำรายการสำเร็จ', detail: res.message});
                  this.doGetData()
          
                  this.displayManage = false
                }
                else{

                  this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
                  this.loading = false

                }
              });
              
            }, 300);
                  
          });      

        }
        catch{
          this.messageService.add({severity:'error', summary: 'Error', detail: "พบข้อผิดผลาดในการทำรายการ โปรดติดต่อเจ้าหน้าที่่"});
          this.progress = false
          
        }        

      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.language]});
        this.progress = false
      },
      key: "myDialog"
    });

  }
  
}
