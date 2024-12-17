import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } ),

    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    }
}

export default jestConfig;






