import {WSRClient} from "./WSRClient";
import {WebSocketHandler} from "../application/services/WebSocketHandler";
import {ProcedureRepositoryImp} from "../infrastructure/ProcedureRepositoryImp";
import {ProcedureRepository} from "../domain/ports/ProcedureRepository";

export class WSRConnector<LT,RT> {

    public connect(url: string):WSRClient<LT,RT>{

        console.log(ProcedureRepositoryImp)
        console.log("OK")
        let procedureRepositoryImp: ProcedureRepository<LT> = new ProcedureRepositoryImp();
        let webSocketHandler = new WebSocketHandler(url,procedureRepositoryImp);

        console.log((WSRClient))
        return WSRClient.configure(webSocketHandler,procedureRepositoryImp);

    }
}