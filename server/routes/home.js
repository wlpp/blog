const router = require("koa-router")();
const tags = require("../models/tags");
const blogger = require("../models/blogger");
const reader = require("../models/reader");
const allArticle = require("../models/allArticle");
// 文章列表
router.get("/allArticle", async (ctx, next) => {
  const tagNames = eval("/^.*" + ctx.query.tagNames + ".*$/");
  const title = eval("/^.*" + ctx.query.title + ".*$/");
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  // 获取页码数
  const pageTotal = await allArticle
    .find({ tagNames, title }, (err, res) => {})
    .then(res => {
      return res.length > pageSize ? Math.ceil(res.length / pageSize) : 1;
    });
  const result = await allArticle
    .find({ title, tagNames })
    .sort({ createTime: -1 })
    .skip((pageIndex - 1) * pageSize)
    .limit(parseInt(pageSize));
  if (result) {
    ctx.body = {
      code: 200,
      data: result || [],
      pageTotal
    };
  } else {
    ctx.body = {
      code: 400,
      message: "数据出错获取失败"
    };
  }
  await next();
});
// 标签列表
router.get("/tags", async (ctx, next) => {
  const result = await tags.distinct("name");
  if (result) {
    ctx.body = {
      code: 200,
      message: "success",
      data: result || []
    };
  } else {
    ctx.body = {
      code: 400,
      message: "数据出错获取失败"
    };
  }
  await next();
});
// 博主信息
router.get("/blogger", async (ctx, next) => {
  const result = await blogger.find();
  if (result) {
    ctx.body = {
      code: 200,
      message: "success",
      data: result || []
    };
  } else {
    ctx.body = {
      code: 400,
      message: "数据出错获取失败"
    };
  }
  await next();
});

// 添加读者
router.post("/addReader", async (ctx, next) => {
  const { name, email } = ctx.request.body;
  const result = await reader.find({ name });
  if (result.length > 0) {
    ctx.body = {
      code: 400,
      message: "用户名已被注册"
    };
  } else {
    await new reader({
      name,
      email,
      like: false
    }).save();
    ctx.body = {
      code: 200,
      message: "填写完成"
    };
  }
  await next();
});

router.post("/updateReader", async (ctx, next) => {
  const result = await reader.updateOne({ _id }, { like: true });
  if (result) {
    ctx.body = {
      code: 200,
      message: "更新成功"
    };
  }
  await next();
});
router.get("/getReader", async (ctx, next) => {
  const { _id } = ctx.request.body;
  const result = await reader.find({ _id });
  if (result) {
    ctx.body = {
      code: 200,
      data: result || []
    };
  } else {
    ctx.body = {
      code: 400,
      message: "数据出错获取失败"
    };
  }
  await next();
});
module.exports = router;
