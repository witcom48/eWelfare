export class AppConfig {
  constructor() {

  }

  
  static SystemName: {[key: string]: string} = {  EN: "Request a tax invoice for card account maintenance Easy Pass",  TH: "ขอใบกำกับภาษีค่ารักษาบัญชีบัตร Easy Pass"}


  //*********************************************************************************
  //-- Develop 
  //*********************************************************************************

  // //-- Fee
  // ApiGetToken : string = "http://localhost:8000"
  // ApiGetTokenUsername : string = "exat"
  // ApiGetTokenPassword : string = "ExatFee@2023"
  // ApiEasypassFeeModule : string = "http://localhost:8000/v1"

  // //-- SSO
  // ApiExatLoginSSO : string = "http://localhost:8000/v1/authen"


  //-- Thai easypass
  ApiExatAuth : string = "https://ebiz-service.thaieasypass.com/backend_system/api/v1/auth"
  ApiExatAuthUsername : string = "exat_it_01"
  ApiExatAuthPassword : string = "siQNa2UXTp7U5f"  
  ApiExatMember : string = "https://ebiz-service.thaieasypass.com/backend_system/api/v1/exat_member/member"
  
  //-- Etax
  // ApiETaxSign : string = "https://etaxuat.exat.co.th/etaxService/api/v1/Sign/SignDocument"
  // ApiETaxToken : string = "http://etaxdev.exat.co.th/etaxService/api/v1/login/auth"
  // ApiETaxUsername : string = "crm001"
  // ApiETaxPassword : string = "password1"

  //*********************************************************************************
  //-- Production 
  //*********************************************************************************

  //-- Fee
  ApiGetToken : string = "http://localhost:4000"

  ApiEwelfare : string = "http://localhost:4000/v1"

  ApiGetTokenUsername : string = "e-welfare"
  ApiGetTokenPassword : string = "Exat2023"
  ApiEasypassFeeModule : string = "http://10.204.31.132/app-api/v1"

  //-- SSO
  ApiExatLoginSSO : string = "http://10.204.31.132/app-api/v1/authen"

  //-- Etax
  ApiETaxSign : string = "https://etax.exat.co.th/etaxService/api/v1/Sign/SignDocument"
  ApiETaxToken : string = "https://etax.exat.co.th/etaxService/api/v1/login/auth"
  ApiETaxUsername : string = "fee_prd"
  ApiETaxPassword : string = "oCl0HkB4COwfGnOLb3L4"



  //--------------------------------------------------------------------------

  ETaxFormNumber: string = "แบบฟอร์ม 3202"
  ETaxChannel: string = "FEE"
  ETaxTopic: string = "CPO006"
  ETaxServiceType: string = "002"
  ETaxDetail: string = "ค่าธรรมเนียมการรักษาบัญชีบัตร Easy Pass"

  static LOCALAccount: string = "Weeewqrtycdffbfbcdbd@";
  static LOCALFillStatus: string = "status@";
  static LOCALFromdate: string = "from@";
  static LOCALTodate: string = "to@";
  static LOCALFillBy: string = "fillby@";
  static LOCALFillKeyword: string = "fillkeyword@";
  static LOCALInitial: string = "LOCALInitial";


  



  


  


  

  


}
