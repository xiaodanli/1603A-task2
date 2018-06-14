var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var data = require('./data/data.json');
var querystring = require('querystring')
var list = {
        user: 'zj',
        pwd: '123'
    }
    //起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8686,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data))
                } else if (pathname === '/loig/list') {
                    //获取客户端post传过来的数据
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        //合并buffer并转字符串
                        var buf = Buffer.concat(arr).toString();
                        var json = querystring.parse(buf);
                        //console.log(list.user)
                        //判断账号和密码是否匹配
                        if (list.user === json.user && list.pwd === json.pwd) {
                            res.end(JSON.stringify({ code: 1, msg: "登录成功" }))
                        } else {
                            res.end(JSON.stringify({ code: 0, msg: "账号或密码错误,请从新输入!" }))
                        }
                    });
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }

        }))
})