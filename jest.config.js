/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["ts-jest", { tsconfig: "tsconfig.dev.json" }],
  },
  testMatch: ["<rootDir>/**/*.test.ts"],
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1",
  },
};

export default config;
