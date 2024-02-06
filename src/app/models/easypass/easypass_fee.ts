export class EasypassFeeModel {
    constructor() {
     
    }

    __v: string = "";
    _id: string = "";

    fee_doc: string = "";
    fee_date: Date = new Date();
    fee_amount: number = 0;
    fee_status: string = "";

    cust_acct_id: string = "";
    pan_num: string = "";
    smartcard_id: string = "";
    cust_type: string = "";
    title: string = "";
    fname: string = "";
    lname: string = "";
    tax_id: string = "";
    branch_id: string = "";
    address: string = "";
    plate_no: string = "";
    email: string = "";
    etax_consent: string = "";
    etax_doc: string = "";
       
    modified_by: string = "";
    modified_date: Date = new Date();
   
    //-- show only
    fullname: string = "";

    public getFullname() : string{      
      this.fullname =  (this.title || "") + this.fname + ' ' + (this.lname || "")
      return this.fullname
    }

  }
  