module.exports = {
    testEnvironment: 'jsdom',
    clearMocks: true,
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
};