# How to create a new schema by sequelize (3 steps)

## Create schema

Generate schema with specified path: /src/database/models/{`schema_name`}/schema.js

- Example of [users (schema)](/src/database/models/users/schema.js) in below
- About [data-types](https://sequelize.readthedocs.io/en/v3/docs/models-definition/#data-types)
- About [field-options](https://sequelize.readthedocs.io/en/v3/docs/models-definition/#definition)

```js
const Sequelize = require("sequelize");

module.exports = () => {
  return {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    employeeId: {
      type: Sequelize.STRING(20)
    },
    username: {
      type: Sequelize.STRING(50)
    },
    fullName: {
      type: Sequelize.STRING(150)
    },
    email: {
      type: Sequelize.STRING(50)
    },
    contactNo: {
      type: Sequelize.STRING(50)
    },
    isActive: {
      type: Sequelize.TINYINT(1),
      defaultValue: 1
    },
    createdBy: {
      type: Sequelize.STRING(20)
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedBy: {
      type: Sequelize.STRING(20)
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  };
};
```

## Create associate and methods

Generate associate and methods of schema with specified path: /src/database/models/{`schema_name`}/index.js

- Example of [users's (schema) associate and methods](/src/database/models/users/index.js) in below
- About [schema-options](https://sequelize.readthedocs.io/en/2.0/docs/models-definition/#configuration)
- About [associations](https://sequelize.org/master/manual/associations.html)

```js
const Sequelize = require("sequelize");
const schema = require("./schema");
const tableName = "users";
const modelName = "users";
var _ = require("lodash");
module.exports = class Users extends Sequelize.Model {
  // init schema
  static init(sequelize) {
    return super.init(schema(), {
      tableName,
      modelName,
      sequelize
      // add schema option in here
    });
  }

  // create associaties
  static associate(models) {
    this.belongsToMany(models.Roles, {
      through: models.UserRoles,
      as: "roles",
      foreignKey: "userId"
    });
  }

  // create methods
  static get(where) {
    return this.findOne({
      where
    });
  }
};
```

## Init schema

Init schema with specified path: [/src/database/db.js](/src/database/db.js)

```js
const Sequelize = require('sequelize');
const config = require('config')
const _ = require('lodash');
const dbConfig = JSON.parse(process.env.databaseAccount);
var sequelize = null;

class Db {
    constructor() {
        if (!sequelize) {
            sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);

            // Init models
            const models = {
                Claims: require('../database/models/claims').init(sequelize),
                RoleClaims: require('../database/models/roleclaims').init(sequelize),
                Roles: require('../database/models/roles').init(sequelize),
                UserRoles: require('../database/models/userroles').init(sequelize),
                Users: require('../database/models/users').init(sequelize),
                UserParentCompanies: require('../database/models/userparentcompanies').init(sequelize)
                // add new schema in here
            };

            // Create relationships in the ORM
            Object.values(models)
                .filter(model => typeof model.associate === "function")
                .forEach(model => model.associate(models));
        }
    }

    ...
}
```
