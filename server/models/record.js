const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    content: String,
    like: Number
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime"
    }
  }
);

// record 为表名称
module.exports = mongoose.model("record", recordSchema, "record");
