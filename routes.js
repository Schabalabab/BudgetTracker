const ROUTES = [
    //get & post users
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
    //get revenues
    {
        url: '/revenues/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/users/revenues",
            changeOrigin: true,
            pathRewrite: {
                [`^/revenues`]: '',
            },
        }
    },
    //post revenues
    {
        url: '/revenues',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/users/revenues",
            changeOrigin: true,
            pathRewrite: {
                [`^/revenues`]: '',
            },
        }
    },
    //get expenses
    {
        url: '/expenses/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003/api/v1/users/expenses",
            changeOrigin: true,
            pathRewrite: {
                [`^/expenses`]: '',
            },
        }
    },
    //post expenses
    {
        url: '/expenses',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003/api/v1/users/expenses",
            changeOrigin: true,
            pathRewrite: {
                [`^/expenses`]: '',
            },
        }
    },
    //get finances
    {
        url: '/finances/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3004/api/v1/users/finances",
            changeOrigin: true,
            pathRewrite: {
                [`^/finances`]: '',
            },
        }
    }
]
exports.ROUTES = ROUTES;