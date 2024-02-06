import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders, HttpErrorResponse   } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { EtaxModel } from '../../models/etax/etax';
import { CustomerModel } from '../../models/account/customer';


@Injectable({
  providedIn: 'root'
})
export class EtaxService {

  public config:AppConfig = new AppConfig();
  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe) { 
    this.doGetInitialCurrent();
  }

  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
    if (this.initial_current) {
      this.httpHeaders = new HttpHeaders({
        'contentType': 'false',     
        'timeout': '0',        
        'mimeType': "multipart/form-data",        
        'processData': 'false'
      });

      this.options = {
        headers: this.httpHeaders
      };

    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }

  public async doGetToken(){

    var form = new FormData();
    form.append("username", this.config.ApiETaxUsername);
    form.append("password", this.config.ApiETaxPassword);

    return this.http.post<any>(this.config.ApiETaxToken, form, this.options).toPromise()   
    .then((res) => {  
      return res.access_token;
    });    

  }

  public async genarate_etax(model:EtaxModel){

    const data = {
      exchangedDocument: {
        id: model.ETax_doc,
        typeCode: model.typeCode,
        issueDateTime: model.issueDateTime,
        purpose: model.purpose,
        purposeCode: model.purposeCode
      },
      supplyChainTradeTransaction: {
        applicableHeaderTradeAgreement: {
          sellerTradeParty: {
            id: [
              "0010"
            ]
          },
          buyerTradeParty: {
            id: [
              model.CustomerCode
            ],
            name: model.CustomerName,
            specifiedTaxRegistration: {
              id: {
                value: model.CustomerTaxID,
                schemeID: model.schemeID
              }
            },
            postalTradeAddress: {
              postcodeCode: model.CustomerPostcode,
              lineOne: model.CustomerAddressLine1,
              lineTwo: model.CustomerAddressLine2,
              countryID: {
                schemeID: "3166-1 alpha-2",
                value: "TH"
              }
            }
          },
          additionalReferencedDocument: [
            {
              issuerAssignedID: model.ReplaceissuerAssignedID,
              issueDateTime: model.ReplaceissueDateTime,
              referenceTypeCode: model.ReplacereferenceTypeCode
            }
          ]
        },
        applicableHeaderTradeSettlement: {
          invoiceCurrencyCode: {
            listID: "ISO 4217 3A",
            value: "THB"
          },
          applicableTradeTax: [
            {
              typeCode: "VAT",
              calculatedRate: "7",
              basisAmount: [
                model.DocAmount
              ],
              calculatedAmount: [
                model.DocTax
              ]
            }
          ],
          SpecifiedTradeAllowanceCharge: [
            {
              chargeIndicator: "false",
              actualAmount: [
                "0.00"
              ],
              reasonCode: ""
            }
          ],
          specifiedTradeSettlementHeaderMonetarySummation: {
            originalInformationAmount: [
              {
                currencyID: "THB",
                value: model.originalInformationAmount
              }
            ],
            lineTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocAmount
              }
            ],
            differenceInformationAmount: [
              {
                currencyID: "THB",
                value: model.originalInformationAmount
              }
            ],
            allowanceTotalAmount: [
              {
                currencyID: "THB",
                value: "0.00"
              }
            ],
            chargeTotalAmount: [
              {
                currencyID: "THB",
                value: "0.00"
              }
            ],
            taxBasisTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocNet
              }
            ],
            taxTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocTax
              }
            ],
            grandTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocAmount
              }
            ]
          }
        },
        includedSupplyChainTradeLineItem: [
            
          {
            associatedDocumentLineDocument: {
              lineID: "1",
              ReferenceNumber: model.ReferenceNumber
            },
            specifiedTradeProduct: {
              name: [
                model.ETax_detail
              ],
              Description: [
                ""
              ],
              originTradeCountry: {
                id: {
                  schemeID: "3166-1 alpha-2",
                  value: "TH"
                }
              }
            },
            specifiedLineTradeAgreement: {
              grossPriceProductTradePrice: {
                chargeAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ],
                appliedTradeAllowanceCharge: [
                  {
                    chargeIndicator: "false",
                    actualAmount: [
                      "0.00"
                    ],
                    reasonCode: ""
                  }
                ]
              }
            },
            specifiedLineTradeDelivery: {
              billedQuantity: {
                unitCode: "EA",
                value: "1.00 "
              }
            },
            specifiedLineTradeSettlement: {
              applicableTradeTax: [
                {
                  typeCode: "VAT",
                  calculatedRate: "7",
                  basisAmount: [
                    model.ETax_amount
                  ],
                  calculatedAmount: [
                    model.ETax_tax
                  ]
                }
              ],
              SpecifiedTradeAllowanceCharge: [
                {
                  chargeIndicator: "false",
                  actualAmount: [
                    "0.00"
                  ],
                  reasonCode: ""
                }
              ],
              specifiedTradeSettlementLineMonetarySummation: {
                taxTotalAmount: [
                  {
                    currencyID: "THB",
                    value: "0.00"
                  }
                ],
                netLineTotalAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ],
                netIncludingTaxesLineTotalAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ]
              }
            }
          }            
         
             
        ]
      },
      SmartCardNumber: model.SmartCardNumber,
      ContractNumber: "",
      CarRegisteration: model.CarRegisteration,
      CarProvince: "",
      DealDate: "",
      DealDateText: "",
      RentalDescription: "",
      PaymentChanel: "10",
      MID: "",
      TID: "",
      ApprovalCode: "",
      BankCheque: "",
      ChequeNumber: "",
      ChequeDate: "",
      FastService: "",
      Remark: "",
      FormNumber: this.config.ETaxFormNumber,
      FIDoc: model.FIDoc,
      Advice: "",
      RequestSendMail: model.RequestSendMail,
      Channel: this.config.ETaxChannel,
      Topic: this.config.ETaxTopic,
      ServiceType: this.config.ETaxServiceType,
      CustomerBranchCode: model.CustomerBranchCode,
      SellerBrachCode: "",
      OBU: model.OBU,
      CustomerAccountID: model.CustomerAccountID,
      PostingDate: model.PostingDate,
      PostBy: model.PostBy,
      TXNExitDate: "",
      CSDate: "",
      EMAIL: model.EMAIL,
      ContractTerm: "",
      Reference1: "",
      Reference2: "",
      BillPaymentFlag: "",
      Advice002: "",
      FiscalYear: model.FiscalYear,
      PlazaId: "",
      FiscalRef: model.FiscalRef
    }

    //console.log(JSON.stringify(data))

    try{

      let token = await this.doGetToken();

      if(token != ""){   
        let header = new HttpHeaders({
          'Authorization': "Bearer " + token,    
          'Content-Type': "application/json",   
        });

        let option = {
          headers: header
        };

        return this.http.post<any>(this.config.ApiETaxSign, data, option).toPromise()   
        .then((res) => {
          //console.log(res)      
          return res
        })
        .catch((err: HttpErrorResponse) => {

          console.log(err)    

          const res = {
            success:false,
            message:err
          }
    
          return res
        });
      }

    }
    catch(err) {

      const res = {
        success:false,
        message:err
      }

      return res

    }


  }

  public async genarate_etax_reduce(model:EtaxModel){

    const data = {
      exchangedDocument: {
        id: model.ETax_doc,
        typeCode: model.typeCode,
        issueDateTime: model.issueDateTime,
        purpose: model.purpose,
        purposeCode: model.purposeCode
      },
      supplyChainTradeTransaction: {
        applicableHeaderTradeAgreement: {
          sellerTradeParty: {
            id: [
              "0010"
            ]
          },
          buyerTradeParty: {
            id: [
              model.CustomerCode
            ],
            name: model.CustomerName,
            specifiedTaxRegistration: {
              id: {
                value: model.CustomerTaxID,
                schemeID: model.schemeID
              }
            },
            postalTradeAddress: {
              postcodeCode: model.CustomerPostcode,
              lineOne: model.CustomerAddressLine1,
              lineTwo: model.CustomerAddressLine2,
              countryID: {
                schemeID: "3166-1 alpha-2",
                value: "TH"
              }
            }
          },
          additionalReferencedDocument: [
            {
              issuerAssignedID: model.ReplaceissuerAssignedID,
              issueDateTime: model.ReplaceissueDateTime,
              referenceTypeCode: model.ReplacereferenceTypeCode
            }
          ]
        },
        applicableHeaderTradeSettlement: {
          invoiceCurrencyCode: {
            listID: "ISO 4217 3A",
            value: "THB"
          },
          applicableTradeTax: [
            {
              typeCode: "VAT",
              calculatedRate: "7",
              basisAmount: [
                model.DocNet
              ],
              calculatedAmount: [
                model.DocTax
              ]
            }
          ],
          SpecifiedTradeAllowanceCharge: [
            {
              chargeIndicator: "false",
              actualAmount: [
                "0.00"
              ],
              reasonCode: ""
            }
          ],
          specifiedTradeSettlementHeaderMonetarySummation: {
            originalInformationAmount: [
              {
                currencyID: "THB",
                value: model.DocNet
              }
            ],
            lineTotalAmount: [
              {
                currencyID: "THB",
                value: "0.00"
              }
            ],
            differenceInformationAmount: [
              {
                currencyID: "THB",
                value: model.DocNet
              }
            ],
            allowanceTotalAmount: [
              {
                currencyID: "THB",
                value: "0.00"
              }
            ],
            chargeTotalAmount: [
              {
                currencyID: "THB",
                value: "0.00"
              }
            ],
            taxBasisTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocNet
              }
            ],
            taxTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocTax
              }
            ],
            grandTotalAmount: [
              {
                currencyID: "THB",
                value: model.DocAmount
              }
            ]
          }
        },
        includedSupplyChainTradeLineItem: [
            
          {
            associatedDocumentLineDocument: {
              lineID: "1",
              ReferenceNumber: model.ReferenceNumber
            },
            specifiedTradeProduct: {
              name: [
                model.ETax_detail
              ],
              Description: [
                ""
              ],
              originTradeCountry: {
                id: {
                  schemeID: "3166-1 alpha-2",
                  value: "TH"
                }
              }
            },
            specifiedLineTradeAgreement: {
              grossPriceProductTradePrice: {
                chargeAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ],
                appliedTradeAllowanceCharge: [
                  {
                    chargeIndicator: "false",
                    actualAmount: [
                      "0.00"
                    ],
                    reasonCode: ""
                  }
                ]
              }
            },
            specifiedLineTradeDelivery: {
              billedQuantity: {
                unitCode: "EA",
                value: "1.00 "
              }
            },
            specifiedLineTradeSettlement: {
              applicableTradeTax: [
                {
                  typeCode: "VAT",
                  calculatedRate: "7",
                  basisAmount: [
                    model.ETax_amount
                  ],
                  calculatedAmount: [
                    model.ETax_tax
                  ]
                }
              ],
              SpecifiedTradeAllowanceCharge: [
                {
                  chargeIndicator: "false",
                  actualAmount: [
                    "0.00"
                  ],
                  reasonCode: ""
                }
              ],
              specifiedTradeSettlementLineMonetarySummation: {
                taxTotalAmount: [
                  {
                    currencyID: "THB",
                    value: "0.00"
                  }
                ],
                netLineTotalAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ],
                netIncludingTaxesLineTotalAmount: [
                  {
                    currencyID: "THB",
                    value: model.ETax_amount
                  }
                ]
              }
            }
          }            
         
             
        ]
      },
      SmartCardNumber: model.SmartCardNumber,
      ContractNumber: "",
      CarRegisteration: model.CarRegisteration,
      CarProvince: "",
      DealDate: "",
      DealDateText: "",
      RentalDescription: "",
      PaymentChanel: "10",
      MID: "",
      TID: "",
      ApprovalCode: "",
      BankCheque: "",
      ChequeNumber: "",
      ChequeDate: "",
      FastService: "",
      Remark: "",
      FormNumber: this.config.ETaxFormNumber,
      FIDoc: model.FIDoc,
      Advice: "",
      RequestSendMail: model.RequestSendMail,
      Channel: this.config.ETaxChannel,
      Topic: this.config.ETaxTopic,
      ServiceType: this.config.ETaxServiceType,
      CustomerBranchCode: model.CustomerBranchCode,
      SellerBrachCode: "",
      OBU: model.OBU,
      CustomerAccountID: model.CustomerAccountID,
      PostingDate: model.PostingDate,
      PostBy: model.PostBy,
      TXNExitDate: "",
      CSDate: "",
      EMAIL: model.EMAIL,
      ContractTerm: "",
      Reference1: "",
      Reference2: "",
      BillPaymentFlag: "",
      Advice002: "",
      FiscalYear: model.FiscalYear,
      PlazaId: "",
      FiscalRef: model.FiscalRef
    }

    //console.log(JSON.stringify(data))

    try{

      let token = await this.doGetToken();

      if(token != ""){   
        let header = new HttpHeaders({
          'Authorization': "Bearer " + token,    
          'Content-Type': "application/json",   
        });

        let option = {
          headers: header
        };

        return this.http.post<any>(this.config.ApiETaxSign, data, option).toPromise()   
        .then((res) => {
          //console.log(res)      
          return res
        })
        .catch((err: HttpErrorResponse) => {

          console.log(err)    

          const res = {
            success:false,
            message:err
          }
    
          return res
        });
      }

    }
    catch(err) {

      const res = {
        success:false,
        message:err
      }

      return res

    }


  }

}
