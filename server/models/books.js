const mongoose = require("mongoose");

// userSchema为表名称
const booksSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    author: String,
    difficulty: Number,
    evaluation: String,
    pic: String
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime"
    }
  }
);

// billSchema为表名称
module.exports = mongoose.model("books", booksSchema, "books");
