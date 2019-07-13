# node-api-project

This is a simple Node project to create a simple API server.

## Features of this project
* User sign up
* User log in
* User authentication using JWT (JSON Web Token)
* Update account data (own account) only after log in
* View all users (public info) using pagination
* View user (public info) using id
* View full account data (own account) only after log in

## How to use this project?

1. Download the project code.
2. Run `npm init` to install the packages.
3. Setup environment variables
```
$ export node_api_project_jwtPrivateKey=secretKey
```
4. Run the project `node index.js` or `nodemon`.

## License

MIT License Copyright (c) 2019 Yusuf Shakeel