import { ISalaries } from "../exports/interfaces";
import { StaticRates } from "../exports/utils";

// Перерасчет НДФЛ с учетом вычетов
export const calcPIT = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    const recoupment = calcRecoupment(+value);
    const accrued = +state.months[table].salary[index].accrued;
    const taxPITBase = +accrued - +recoupment;
    const PIT = taxPITBase * StaticRates.PIT;
    const payment = accrued - PIT;

    return { PIT, payment };
};

// Базовый расчет НДФЛ
export const calcBasicPIT = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    // НДФЛ (personal income tax)
    const recoupment = calcRecoupment(
        state.months[table].salary[index].childrenQtty
    );
    const PIT = (value - recoupment) * StaticRates.PIT;
    const payment = value - PIT;
    return { PIT, payment };
};
// TODO: все числовые значения в переменные
const calcRecoupment = (childrenQtty: number) => {
    if (childrenQtty <= 2) return childrenQtty * 1400;
    else return (childrenQtty - 2) * 3000 + 2800;
};
