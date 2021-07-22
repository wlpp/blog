const koa = require("koa");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const cors = require('koa2-cors');
const chalk = require("chalk");

const app = new koa();
const home = require("./routes/home");
const article = require("./routes/article");
const books = require("./routes/books");
const record = require("./routes/record");
app.use(bodyParser()); //必须先注册bodyParser再注册路由，否则会获取不到
app.use(home.routes(), home.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(books.routes(), books.allowedMethods());
app.use(record.routes(), record.allowedMethods());

app.keys = ["WLPP"];

const sessionConfig = {
  key: "login",
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true
};
app.use(session(sessionConfig, app));

// 允许跨域
app.use(cors());
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*"); // 很奇怪的是，使用 * 会出现一些其他问题
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH");
//   await next();
// });

// 404报错页面配置
app.use(async (ctx, next) => {
  if (ctx.status == 404) {
    ctx.body = "亲，这是404页面哦";
  }
  await next();
});

// 服务器错误处理
app.on("error", (err, ctx) => {
  console.error(chalk.red("server error", err, ctx));
});

// 连接数据库
// mongoose.connect("mongodb://120.78.199.0:27018/admin", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err) {
    console.log(chalk.green("连接数据库成功"));
    app.listen(3333, () => console.log(chalk.green("服务已启动")));
  } else {
    console.log(chalk.red("连接数据库失败"));
  }
});
