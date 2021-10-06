import jwt from 'jsonwebtoken'
import config from 'config'

const authmiddleware = (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.json({ authError: true, message: 'no token' })
    }

    const decoded = jwt.verify(token, config.get('secret'))
    req.userId = decoded.id
    next();
  } catch (e) {
    return res.send({ authError: true, message: 'error' })
  }
}

export default authmiddleware
