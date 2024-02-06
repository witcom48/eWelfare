
export class InitialCurrent {
  constructor() {

  }

  Language: string = "TH";
  Username: string = "Blank";
  Usertype: string = "EMP";
  LastLogin: Date = new Date();  
  Token: string = "";

  Description: string = "";


  public doGetJSONInitialCurrent(): string {
    var item_data: string = "";
    item_data = item_data + "{"; 
    item_data = item_data + "\"Language\":\"" + this.Language + "\"";
    item_data = item_data + ",\"Username\":\"" + this.Username + "\"";
    item_data = item_data + ",\"Usertype\":\"" + this.Usertype + "\"";
    item_data = item_data + ",\"LastLogin\":\"" + this.LastLogin + "\"";
    item_data = item_data + ",\"Token\":\"" + this.Token + "\"";
    item_data = item_data + ",\"Description\":\"" + this.Description + "\"";
    item_data = item_data + "}";
    return item_data;
  }





}
