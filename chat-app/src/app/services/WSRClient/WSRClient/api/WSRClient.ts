import {WebSocketHandler} from "../application/services/WebSocketHandler";
import {ProcedureRepository} from "../domain/ports/ProcedureRepository";
import {ProcedureDTO} from "../domain/model/ProcedureDTO";
import {EventEmitter} from "@angular/core";
import {Procedure} from "../domain/model/Procedure";

export class WSRClient<LT, RT> {


    public static configure<LT, RT>(webSocketHandler: WebSocketHandler<LT,RT>,procedureRepository:ProcedureRepository<LT>): WSRClient<LT, RT> {
        return new WSRClient(webSocketHandler,procedureRepository);
    }

    private constructor(
        private webSocketHandler: WebSocketHandler<LT,RT>,
        private procedureRepository:ProcedureRepository<LT>) {

    }

    public addProcedure<D>(procedureType: LT, dataType: D, method: (data: D) => void): void {
        const procedure: Procedure<LT,any> = new Procedure();
        procedure.setDataObject(dataType);
        procedure.setType(procedureType);
        procedure.setMethod(method);
        this.procedureRepository.addProcedure(procedure);
    }

    public executeRemoteProcedure(procedureType: RT, data: any): void {

        let procedureDTO = new ProcedureDTO<RT,any>();
        procedureDTO.setData(data);
        procedureDTO.setType(procedureType)
        console.log("data: ",data,"procedure: ",procedureDTO)

        this.webSocketHandler.sendData(procedureDTO);
    }

    onOpen(): EventEmitter<Event>{
        return this.webSocketHandler.onOpen();
    }


}
