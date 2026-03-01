const functions = require('@google-cloud/functions-framework');

functions.http('app', (req, res) => {

  if (req.path === '/health') {
    return res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date()
    });
  }

  if (req.path === '/api') {
    return res.status(200).json({
      message: 'API is working',
    });
  }

  // Default route
  res.status(200).send('Hello World!');
});
