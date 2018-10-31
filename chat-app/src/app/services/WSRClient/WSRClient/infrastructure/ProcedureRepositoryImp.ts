import {ProcedureRepository} from "../domain/ports/ProcedureRepository";
import {Procedure} from "../domain/model/Procedure";

export class ProcedureRepositoryImp<LT> implements ProcedureRepository<LT> {

    private proceduresMap: Map<LT, Procedure<LT,any>>

    constructor() {
        this.proceduresMap = new Map()
    }

    addProcedure(procedure: Procedure<LT, any>) {
        this.proceduresMap.set(procedure.getType(),procedure);
    }

    getProcedure(procedureType: LT): Procedure<LT, any> {
            if (this.proceduresMap.has(procedureType)) {
                return this.proceduresMap.get(procedureType);
            } else {
                throw `Procedure: ${procedureType} doesn't exist in Repository`;
            }
    }
    removeProcedure(procedureType: LT): void {
        this.proceduresMap.delete(procedureType)
    }
}