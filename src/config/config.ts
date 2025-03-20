const config = {
    server: {
        host: 'localhost',
        tokens: {
            access: {
                duration: '30m',
            },
            refresh: {
                duration: '7d',
            },
            reset: {
                duration: '4h',
            },
        },
        allowedOrigins: ['http://localhost:3000', 'http://localhost:5173', '*'],
    },
    database: {
        filesBucketName: 'Raw',
        cleanupInterval: '1d',
    },
};

export default config;
