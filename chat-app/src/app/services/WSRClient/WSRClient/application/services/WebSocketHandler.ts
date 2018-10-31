import {ProcedureRepository} from "../../domain/ports/ProcedureRepository";
import {ProcedureDTO} from "../../domain/model/ProcedureDTO";
import {JsonParser} from "./JsonParser";
import {EventEmitter} from "@angular/core";
import {Procedure} from "../../domain/model/Procedure";

export class WebSocketHandler<LT, RT> {

    private readonly webSocket: WebSocket;
    private procedureRepository: ProcedureRepository<LT>;
    private jsonParser: JsonParser<LT>;

    private onOpenEvent: EventEmitter<Event> = new EventEmitter();
    private onCloseEvent: EventEmitter<CloseEvent> = new EventEmitter();
    private onErrorEvent: EventEmitter<Event> = new EventEmitter();

    constructor(url: string, procedureRepository: ProcedureRepository<LT>) {

        this.webSocket = new WebSocket(url);
        this.procedureRepository = procedureRepository;
        this.jsonParser = new JsonParser();

        this.webSocket.onopen = (e) => this.onOpenEvent.emit(e);
        this.webSocket.onmessage = (e) => this.onMessage(e);
        this.webSocket.onclose = (e) => this.onCloseEvent.emit(e);
        this.webSocket.onerror = (e) => this.onOpenEvent.emit(e);

    }

    private onMessage(event: MessageEvent): void {
        try {
            let procedureDTO: ProcedureDTO<LT, any> = this.jsonParser.parse(event.data,new ProcedureDTO())
            let procedure: Procedure<LT,any> = this.procedureRepository.getProcedure(procedureDTO.getType());
            procedure.getMethod()(procedureDTO.getData())

        } catch (e) {
            console.warn(e);
        }
    }


    public sendData(procedureDTO: ProcedureDTO<RT, any>): void {
        const s = JSON.stringify(procedureDTO);
        console.log("to send ",s,procedureDTO);
        this.webSocket.send(s);
    }

    public onOpen(): EventEmitter<Event> {
        return this.onOpenEvent;
    }

    public onClose(): EventEmitter<CloseEvent> {
        return this.onCloseEvent;
    }

    private onError(): EventEmitter<Event> {
        return this.onErrorEvent;
    }
}