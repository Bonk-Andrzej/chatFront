import {ProcedureDTO} from "../../domain/model/ProcedureDTO";

export class ProcedureJsonParser<LT> {

    public parse(json: string) :ProcedureDTO<LT,any>{
        return  Object.assign(new ProcedureDTO(),JSON.parse(json))
    }

}