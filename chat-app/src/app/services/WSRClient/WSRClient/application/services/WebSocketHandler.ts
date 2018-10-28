import {ProcedureRepository} from "../../domain/ports/ProcedureRepository";
import {ProcedureDTO} from "../../domain/model/ProcedureDTO";
import {ProcedureJsonParser} from "./ProcedureJsonParser";
import {EventEmitter} from "@angular/core";

export class WebSocketHandler<LT, RT> {

    private readonly webSocket: WebSocket;
    private procedureRepository: ProcedureRepository<LT>;
    private procedureJsonParser: ProcedureJsonParser<LT>;

    private onOpenEvent: EventEmitter<Event> = new EventEmitter();
    private onCloseEvent: EventEmitter<CloseEvent> = new EventEmitter();
    private onErrorEvent: EventEmitter<Event> = new EventEmitter();

    constructor(url: string, procedureRepository: ProcedureRepository<LT>) {

        this.webSocket = new WebSocket("ws://127.0.0.1:8080/socket");
        this.procedureRepository = procedureRepository;
        this.procedureJsonParser = new ProcedureJsonParser();

        this.webSocket.onopen = (e) => this.onOpenEvent.emit(e);
        this.webSocket.onmessage = (e) => this.onMessage(e);
        this.webSocket.onclose = (e) => this.onCloseEvent.emit(e);
        this.webSocket.onerror = (e) => this.onOpenEvent.emit(e);

    }

    private onMessage(event: MessageEvent): void {
        try {
            let procedureDTO: ProcedureDTO<LT, any> = this.procedureJsonParser.parse(event.data)
            let procedure = this.procedureRepository.getProcedure(procedureDTO.getType());
            procedure(procedureDTO.getData());

        } catch (e) {
            console.warn(e);
        }
    }


    public sendData(procedureDTO: ProcedureDTO<RT, any>): void {
        this.webSocket.send(JSON.stringify(procedureDTO));
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