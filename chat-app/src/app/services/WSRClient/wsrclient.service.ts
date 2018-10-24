import { Injectable } from '@angular/core';
import {WSRConnector} from "./WSRClient/api/WSRConnector";


@Injectable({
    providedIn: 'root'
})
export class WSRClientService {

  constructor() {

    let wsrConnector = new WSRConnector<string,string>();

    console.log(wsrConnector)

    console.log("WSRClient Start")

    let WSRClient = wsrConnector.connect("ws://localhost:8080/socket");


    WSRClient.addProcedure("TEST","",data => {

      console.log("Test procedure")
    });

    setTimeout(()=>{
      console.log(("send"))
        WSRClient.executeRemoteProcedure("RMTEST","Message")
    },1000)



  }
}
