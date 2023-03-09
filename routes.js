const ROUTES = [
    //get & post users
    {
        url: '/getUsers',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001/api/v1/getUsers",
            changeOrigin: true,
            pathRewrite: {
                [`^/getUsers`]: '',
            },
        }
    },
    {
        url: '/postUsers',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001/api/v1/postUsers",
            changeOrigin: true,
            pathRewrite: {
                [`^/postUsers`]: '',
            },
        }
    },
    {
        url: '/deleteUsers/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001/api/v1/deleteUsers",
            changeOrigin: true,
            pathRewrite: {
                [`^/deleteUsers`]: '',
            },
        }
    },
    //get revenues
    {
        url: '/getRevenues/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/users/getRevenues",
            changeOrigin: true,
            pathRewrite: {
                [`^/getRevenues`]: '',
            },
        }
    },
    //post revenues
    {
        url: '/postRevenues',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/users/postRevenues",
            changeOrigin: true,
            pathRewrite: {
                [`^/postRevenues`]: '',
            },
        }
    },
    //get expenses
    {
        url: '/getExpenses/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003/api/v1/users/getExpenses",
            changeOrigin: true,
            pathRewrite: {
                [`^/getExpenses`]: '',
            },
        }
    },
    //post expenses
    {
        url: '/postExpenses',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003/api/v1/users/postExpenses",
            changeOrigin: true,
            pathRewrite: {
                [`^/postExpenses`]: '',
            },
        }
    },
    //get finances
    {
        url: '/getFinances/**',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3004/api/v1/users/getFinances",
            changeOrigin: true,
            pathRewrite: {
                [`^/getFinances`]: '',
            },
        }
    }
]
exports.ROUTES = ROUTES;