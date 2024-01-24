const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/skild_api_spring",
    createProxyMiddleware({
      target: "https://staging.skild.com",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        // add "Referer" header to request
        // we need this because based on the domain name
        // the server identifies on which event we are associated
        proxyReq.setHeader("Referer", "https://contestant-dev.skild.com/login");
        // or log the req
      },
    })
  );
};
