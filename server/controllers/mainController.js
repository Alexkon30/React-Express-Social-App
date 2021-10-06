import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';


// const generateAccessToken = (id) => {
//   const payload = { id }
//   return jwt.sign(payload, config.secret, { expiresIn: '1h' });
// }


class mainController {
  async register(req, res) {
    const { username, email, password, confirmedPass, agreement } = req.body;
    //console.log(req.body);

    if (password !== confirmedPass) {
      return res.json({ success: false, message: 'Different passwords' })
    }

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.send({ success: false, message: `User with email ${email} already exist` })
    }

    //добавить валидатор полей из формы
    //№4 3:56 express-validator 
    //возвращать объект с сообщением для каждого из полей
    //добавить проверку на галочку согласия с условиями пользования (agreement === true)

    let date = new Date();
    let month = `${date.getMonth() + 1}`.length == 1 ?
      `0${date.getMonth() + 1}` :
      `${date.getMonth() + 1}`;

    const hashPassword = await bcrypt.hash(password, 5)

    User.create({
      username,
      email,
      agreement,
      password: hashPassword,
      dateOfRegistration: `${date.getDate()}.${month}.${date.getFullYear()}`,
    })
      .then(result => {
        const token = jwt.sign({ id: result.id }, config.get('secret'), { expiresIn: '1h' })
        return res.json({
          success: true,
          message: 'User was created',
          token
        })
      })
      .catch(err => {
        res.json({ success: false, message: 'Server error' })
      })
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: `Invalid email or password` })
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      return res.json({ success: false, message: `Invalid email or password` })
    }

    const token = jwt.sign({ id: user.id }, config.get('secret'), { expiresIn: '1h' })
    return res.json({
      success: true,
      username: user.name,
      token
    })
  }
}

export default new mainController();


// const token = generateAccessToken(user.id);
// res.cookie('token', token, {
//   httpOnly: true,
// });
