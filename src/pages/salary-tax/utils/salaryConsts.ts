// НДФЛ (personal income tax)
export enum StaticRates {
    PIT = 0.13,
    accident = 0.002,
}

export enum BasicRates {
    name = "Плательщики страховых взносов, применяющие основной тариф страховых взносов",
    code = "01",
    retirement = 0.22,
    medical = 0.051,
    social = 0.029,
}

export enum itRates {
    name = "Плательщики страховых взносов, применяющие основной тариф страховых взносов",
    code = "06",
    retirement = 0.06,
    medical = 0.001,
    social = 0.015,
}
export enum BusinessRates {
    name = "Плательщики страховых взносов, применяющие основной тариф страховых взносов",
    code = "20",
    retirement = 0.1,
    medical = 0.05,
    social = 0,
}

export enum Limits {
    social = 1032000,
    retirement = 1565000,
}

export enum FixInsuranceValues {
    medical = 8766,
    retirement = 34445,
}

export const FloatInsuranceRate = 0.01;
export const RegionCoefficient = 0.15;
export const MinimalSalary01012022 = 13890;
export const RegionMinimalSalary01012022 = 15973;
export const MinimalSalary01062022 = 15279;
export const RegionMinimalSalary01062022 = 17570;
