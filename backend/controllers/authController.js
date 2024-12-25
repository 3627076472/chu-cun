const User = require('../models/User');
const crypto = require('crypto');

// 验证用户名是否符合格式要求（可复用之前前端类似的验证逻辑，但后端验证更可靠）
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// 验证密码是否符合格式要求并进行加密处理
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  }
  // 使用更安全的Node.js内置加密库对密码进行加密，这里采用SHA256算法示例
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

// 登录验证逻辑
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!validateUsername(username) ||!validatePassword(password)) {
    return res.status(400).json({ message: '用户名或密码格式不正确，请重新输入！' });
  }
  const encryptedPassword = validatePassword(password);
  try {
    const user = await User.findOne({ where: { username } });
    if (user && user.password === encryptedPassword) {
      // 登录成功，可以在这里设置一些会话管理（如使用express-session等库），暂略
      return res.status(200).json({ message: '登录成功！' });
    }
    return res.status(401).json({ message: '用户名或密码错误，请重新输入！' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '服务器内部错误，请稍后再试！' });
  }
};

module.exports = {
  login
};