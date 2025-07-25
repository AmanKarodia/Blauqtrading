// middleware/auth.js

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log('✅ Token verified:', decodedToken.uid);
    next();
  } catch (error) {
    console.log('❌ Invalid token:', error.message);
    res.status(403).json({ error: 'Invalid token' });
  }
};

const checkRole = (roles) => (req, res, next) => {
  const userRole = req.user?.role || 'unknown';
  console.log(`🔐 Role check: required = ${roles}, user = ${userRole}`);

  if (!roles.includes(userRole)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};