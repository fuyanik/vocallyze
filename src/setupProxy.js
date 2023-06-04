const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/create-payment-intent',
    createProxyMiddleware({
      target: 'http://localhost:4242',
      changeOrigin: true
    })
  );
};