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
    // id: string;
    finesData: IFinesData[];
    debt: number;
    dueDate: number;
    payDate: number;
    debtorType: string;
    fineSumm: number;
    days: number;
    isError: boolean;
}

export interface IFinesProps {
    id: string;
    debt: number;
    dueDate: number;
    payDate: number;
    debtorType: string;
    fineSumm: number;
    days: number;
    isError: boolean;
}
