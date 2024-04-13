const port = process.env.PORT;
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PORTFOLIO API',
            version: '1.0.0',
            description: 'API documentation for my Portfolio',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Local Development Server',
            },
            {
                url: 'https://mybrand-backend-s9f7.onrender.com/',
                description: 'Production Server',
            }
        ],
    },
    apis: ['./src/routes/*.ts'],
};
export default swaggerOptions;
//# sourceMappingURL=swagger.js.map