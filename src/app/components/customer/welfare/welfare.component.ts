import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table'; 
import { MegaMenuItem, MenuItem } from 'primeng/api';

import { InitialCurrent } from '../../../config/initial_current';
import { AppConfig } from '../../../config/config';

import { WelfareSummaryModel } from '../../../models/welfare_summary';
import { WelfareDetailModel } from '../../../models/welfare_detail';
import { HostranService } from '../../../services/hostran.service';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.scss']
})
export class WelfareComponent implements OnInit {

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


  title_wel_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}
  title_wel_type: {[key: string]: string} = {  EN: "Type",  TH: "ประเภท"}
  title_wel_amount: {[key: string]: string} = {  EN: "Amount",  TH: "จำนวนเงิน"}
  title_wel_fee: {[key: string]: string} = {  EN: "Fee",  TH: "ค่าธรรมเนียม"}
  title_wel_real: {[key: string]: string} = {  EN: "Payment",  TH: "จ่ายจริง"}

  title_hospital: {[key: string]: string} = {  EN: "Medical expenses",  TH: "ค่ารักษาพยาบาล"}
  title_education: {[key: string]: string} = {  EN: "Child education allowance",  TH: "ค่าช่วยเหลือการศึกษาบุตร"}
  title_bank: {[key: string]: string} = {  EN: "Account",  TH: "เลขที่บัญชี"}
  title_payment: {[key: string]: string} = {  EN: "Amount paid",  TH: "ยอดเงินที่จ่าย"}
  title_bath: {[key: string]: string} = {  EN: "Bath",  TH: "บาท"}
  title_paydate: {[key: string]: string} = {  EN: "Paydate",  TH: "วันที่จ่าย"}

  title_detail: {[key: string]: string} = {  EN: "Description",  TH: "รายละเอียด"}

  // #endregion

   constructor(private hostranService: HostranService,     
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    ) { }


  summary_list: WelfareSummaryModel[] = [];

  async ngOnInit(): Promise<void> {

    this.language = "TH"      
    var tmp = await this.doGetInitialCurrent()
   
    if (tmp==1){
      this.doGetData()
    }
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

      return 1
  }

  displayManage: boolean = false;
  position: string = "right";
  async doShowDetail(paydate:Date){
    this.displayManage = true

    this.loading = true
    await this.hostranService.getToken().then(async (res) => {    
            
      setTimeout(() => {

        this.doGetWelfareDetail(res, paydate)
          
        
      }, 300);
            
    });  
    
  }

  doCloseDetail(){
    this.displayManage = false
  }



  doGetWelfareList_DEMO(){

    this.summary_list = []

    var tmp = new WelfareSummaryModel();  
    var dateString = '2024-02-15T00:00:00'
    tmp.wel_paydate = new Date(dateString);
    tmp.wel_amount = 634
    tmp.wel_fee = 350
    tmp.wel_count = 2
    this.summary_list.push(tmp)
    //
    tmp = new WelfareSummaryModel();  
    dateString = '2024-01-05T00:00:00'
    tmp.wel_paydate = new Date(dateString);
    tmp.wel_amount = 208
    tmp.wel_fee = 0
    tmp.wel_count = 1
    this.summary_list.push(tmp)

  }


  async doGetData() {
    this.loading = true
    await this.hostranService.getToken().then(async (res) => {    
            
      setTimeout(() => {
        this.doGetWelfareList(res) 
        
      }, 300);
            
    });       

  }  


  welfare_list: WelfareSummaryModel[] = [];  
  async doGetWelfareList(token:string) {
    this.loading = true

    console.log(this.initial_current.Username)
   
    await this.hostranService.welfare_summary(token, this.initial_current.Username).then(async (res) => {       
      
      //console.log(res.data.length)
      
      if(res.success === true){                    
        this.welfare_list = res.data           
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

  welfaredetail_list: WelfareSummaryModel[] = [];
  seletedWelfare:WelfareDetailModel = new WelfareDetailModel()
  async doGetWelfareDetail(token:string, paydate:Date) {
    this.loading = true

    await this.hostranService.welfare_detail(token, this.initial_current.Username, paydate).then(async (res) => {       
            
      if(res.success === true){                    
        this.welfaredetail_list = res.data           
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

  doGetWelfareType(value:string){
    if(value=="H"){
      return "ค่ารักษาพยาบาล"
    }
    else{
      return "การศึกษาบุตร"
    }
  }

}
