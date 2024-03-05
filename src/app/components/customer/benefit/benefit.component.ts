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

  title_page: {[key: string]: string} = {  EN: "Benefit information",  TH: "ข้อมูลสิทธิประโยชน์"}
  
  // #endregion

  menu_benefit: MenuItem[] = [];
  
  public config:AppConfig = new AppConfig();
      
  ngOnInit(): void {
    this.language = "TH"      
    this.doGetInitialCurrent()
       
    setTimeout(async () => {
      this.doGetData()        
    }, 300);

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
   
  async doGetData() {
    this.loading = true
    await this.benefitService.getToken().then(async (res) => {    
            
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
  
  
 


  
}
