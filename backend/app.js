const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');
// 引入速率限制中间件，用于防止DDoS攻击
const rateLimit = require('express-rate-limit');

// 配置速率限制，限制每个IP在一定时间内的请求次数
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 100, // 每个IP每分钟最多100次请求
  message: '请求过于频繁，请稍后再试'
});

// 应用速率限制中间件到所有路由
app.use(limiter);

// 解决跨域问题，实际应用中可根据需要配置更严格的跨域策略
app.use(cors());

// 解析JSON格式的请求体数据，方便获取前端传来的用户名、密码、邮箱等数据
app.use(express.json());

// 使用认证相关的路由
app.use('/api', authRoutes);
// 使用注册相关的路由
app.use('/api', registerRoutes);
// 使用主页相关的路由
app.use('/api', homeRoutes);
// 使用后台主页相关的路由
app.use('/api', adminRoutes);

// 配置静态文件中间件，将public目录下的文件作为静态资源，以便能访问到index.html
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`后端服务启动，监听端口 ${port}`);
});