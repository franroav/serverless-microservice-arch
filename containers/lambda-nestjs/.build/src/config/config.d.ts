declare const config: {
    qa: {
        port: number;
        mongodb: string;
        serviceUrl: string;
    };
    develoment: {
        port: number;
        mongodb: string;
        serviceUrl: string;
    };
    production: {
        port: number;
        mongodb: string;
        serviceUrl: string;
    };
};
export default config;
