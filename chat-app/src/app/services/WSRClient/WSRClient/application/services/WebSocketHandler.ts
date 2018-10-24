import {ProcedureRepository} from "../../domain/ports/ProcedureRepository";
import {ProcedureDTO} from "../../domain/model/ProcedureDTO";

export class WebSocketHandler<LT,RT> {

    private webSocket: WebSocket;

    constructor(url: string, private procedureRepository: ProcedureRepository<LT>) {
        let host = window.location.host;

        console.log("Before connect")
        this.webSocket = new WebSocket("ws://127.0.0.1:8080/socket");



        console.log(this.webSocket)

        this.webSocket.onopen = this.onOpen;
        this.webSocket.onmessage = this.onMessage;
        this.webSocket.onclose = this.onClose
        this.webSocket.onerror = this.onError

        console.log("End")

    }

    private onOpen(event: Event): void {
        console.log(event," Open event")
    }

    private onMessage(event: MessageEvent): void {

        let procedureDTO: ProcedureDTO<LT, any> = <ProcedureDTO<LT, any>> JSON.parse(event.data)
        let procedure = this.procedureRepository.getProcedure(procedureDTO.getType());
        if(procedure){
            procedure(procedureDTO.getData());
        }


    }

    private onClose(event: CloseEvent) {
        console.log("close <<<")
    }

    private onError(event: Event) {
        console.log(event,"Error WSR")
    }

    public sendData(procedureDTO:ProcedureDTO<RT,any>): void {
        this.webSocket.send(JSON.stringify(procedureDTO));
    }
}