const config = {
    server: {
        host: 'localhost',
        tokens: {
            access: {
                duration: '6h',
            },
            refresh: {
                duration: '7d',
            },
            reset: {
                duration: '1d',
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
