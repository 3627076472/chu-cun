const User = require('../models/User');
const crypto = require('crypto');

// 验证用户名是否符合格式要求（复用已有验证函数）
const validateUsername = require('./authController').validateUsername;
// 验证密码是否符合格式要求（复用已有验证函数）
const validatePassword = require('./authController').validatePassword;

// 验证邮箱格式
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 注册逻辑
const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!validateUsername(username) ||!validatePassword(password) ||!validateEmail(email)) {
    return res.status(400).json({ message: '用户名、密码或邮箱格式不正确，请重新输入！' });
  }
  const encryptedPassword = validatePassword(password);
  try {
    // 创建新用户实例
    const newUser = User.build({
      username,
      password: encryptedPassword,
      email
    });
    // 保存用户到数据库
    await newUser.save();
    return res.status(201).json({ message: '注册成功！' });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: '用户名或邮箱已被使用，请更换后再注册！' });
    }
    return res.status(500).json({ message: '服务器内部错误，请稍后再试！' });
  }
};

module.exports = {
  register
};