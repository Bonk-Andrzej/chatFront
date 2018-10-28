export interface ProcedureRepository<LT> {

    addProcedure(procedureType: LT, procedure: (data:any) => void): void;

    removeProcedure(procedureType: LT): void;

    getProcedure(procedureType: LT): (data:any) => void;

}