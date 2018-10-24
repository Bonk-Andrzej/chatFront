import {ProcedureRepository} from "../domain/ports/ProcedureRepository";

export class ProcedureRepositoryImp<LT> implements ProcedureRepository<LT>{

    private proceduresMap : Map<LT,(data:any|null)=>void>

    constructor() {
        this.proceduresMap = new Map()
    }

    getProcedure(procedureType: LT):(data:any|null)=>void{
        return this.proceduresMap.get(procedureType);
    }

    addProcedure(procedureType: LT, procedure: (data:any|null) => void): void {
        this.proceduresMap.set(procedureType,procedure);
    }

    removeProcedure(procedureType: LT): void {
        this.proceduresMap.delete(procedureType)
    }
}