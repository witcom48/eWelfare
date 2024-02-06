

export class EasypassStatusModel {
  constructor() {}
 
  source: Date = new Date();
  status: string = ""
 
}

export class EasypassSummaryStatusModel {
    constructor() { }   
    _id: EasypassStatusModel = new EasypassStatusModel();
    count: number = 0;
    totalAmount: number = 0;    
   
  }
  