import { EasypassFeeModel } from '../../models/easypass/easypass_fee';
import { DatePipe } from '@angular/common';
import { AppConfig } from '../../config/config';

export class EtaxModel {
    constructor() {
      
    }
    
    ETax_doc: string = "";
    ETax_detail: string = "";
    ETax_amount: string = "";
    ETax_tax: string = "";


    issueDateTime: string = "";
    PostingDate: string = "";
    CustomerName: string = "";
    CustomerCode: string = "";
    CustomerAddressLine1: string = "";
    CustomerAddressLine2: string = "";
    CustomerPostcode: string = "";
    CustomerTaxID: string = "";

    DocAmount: string = "0.00";
    DocDiscount: string = "0.00";
    DocAfterDiscount: string = "0.00";
    DocTax: string = "0.00";
    DocNet: string = "0.00";
    FIDoc: string = "";

    typeCode: string = "T03";
    originalInformationAmount: string = "";


    PostBy: string = "";
    ReferenceNumber: string = "";
    CarRegisteration: string = "";
    schemeID: string = "";
    CustomerBranchCode: string = "";

    ReplaceissuerAssignedID: string = "";
    ReplaceissueDateTime: string = "";
    ReplacereferenceTypeCode: string = "";
    purpose: string = "";
    purposeCode: string = "";

    FiscalYear: string = "";
    FiscalRef: string = "";

    //-- Add 07/11/2023
    OBU: string = "";
    CustomerAccountID: string = "";
    EMAIL: string = "";
    RequestSendMail: string = "N";
    SmartCardNumber: string = "";
    //--
    
    modified_by: string = "";
    modified_date: Date = new Date();
    
    public setData(datePipe:DatePipe, fee:EasypassFeeModel, postby:string){

      let dateNow = new Date()      
      let config = new AppConfig()

      //-- Clear space
      fee.address = fee.address.trimEnd()
      fee.tax_id = fee.tax_id.trimEnd()


      this.CustomerCode = fee.cust_acct_id
      //this.CustomerName = (fee.title || "") + fee.fname + ' ' + (fee.lname || "")
      this.CustomerName = fee.fullname
      this.CustomerCode = fee.cust_acct_id    
      this.CustomerTaxID = fee.tax_id


      this.CustomerTaxID = this.CustomerTaxID.replace("(", "").replace(")", "")

      //if(this.CustomerTaxID.length > 13){
      //  this.CustomerTaxID = this.CustomerTaxID.substring(0, 13)
      //}

      if(fee.cust_type == "P"){
        this.schemeID = "NIDN"
      }
      else if(fee.cust_type == "C"){
        this.schemeID = "TXID"

        if(this.CustomerTaxID.length > 13){
          var tmp = this.CustomerTaxID.substring(13, fee.tax_id.length-1)
          tmp = tmp.replace("(", "").replace(")", "")
          //console.log(tmp)
          //console.log(this.CustomerTaxID)
          this.CustomerBranchCode = tmp
        }
        else{
          this.CustomerBranchCode = fee.branch_id
        }        
        
      }
      else{
        this.schemeID = "OTHR"
      }

                
      this.CustomerAddressLine1 = fee.address.substring(0, fee.address.length - 5)
      this.CustomerPostcode = fee.address.substring(fee.address.length - 5, fee.address.length)
      this.DocAmount = fee.fee_amount.toFixed(2)
      this.DocDiscount = "0.00"
      this.DocAfterDiscount = this.DocAmount
      
      this.FIDoc = ""
      this.PostBy = postby      
      this.issueDateTime = datePipe.transform(fee.fee_date, 'yyyy-MM-dd') + "T00:00:00"
      this.FiscalYear = datePipe.transform(fee.fee_date, 'yyyy') + ""
      this.PostingDate = datePipe.transform(dateNow, 'yyyy-MM-dd') + "T00:00:00"
      this.ReferenceNumber = "OEEFEE000" + datePipe.transform(fee.fee_date, 'yyMMdd') + "00000001"
      this.ETax_detail = config.ETaxDetail;

      var tax = fee.fee_amount * 7 /107

      this.ETax_amount = fee.fee_amount.toFixed(2)
      this.ETax_tax = tax.toFixed(2)
      this.DocTax = tax.toFixed(2)

      var net = fee.fee_amount - tax
      if(net < 0){
        net = 0
      }      

      this.DocNet  = net.toFixed(2)    

      this.ETax_doc = fee.etax_doc


      //-- Add 07/11/2023
      this.OBU = fee.pan_num
      this.CustomerAccountID = fee.cust_acct_id
      this.SmartCardNumber = fee.smartcard_id
      
      if(fee.etax_consent == "Y"){
        this.RequestSendMail = "Y"
        this.EMAIL = fee.email
      }
      //--

    }
   
  }
