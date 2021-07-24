# Description

This is a full-stack demo project based on MongoDB and Node.js. The main function of this project is to realize a user record. The administrator can add, delete, and modify user information in the user list.
# file structure
```bash
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

```bash
install npm

// cd database
// npm install mongoose
// node -v
```



# Front end
```bash
└── user
    ├── app.js
```

# Back end

```bash
└── module
    ├── index.js
    └── user.jsx
```

# Start the server:

>```bash
>in the directory of app.js:
>>nodemon app.js
>
>open the following link in the browser
>http://localhost:3000/list
>```
>
>

# About tree
brew install tree

https://blog.csdn.net/qq673318522/article/details/53713903

* tree -d only displays folders;
* tree -L n displays the level of the project. n represents the number of levels. For example, if you want to display the three-tier structure of the project, you can use tree -l 3;
* tree -I pattern is used to filter files or folders that you don't want to display. For example, if you want to filter the node_modules folder in the project, you can use tree -I "node_modules";
* tree> tree.md Output the project structure to the file tree.md.

# github command c&p
```bash
git add .
git commit -m "update"
git push origin master
```

