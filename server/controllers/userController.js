// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import config from 'config';


// const generateAccessToken = (id) => {
//   const payload = { id }
//   return jwt.sign(payload, config.secret, { expiresIn: '1h' });
// }


class userController {
  async getMainInfo(req, res) {
    console.log('req.userId: ', req.userId)


    res.json({ success: true, message: 'ok' })
  }


}

export default new userController();


// const token = generateAccessToken(user.id);
// res.cookie('token', token, {
//   httpOnly: true,
// });
