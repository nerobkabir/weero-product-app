// ─── 404 Not Found Handler ────────────────────────────────────────────────────
// Catches requests to routes that don't exist
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Catches all errors passed via next(error)
export const errorHandler = (err, req, res, next) => {
  // Sometimes Express passes a 200 status even for errors — fix that
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Mongoose duplicate key error (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired. Please log in again.',
    });
  }

  // Generic error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Show stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};