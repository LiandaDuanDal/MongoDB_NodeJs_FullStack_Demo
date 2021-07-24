This is a full-stack demo project based on MongoDB and Node.js.
# file structure
```
.
├── README.md
├── tree.md
└── user
    ├── app.js
    └── module
        ├── index.js
        └── user.jsx
```

# Basic Configuration

```
install npm

// cd database
// npm install mongoose
// node -v
```



# Front end
```
└── user
    ├── app.js
```

# Back end

    └── module
        ├── index.js
        └── user.jsx

# Start the server:
>nodemon app.js
open the following link in the browser
http://localhost:3000/list

# About tree
brew install tree

https://blog.csdn.net/qq673318522/article/details/53713903

* tree -d 只显示文件夹；
* tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
* tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
* tree > tree.md 将项目结构输出到tree.md这个文件。

# github command c&p
```
git add .
git commit -m "update"
git push origin master
```

