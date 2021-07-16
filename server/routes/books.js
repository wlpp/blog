const router = require("koa-router")();
const books = require("../models/books");

router.get("/getBooks", async (ctx, next) => {
  const result = await books.find();
  if (result) {
    ctx.body = {
      code: 200,
      message: "success",
      data: result
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
