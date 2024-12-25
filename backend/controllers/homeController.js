// 主页逻辑，这里可以根据需要从数据库获取数据等操作，暂时只返回简单的欢迎信息
const home = (req, res) => {
    res.send('欢迎来到主页！');
  };
  
  module.exports = {
    home
  };