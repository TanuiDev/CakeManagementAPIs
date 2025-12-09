import type { Config } from "jest"

const config: Config = {
    preset: "ts-jest", 
    testEnvironment: "node",
    verbose: true, 

    // Coverage Configuration
    collectCoverage:true, // Enables code coverage collection
    coverageDirectory: "coverage", // Output directory for coverage reports
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts' // Files to include for coverage
    ]
}

export default config;
