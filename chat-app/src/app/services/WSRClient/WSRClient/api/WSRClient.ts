import {WebSocketHandler} from "../application/services/WebSocketHandler";
import {ProcedureRepository} from "../domain/ports/ProcedureRepository";
import {ProcedureDTO} from "../domain/model/ProcedureDTO";
import {EventEmitter} from "@angular/core";

export class WSRClient<LT, RT> {


    public static configure<LT, RT>(webSocketHandler: WebSocketHandler<LT,RT>,procedureRepository:ProcedureRepository<LT>): WSRClient<LT, RT> {
        return new WSRClient(webSocketHandler,procedureRepository);
    }

    private constructor(
        private webSocketHandler: WebSocketHandler<LT,RT>,
        private procedureRepository:ProcedureRepository<LT>) {

    }

    public addProcedure<D>(procedureType: LT, dataType: D, method: (data: D) => void): void {
        this.procedureRepository.addProcedure(procedureType,method);
    }

    public executeRemoteProcedure(procedureType: RT, data: any): void {

        let procedureDTO = new ProcedureDTO<RT,any>();
        procedureDTO.setData(data);
        procedureDTO.setType(procedureType)

        this.webSocketHandler.sendData(procedureDTO);
    }

    onOpen(): EventEmitter<Event>{
        return this.webSocketHandler.onOpen();
    }


}
