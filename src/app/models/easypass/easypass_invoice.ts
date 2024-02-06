
import { EtaxModel } from '../../models/etax/etax';

export class EasypassInvoiceModel {
    constructor() {
     
    }

    __v: string = "";
    _id: string = "";

    fee_doc: string = "";
    fee_date: Date = new Date();
    fee_amount: number = 0;
    fee_status: string = "";
    etax_doc: string = "";
    etax_type: string = "";
    etax_data: EtaxModel = new EtaxModel();
    create_by: string = "";
    create_date: Date = new Date();
    
   
  }
  