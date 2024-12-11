const config = {
    server: {
        host: 'localhost',
        tokens: {
            access: {
                duration: '1m',
            },
            refresh: {
                duration: '30m',
            },
            reset: {
                duration: '4h',
            },
        },
        allowedOrigins: ['http://localhost:3000', 'http://localhost:5173', '*'],
    },
    database: {
        filesBucketName: 'Files',
        cleanupInterval: '1d',
    },
};

export default config;
