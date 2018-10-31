import {Procedure} from "../model/Procedure";

export interface ProcedureRepository<LT> {

    addProcedure(procedure: Procedure<LT,any>);

    removeProcedure(procedureType: LT): void;

    getProcedure(procedureType: LT): Procedure<LT,any>;

}