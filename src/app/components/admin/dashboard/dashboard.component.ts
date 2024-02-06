import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { InitialCurrent } from '../../../config/initial_current';
import { AppConfig } from '../../../config/config';
import { EasypassSummaryAmountModel } from '../../../models/easypass/easypass_summary_amount';
import { EasypassStatusModel, EasypassSummaryStatusModel } from '../../../models/easypass/easypass_summary_status';
import { EasypassFeeService } from '../../../services/easypass/easypass_fee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  loading: boolean = false;
  progress: boolean = false;

  // #region Language
  language!: string;

  title_page: {[key: string]: string} = {  EN: "Home",  TH: "หน้าแรก"}


  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่ตัดเงิน"}
  title_count: {[key: string]: string} = {  EN: "Count",  TH: "จำนวนรายการ"}
  title_amount: {[key: string]: string} = {  EN: "Amount",  TH: "จำนวนเงิน"}
  title_status: {[key: string]: string} = {  EN: "Status",  TH: "ออกใบกำกับภาษี"}

  constructor(     
    private router:Router,   
    private easypassFeeService: EasypassFeeService
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()

    this.doGenChart()

    this.loading = true
    setTimeout(() => {
      this.doGetData()     
    }, 500);
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
      if (!this.initial_current.Token) {
          this.router.navigateByUrl('login');
      }
      else{
        this.language = this.initial_current.Language
      }
  }

  async doGetData() {
    
    await this.easypassFeeService.getToken().then(async (token) => {      
      
      setTimeout(() => {
        this.doGetSummaryAmount(token) 
        this.doGetSummaryStatus(token) 
      }, 300);
            
    });       

  }  

  amount_list: EasypassSummaryAmountModel[] = [];
  async doGetSummaryAmount(token:string) {
    
    await this.easypassFeeService.fee_summary_amount(token).then(async (res) => {       
      
      //console.log(res.data)
      
      if(res.success === true){                    
        this.amount_list = res.data           
        

        this.doughnutChartLabels = []
        this.doughnutChartData = []

        for (let i = 0; i < this.amount_list.length; i++) {
          this.doughnutChartLabels[i] = formatDate(this.amount_list[i]._id,'dd-MM-yyyy',"en-US");
          this.doughnutChartData[i] = this.amount_list[i].totalAmount
        }

        setTimeout(() => {
          this.doGenChart() 
          this.loading = false
        }, 1000);  

      }
      else{
        this.loading = false
      }
    });
  }  

  status_list: EasypassSummaryStatusModel[] = [];
  async doGetSummaryStatus(token:string) {
    
    await this.easypassFeeService.fee_summary_status(token).then(async (res) => {       
            
      if(res.success === true){                    
        this.status_list = res.data           
        this.loading = false        
      }
      else{
        this.loading = false
      }
    });
  }  


  data: any;
  options: any;

  public doughnutChartLabels = ['A', 'B', 'C'];
  public doughnutChartData = [0, 0, 0];

  doGenChart(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.doughnutChartLabels,
      datasets: [
          {
              data: this.doughnutChartData,
              label: 'จำนวนเงิน',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
          }
      ]
    };

    this.options = {
      
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }

      }
    };
    
  }

  doGetStatusDetail(input:string) : string {

    if(input=="F"){
      return "เรียบร้อยแล้ว"
    }
    else{
      return "รอดำเนินการ"
    }
    
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'F':
        return 'success';
      case 'W':
        return 'Info';
      case 'C':
        return 'danger';
    }
  }

}
