import {ProcedureRepository} from "../domain/ports/ProcedureRepository";

export class ProcedureRepositoryImp<LT> implements ProcedureRepository<LT> {

    private proceduresMap: Map<LT, (data: any) => void>

    constructor() {
        this.proceduresMap = new Map()
    }

    getProcedure(procedureType: LT): (data: any) => void {
        if (this.proceduresMap.has(procedureType)) {
            return this.proceduresMap.get(procedureType);
        } else {
            throw `Procedure: ${procedureType} doesn't exist in Repository`;
        }
    }

    addProcedure(procedureType: LT, procedure: (data: any) => void): void {
        this.proceduresMap.set(procedureType, procedure);
    }

    removeProcedure(procedureType: LT): void {
        this.proceduresMap.delete(procedureType)
    }
}