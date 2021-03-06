# node-api-project

This is a simple Node project to create a simple API server.

## Prerequisite

* Node >= v8
* NPM >= v6
* MongoDB >= v3

## Features of this project
* User sign up
* User log in
* User authentication using JWT (JSON Web Token)
* Update user account data (own account) only after log in
* View all users (public info) using pagination
* View user (public info) using id
* View full user account data (own account) only after log in
* Delete user account (own account) only after log in

## Tests
Test code of this project is inside the `tests` directory.

Using the following for testing:
* Jest
* Supertest

## How to use this project?

1. Download the project code.
2. Run `npm init` to install the packages.
3. Setup environment variables
```
$ export node_api_project_jwtPrivateKey=secretKey
$ export node_api_project_PORT=3000
```
If you don't set the PORT then default port 3000 will be used.

4. Run the project `node index.js` or `nodemon`.


## APIs

### User - Sign up

```
POST /api/users
Host: localhost:3000
Content-Type: application/json

{
    "first_name": "Yusuf",
    "last_name": "Shakeel",
    "email": "yusufshakeel@example.com",
    "password": "root1234"
}
```

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": {
        "_id": "5d29b9e42ef2dc359a2640ee",
        "first_name": "Yusuf",
        "last_name": "Shakeel",
        "email": "yusufshakeel@example.com"
    }
}
```

### User - Log in

```
POST /api/users/login
Host: localhost:3000
Content-Type: application/json

{
    "email": "yusufshakeel@example.com",
    "password": "root1234"
}
```

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": {
        "_id": "5d29b9e42ef2dc359a2640ee",
        "first_name": "Yusuf",
        "last_name": "Shakeel",
        "email": "yusufshakeel@example.com"
    }
}
```

JWT will be present in the header. Check `x-auth-token`.

### User - List all active users

```
GET /api/users
Host: localhost:3000
```

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": [
        {
            "_id": "5d2461f8e4dd952b8f005b9e",
            "first_name": "Yusuf",
            "last_name": "Shakeel"
        },
        {
            "_id": "5d24629cc55c602bc69c5468",
            "first_name": "John",
            "last_name": "Doe"
        },
        {
            "_id": "5d2462a7c55c602bc69c5469",
            "first_name": "Jane",
            "last_name": "Doe"
        }
    ]
}
```

### User - User public info by id

```
GET /api/users/5d2461f8e4dd952b8f005b9e
Host: localhost:3000
```

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": {
        "_id": "5d2461f8e4dd952b8f005b9e",
        "first_name": "Yusuf",
        "last_name": "Shakeel"
    }
}
```

### User - Full account data (for logged in user)

```
GET /api/users/me
Host: localhost:3000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDI0NjFmOGU0ZGQ5NTJiOGYwMDViOWUiLCJpc1VzZXIiOnRydWUsImV4cCI6MTU2MzAxOTUzMSwiaWF0IjoxNTYzMDE1OTMxfQ.EY_5GJzqrfaHAwi6g5kvrA5FUKCXclTD1F0eTpq8ZQk
```

Don't forget to pass the `x-auth-token` in the header.

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": {
        "_id": "5d2461f8e4dd952b8f005b9e",
        "first_name": "Yusuf",
        "last_name": "Shakeel",
        "email": "yusufshakeel@example.com",
        "account_status": "ACTIVE"
    }
}
```

### User - Update account data (for logged in user)

```
PUT /api/users
Host: localhost:3000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDI0NjFmOGU0ZGQ5NTJiOGYwMDViOWUiLCJpc1VzZXIiOnRydWUsImV4cCI6MTU2MzAxOTUzMSwiaWF0IjoxNTYzMDE1OTMxfQ.EY_5GJzqrfaHAwi6g5kvrA5FUKCXclTD1F0eTpq8ZQk
Content-Type: application/json

{
    "first_name": "Yusuf",
    "last_name": "Shakeel",
    "password": "root1234",
    "account_status": "ACTIVE"
}
```

Don't forget to pass the `x-auth-token` in the header.

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": {
        "_id": "5d2461f8e4dd952b8f005b9e",
        "first_name": "Yusuf",
        "last_name": "Shakeel",
        "email": "yusufshakeel@example.com",
        "account_status": "ACTIVE"
    }
}
```

### User - Delete account (for logged in user)

```
DELETE /api/users
Host: localhost:3000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDI5YzA3MTU4N2NkYzNhOWU4NGZmZDciLCJpc1VzZXIiOnRydWUsImV4cCI6MTU2MzAyMDkzNiwiaWF0IjoxNTYzMDE3MzM2fQ.yjPB2Qe1VIL3iwVJ5XqLtehOVRSReBv2r79ecou9oF0
Content-Type: application/json
```

Don't forget to pass the `x-auth-token` in the header.

Response

```JSON
{
    "code": 200,
    "status": "success",
    "data": "Account deleted."
}
```

## License
It's free.

[MIT License](https://github.com/yusufshakeel/node-api-project/blob/master/LICENSE) Copyright (c) 2019 Yusuf Shakeel

### Back this project

If you find this project useful and interesting then please support it on [Patreon](https://www.patreon.com/yusufshakeel).

### Donate
Feeling generous :-) [Donate via PayPal](https://www.paypal.me/yusufshakeel)