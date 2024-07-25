"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    qa: {
        port: 3000,
        mongodb: 'mongodb://mongo_db:2717/cb_subscription',
        serviceUrl: "https://hn.algolia.com/api/v1/search_by_date?"
    },
    develoment: {
        port: 3000,
        mongodb: 'mongodb://mongo_db:2717/cb_subscription',
        serviceUrl: "https://hn.algolia.com/api/v1/search_by_date?"
    },
    production: {
        port: 3000,
        mongodb: 'mongodb://mongo_db:2717/cb_subscription',
        serviceUrl: "https://hn.algolia.com/api/v1/search_by_date?"
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map