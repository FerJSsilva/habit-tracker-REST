// Centralized Pino logger configuration
const level = process.env.LOG_LEVEL || 'info';
const isProduction = process.env.NODE_ENV === 'production';

const loggerOptions = {
  level,
  serializers: {
    req: (req) => {
      const serializedReq = {
        method: req.method,
        url: req.url
      };

      // Only log detailed request data (body, params, query) in non-production environments
      if (!isProduction) {
        serializedReq.params = req.params;
        serializedReq.query = req.query;
        serializedReq.body = req.body;
      }

      return serializedReq;
    },
    res: (res) => ({
      statusCode: res.statusCode
    })
  }
};

if (!isProduction) {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
      colorize: true
    }
  };
}

export default loggerOptions;
