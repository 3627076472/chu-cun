// 验证管理员账号密码是否正确
const validateAdmin = (username, password) => {
    const adminUsername = 'admin';
    const adminPassword = 'Lan-tian231';
    return username === adminUsername && password === adminPassword;
  };
  
  // 后台主页逻辑
  const adminHome = (req, res) => {
    const { username, password } = req.body;
    if (validateAdmin(username, password)) {
      res.send('欢迎来到后台主页！');
    } else {
      return res.status(401).json({ message: '管理员账号或密码错误，请重新输入！' });
    }
  };
  
  module.exports = {
    adminHome
  };