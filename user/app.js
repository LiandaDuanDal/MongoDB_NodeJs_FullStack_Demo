// First wear a web server, use http module
const http = require('http');
// // --当前目录找不到这个模块会到上一个目录去找
// const mongoose = require('mongoose')
// // 导入url模块
const url = require('url');
// // 导入将String变为json quering的工具包querystring
const querystring = require('querystring');

// 导入两个模块
// 数据库连接
require('./model/index.js');
// 用户schema
const User = require('./model/user.js');

// nodemon app.js
// 创建服务器
const app = http.createServer();

// 为服务器添加请求事件
app.on('request', async (req, res) => {
  // 请求方式
  const method = req.method;
  // 请求的路径地址
  const { pathname, query } = url.parse(req.url, true);
  console.log("req.url=======>", req.url);
  // 判断请求方式 get 还是 post
  if (method == 'GET') {
    console.log('Received GET request!!');
    // 呈现User List页面
    // 具体思路是把html页面的代码作为以一个变量返回
    // 因为要呈现的实际上是数据库的内容而不是静态的内容，所以不能用静态内容呈现的方式进行返回

    // 呈现User List页面
    if (pathname == '/list') {
      console.log("Rendering list page")
      // 使用异步函数获取查询结果
      // 这里的await是指的是拿到了所有的user对象集合后才做下面的事情
      let users = await User.find();

      // 这个地方不可以使用then catchde
      // .then(res=>console.log(res)).catch(err=>conslog('错误'));
      // console.log(users_info);
      // 拼接数据

      // DELETEremove的基本思路是给DELETE按钮添加路由，并传入id信息
      let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>User List</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>User Name</td>
                            <td>Age</td>
                            <td>Hobbies</td>
                            <td>email</td>
                            <td>Operate</td>
                        </tr>`;
      users.forEach(item => {
        list += `<tr>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>`;

        item.hobbies.forEach(item => {
          list += `<span>${item}</span>`;
        });
        list += `
                    </td>
                    <td>${item.email}</td>
                    <td>
                        <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">Delete</a>
                        <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">MODIFY</a>
                    </td>
                </tr>`;
      });

      list += ` 
                    </table>
                </div>
            </body>
            </html>`;
      res.end(list);

    } else if (pathname == '/add') {
      console.log("进行add 页面渲染");
      let add = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>User List</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
              <div class="container">
                <h3>添加用户</h3>
                <form method="post" action="/add">
                  <div class="form-group">
                    <label>User Name</label>
                    <input name="name" type="text" class="form-control" placeholder="请填写User Name">
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input name="password" type="password" class="form-control" placeholder="请输入Password">
                  </div>
                  <div class="form-group">
                    <label>Age</label>
                    <input name="age" type="text" class="form-control" placeholder="请填写email">
                  </div>
                  <div class="form-group">
                    <label>email</label>
                    <input name="email" type="email" class="form-control" placeholder="请填写email">
                  </div>
                  <div class="form-group">
                    <label>Please Select Hobbies</label>
                    <div>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="足球" name="hobbies"> 足球
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="篮球" name="hobbies"> 篮球
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value="烫头" name="hobbies"> 烫头
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">添加用户</button>
                </form>
              </div>
            </body>
            </html>
            `;
      // 按住option shift鼠标左键划过最右边可以同时编辑多行代码
      res.end(add);
    } else if (pathname == '/modify') {
      // let user = await User.find({_id:query.id}); 这个返回的是一个对象数组
      // find one返回的是一个对象
      let user = await User.findOne({ _id: query.id });
      console.log("当前查询到的用户：", user);
      // 更改Hobby值
      let hobbies = ["足球", "篮球", "橄榄球", "敲代码", "抽烟", "喝酒", "烫头", "打豆豆"];
      let modify = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>User List</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
              <div class="container">
                <h3>MODIFY用户</h3>
                <form method="post" action="/modify?id=${user._id}">
                  <div class="form-group">
                    <label>User Name</label>
                    <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写User Name">
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入Password">
                  </div>
                  <div class="form-group">
                    <label>Age</label>
                    <input name="age" value="${user.age}" type="text" class="form-control" placeholder="请填写email">
                  </div>
                  <div class="form-group">
                    <label>email</label>
                    <input name="email" value="${user.email}"  type="email" class="form-control" placeholder="请填写email">
                  </div>
                  <div class="form-group">
                    <label>Please Select Hobbies</label>
                    <div>
                      `;

      hobbies.forEach(hobby => {
        if (user.hobbies.includes(hobby)) {
          modify += `
                    <label class="checkbox-inline">
                        <input type="checkbox" value="${hobby}" name="hobbies" checked> ${hobby}
                      </label>`;
        } else {
          modify += `
                    <label class="checkbox-inline">
                        <input type="checkbox" value="${hobby}" name="hobbies"> ${hobby}
                      </label>`;
        }
      });
      modify += `</div>
                  </div>
                  <button type="submit" class="btn btn-primary">SubmitMODIFY</button>
                </form>
              </div>
            </body>
            </html>
            `;
      res.end(modify);
    } else if (pathname == '/remove') {
      // 接收到客户端接收到的id （存储到query中）
      // res.end(query.id); 检测是否能收到id参数
      await User.findOneAndDelete({ _id: query.id });
      // alert("已完成DELETE，即将跳转到list页面");
      res.writeHead(301, {
        Location: '/list'
      });

      res.end()
    }

    // 1 MODIFY页面路由 呈现页面
    //  1.1 点击MODIFY按钮的时候传递用户的id
    //  1.2 通过用户id查询用户信息
  } else if (method == 'POST') {
    console.log('收到POST请求');
    if (pathname == '/add') {
      // 添加功能
      console.log("post----add");
      // 设置变量接收post参数
      let formData = '';
      // 
      // 对于收到的每一个参数把他连接到记录器formdata里面
      // post的参数是一串一串到达的
      req.on('data', parameter => {
        formData += parameter;
        // console.log("form data TEMP===>",parameter,'\n');
      })
      // 查看最终的formdata
      // console.log(formData);

      // 完成post数据接收后
      req.on('end', async () => {
        let user = querystring.parse(formData)
        // 同步 注意⚠️：await只能放在async的函数里面。
        // await 会阻塞代码的运行
        await User.create(user);
        // 使用301进行重定向
        // location代表跳转地址
        await console.log(user);
        await console.log("执行重定向");
        res.writeHead(301, {
          Location: '/list'
        });
        res.end();
      })

    } else if (pathname == '/modify') {
      // 添加功能
      console.log("post----modify");
      // 设置变量接收post参数
      let formData = '';
      // 
      // 对于收到的每一个参数把他连接到记录器formdata里面
      // post的参数是一串一串到达的
      req.on('data', parameter => {
        formData += parameter;
        // console.log("form data TEMP===>",parameter,'\n');
      })
      // 查看最终的formdata
      // console.log(formData);

      // 完成post数据接收后
      req.on('end', async () => {
        let user = querystring.parse(formData);
        // 同步 注意⚠️：await只能放在async的函数里面。
        // await 会阻塞代码的运行
        await User.updateOne({ _id: query.id }, user);
        // 使用301进行重定向
        // location代表跳转地址
        await console.log("更新内容====>", user);
        await console.log("执行重定向");
        res.writeHead(301, {
          Location: '/list'
        });
        res.end();
      })
    }
    // 这个地方加一个end就真的结束了
    // res.end('OJBK');
  }
  // res.end();
});

// 监听端口
app.listen(3000);


// mongoimport -d playground -c users --file user.json  