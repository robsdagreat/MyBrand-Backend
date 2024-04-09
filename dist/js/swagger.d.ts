declare const swaggerOptions: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
        };
        servers: {
            url: string;
            description: string;
        }[];
    };
    apis: string[];
};
export default swaggerOptions;
