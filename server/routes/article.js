const router = require("koa-router")();
const article = require("../models/article");
const comment = require("../models/comment");
const blogger = require("../models/blogger");
const edit = require("../models/edit");
const archive = require("../models/archive");
const allArticle = require("../models/allArticle");
const tags = require("../models/tags");
// 获取文章
router.get("/getArticle", async (ctx, next) => {
  const id = ctx.query.id;
  const result = await article.findOne({ id });
  if (result) {
    ctx.body = {
      code: 200,
      data: result || [],
      success: true
    };
  } else {
    ctx.body = {
      code: 400,
      message: "无该ID文章"
    };
  }
  await next();
});
// 创建文章
router.post("/createArticle", async (ctx, next) => {
  const { content, title, tagNames } = ctx.request.body;
  const id = Math.floor(Math.random() * 9999);
  await new article({
    id,
    title,
    content,
    commentNum: 0,
    likeNum: 0,
    tagNames
  }).save();
  await new allArticle({
    id,
    title,
    content,
    commentNum: 0,
    likeNum: 0,
    tagNames
  }).save();
  await new tags({
    name: tagNames,
    status: false
  }).save();
  await blogger.updateOne({ $inc: { article: 1 } });
  ctx.body = {
    code: 200,
    message: "创建成功"
  };
  await next();
});

// 更新文章
router.post("/updateArticle", async (ctx, next) => {
  const { id, content } = ctx.request.body;
  const result = await article.updateMany({ id }, { content }, { multi: true });
  if (result.n != 0 && result.nModified != 0) {
    ctx.body = {
      code: 200,
      message: "文章更新成功"
    };
  } else {
    ctx.body = {
      code: 400,
      message: "文章更新失败"
    };
  }
  await next();
});

// 喜欢文章
router.post("/likeArticle", async (ctx, next) => {
  const { id } = ctx.request.body;
  const result = await article.updateOne({ id }, { $inc: { likeNum: 1 } });
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

  await blogger.updateOne({ $inc: { like: 1 } });
  await allArticle.updateOne({ id }, { $inc: { likeNum: 1 } });
  await next();
});
// 获取评论
router.get("/getComment", async (ctx, next) => {
  const articleId = ctx.query.articleId;
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  // 获取页码数
  const pageTotal = await comment
    .find({ articleId }, (err, res) => {})
    .then(res => {
      return res.length > pageSize ? Math.ceil(res.length / pageSize) : 1;
    });
  const result = await comment
    .find({ articleId })
    .skip((pageIndex - 1) * pageSize)
    .limit(parseInt(pageSize))
    .sort({ updateTime: -1 });
  if (result) {
    ctx.body = {
      code: 200,
      data: result,
      pageTotal
    };
  } else {
    ctx.body = {
      code: 200,
      message: "数据出错获取失败"
    };
  }
  await next();
});

// 新增评论
router.post("/addComment", async (ctx, next) => {
  const { articleId, guestName, commentText, replyGuest, replyText } = ctx.request.body;
  await new comment({
    articleId,
    guestName,
    commentText,
    replyGuest,
    replyText
  }).save();
  await article.updateOne({ id: articleId }, { $inc: { commentNum: 1 } });
  await allArticle.updateOne({ id: articleId }, { $inc: { commentNum: 1 } });
  await blogger.updateOne({ $inc: { comment: 1 } });
  if (!replyGuest) {
    ctx.body = {
      code: 200,
      message: "评论成功"
    };
  } else {
    ctx.body = {
      code: 200,
      message: "回复成功"
    };
  }
  await next();
});

module.exports = router;
