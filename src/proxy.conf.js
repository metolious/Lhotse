const PROXY_CONFIG = [
    {
    context: [
    "/mie",
    "/viper",
    "/amsMap"
    ],
    // target: "https://cloud01.amsproj.com:7443",
    target: "https://cloud03.amsproj.com:7443",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    },
    {
    context: [
    "/cas"
    ],
    target: "https://idam.solers.com:8443",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    },
    ]
    
    module.exports = PROXY_CONFIG;