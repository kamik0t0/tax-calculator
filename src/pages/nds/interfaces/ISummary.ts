type total = {
    summ: number;
    nds: number;
};

export interface ISummary {
    purches: total;
    sales: total;
    issued: total;
    recieved: total;
    nds: number;
    [prop: string]: any;
}
