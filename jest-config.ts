import type { Config } from "jest";

const config: Config = {
    // aliases если используются в Webpack и tsconfig.json
    moduleNameMapper: {
        "^@helpers(.*)$": "<rootDir>/src/helpers$1",
        "^@sharedcomponents(.*)$": "<rootDir>/src/shared/components$1",
        "^@customhooks(.*)$": "<rootDir>/src/hooks/$1",
        "^@scripts(.*)$": "<rootDir>/src/scripts/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@reduxhooks(.*)$": "<rootDir>/src/redux/hooks/$1",
        "^@salarystore(.*)$": "<rootDir>/src/pages/accrual/slice/$1",
        "^@invoicesstore(.*)$": "<rootDir>/src/pages/vat/slice/$1",
        "^@uistore(.*)$": "<rootDir>/src/redux/ui-slice/$1",
        "^@dialogstore(.*)$": "<rootDir>/src/redux/dialog-slice/$1",
        "^@calcstore(.*)$": "<rootDir>/src/pages/calculator/slice/$1",
        "^@finestore(.*)$": "<rootDir>/src/pages/fines/slice/$1",
        "^@themes(.*)$": "<rootDir>/src/themes/$1",
        "^@router(.*)$": "<rootDir>/src/routers/$1",
        "^@components(.*)$": "<rootDir>/src/components/$1",
    },
    // установить npm i jest-environment-jsdom --save-dev
    // прописать среду окружения поскольку не поставляется из коробки
    testEnvironment: "jsdom",
};

export default config;
