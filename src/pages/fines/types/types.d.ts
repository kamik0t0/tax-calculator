export interface IRates {
    date: number;
    rate: number;
}

export interface IFinesData {
    debt: number;
    fines: number;
    days: number;
    rate: number;
    _fineRate: number;
}

export interface IFines {
    finesData: IFinesData[];
    debt: number;
    dueDate: number;
    payDate: number;
    debtorType: string;
    fineSumm: number;
    days: number;
    isError: boolean;
}
