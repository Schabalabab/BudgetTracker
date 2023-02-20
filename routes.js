const ROUTES = [
    {
        url: '/users',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001/api/v1/users",
            changeOrigin: true,
            pathRewrite: {
                [`^/users`]: '',
            },
        }
    },
    {
        url: '/revenues',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/revenues",
            changeOrigin: true,
            pathRewrite: {
                [`^/revenues`]: '',
            },
        }
    },
    {
        url: '/expenses',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003/api/v1/expenses",
            changeOrigin: true,
            pathRewrite: {
                [`^/expenses`]: '',
            },
        }
    },
    {
        url: '/finances',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3004/api/v1/finances",
            changeOrigin: true,
            pathRewrite: {
                [`^/finances`]: '',
            },
        }
    }
]
exports.ROUTES = ROUTES;