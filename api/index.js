// Vercel Serverless 函数入口
const { createServer } = require('http');
const handler = require('./server/dist/api/index.js').default;

module.exports = async (req, res) => {
  return handler(req, res);
};

// Vercel 配置
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
