import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,


  roots: ["<rootDir>/__tests__"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^@service/(.*)$": "<rootDir>/src/service/$1",
    "^@repo/(.*)$": "<rootDir>/src/repositories/$1",
    "^@mailer/(.*)$": "<rootDir>/src/mailer/$1"
  },

  
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  },

  
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"]
};

export default config;
