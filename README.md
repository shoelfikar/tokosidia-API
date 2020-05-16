# Tokosidia API (CLONE TOKOPEDIA) [![Release Version](https://img.shields.io/badge/release-v.1.0-blue)](https://github.com/HiRahmat-Dev/library-api/releases/tag/1.0) [![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
- [Prerequiste](#prerequiste)
- [Instalation](#installation)

- [Link Collection Postman](#link-collection-postman)
- [Structur Folder](#structur-folder)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.

## Installation
### Clone
```
$ git clone https://github.com/HiRahmat-Dev/library-api.git
$ cd library-api
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=8000

```

### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[Postman](https://www.getpostman.com/collections/bb923819853137d50b60)

## Structure Folder
```
\---src
|    \---config
|    |   +---db.js            
|    \---controller
|    |   +---book.js
|    |   +---user.js
|    \---helper
|    |   +---helper.js
|    \---model
|    |   +---books.js
|    |   +---user.js
|    \---router
|    |   +---books.js
|    |   +---index.js
|    |   +---register.js
|    |   +---user.js
+---server.js
```

## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/HiRahmat-Dev/">
          <img width="150" src="https://avatars2.githubusercontent.com/u/55150659?s=460&u=c7171bb4128787c303efdce0d62bc86289f1211b&v=4" alt="Rahmat Hidayatullah"><br/>
          <b>Rahmat Hidayatullah</b>
        </a>
      </td>
    </tr>
  </table>
</center>

### License
----
[Website](http://www.sekolahinovator.org) © [Rahmat Hidayatullah](https://github.com/HiRahmat-Dev/)
