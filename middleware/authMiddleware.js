export const getUsername = (req, res, next) => {
    // Ambil username dari local storage (via header)
    req.username = req.headers['x-username'] || 'unknown';
    next();
  };