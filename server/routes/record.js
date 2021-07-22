const router = require("koa-router")();
const record = require("../models/record");

router.get("/getRecord", async (ctx, next) => {
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  const pageTotal = await record.find().then(res => {
    return res.length > pageSize ? Math.ceil(res.length / pageSize) : 1;
  });
  const result = await record
    .find()
    .sort({ createTime: -1 })
    .skip((pageIndex - 1) * pageSize)
    .limit(parseInt(pageSize));
  if (result) {
    ctx.body = {
      code: 200,
      message: "success",
      pageTotal,
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
router.post("/like", async (ctx, next) => {
  const { id } = ctx.request.body;
  const result = await record.updateOne({ id }, { $inc: { like: 1 } });
  if (result.n != 0 && result.nModified != 0) {
    ctx.body = {
      code: 200,
      message: "点赞成功"
    };
  } else {
    ctx.body = {
      code: 400,
      message: "点赞失败"
    };
  }
  await next();
});
module.exports = router;
