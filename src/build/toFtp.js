const FTP = require("ftp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const localPath = path.resolve(__dirname, "../../dist");
const ftpPath = "/";
const ftpClient = new FTP();
ftpClient.connect({
  host: "120.78.199.0",
  port: 21,
  user: "wlpp", 
  password: "AZtfbRBaCRDShP7b",
  keepalive: 1000
});
ftpClient.on("ready", function () {
  walk(localPath, async function (err, results) {
    console.log(chalk.yellow("正在上传至FTP"));
    if (err) {
      console.log(chalk.red(`读取本地dist文件夹出错：${JSON.stringify(err)}`));
      return;
    }
    for (let i = 0; i < results.length; i++) {
      const fileName = results[i];
      let ftpFile = results[i].replace(localPath, "").replace(/\\/g, "/");
      let ftpMkdir = path.dirname(ftpFile);
      ftpClient.lastMod(ftpPath + ftpMkdir, function (err) {
        if (err) {
          ftpClient.mkdir(ftpPath + ftpMkdir, function (mkdirErr) {
            ftpClient.put(fileName, ftpPath + ftpFile, function (err) {
              if (err) {
                console.log(ftpFile, "err");
              }
              ftpClient.end();
            });
          });
        }
      });
    }
    console.log(chalk.green("FTP上传成功"));
  });
});
const walk = function (dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

