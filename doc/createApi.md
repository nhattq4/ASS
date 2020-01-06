# How to create a new api by express (3 steps)

## Create function (business logic) of endpoint

Generate functions of endpoint with specified path: /src/services/{`parent_endpoint`}/function.js

- Example of [function getByEmail](/src/services/user/functions.js) of /users/get-by-email endpoint in below
- Cases:
  - res.json(`result`): return status code (200) and result
  - res.status(`status_code`).send(`error_object`): return error code and corresponding error_object

```js
const Users = require('../../database/models/users');
const errorCodes = require('../../utils/errorCodes');
const resultFields = require('../../utils/resultFields');
const _ = require('lodash');

class Functions {
    static async getByEmail(req, res, next) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send(errorCodes.INVALID_PARAMETER);
        }

        const where =   { username: email };
        const user = await Users.get(where);

        if (!user) {
            return res.status(404).send(errorCodes.USER_NOT_FOUND);
        }

        res.json(_.pick(user, resultFields.USER));
    }
    ...
}
```

## Create endpoint

Generate endpoint with specified path: /src/services/{`parent_endpoint`}/index.js

- Example of [users endpoint](/src/services/user/index.js) in below
- About [routing](https://expressjs.com/en/guide/routing.html)

```js
const express = require("express");
const router = express.Router();
const functions = require("./functions");

router.post("/get-by-email", (req, res, next) => {
  // call function (business logic) of endpoint in here
  return functions.getByEmail(req, res, next).catch(error => {
    next(error);
  });
});

router.post("/get-by-email-and-employee", (req, res, next) => {
  return functions.getByEmployee(req, res, next).catch(error => {
    next(error);
  });
});

router.put("/update-email-by-employee", (req, res, next) => {
  return functions.updateEmployeeByEmail(req, res, next).catch(error => {
    next(error);
  });
});

module.exports = router;
```

## Init enpoint

Init enpoint with specified path: [/src/services/index.js](/src/services/index.js)

- About enpoint path:

  - /ROOT_ROUTE/`parent_endpoint_name`/`endpoint_api`
  - example:

    - POST /api/user/get-by-email

    ```js
    this.app.use(ROOT_ROUTE + "/user", User);
    ```

    ```js
    router.post("/get-by-email", (req, res, next) => {
      // call function (business logic) of endpoint in here
      return functions.getByEmail(req, res, next).catch(error => {
        next(error);
      });
    });
    ```

```js
const monitor = require("./monitor");
const User = require("./user");
const company = require("./company");
const ROOT_ROUTE = "/api";

class ServicesIndex {
  constructor(app) {
    this.app = app;
  }

  registerServices() {
    this.app.use(ROOT_ROUTE + "/user", User);
    this.app.use(ROOT_ROUTE + "/company", company);
    this.app.use(ROOT_ROUTE + "/monitor", monitor);
    // add new parent_endpoint in here
  }
}

module.exports = app => {
  return new ServicesIndex(app).registerServices();
};
```
