import { Component, OnInit } from '@angular/core';


import { WelfareSummaryModel } from '../../../models/welfare_summary';
import { WelfareDetailModel } from '../../../models/welfare_detail';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.scss']
})
export class WelfareComponent implements OnInit {

  constructor() { }


  summary_list: WelfareSummaryModel[] = [];

  ngOnInit(): void {

    this.doGetWelfareList()
  }


  doGetWelfareList(){

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

}
