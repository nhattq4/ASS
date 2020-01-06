const databaseAccount = JSON.parse(process.env.databaseAccount);
let options = databaseAccount.options;

module.exports = {
  development: {
    database: databaseAccount.database,
    username: databaseAccount.username,
    password: databaseAccount.password,
    ...options
  },
  staging: {
    database: databaseAccount.database,
    username: databaseAccount.username,
    password: databaseAccount.password,
    ...options
  },
  production: {
    database: databaseAccount.database,
    username: databaseAccount.username,
    password: databaseAccount.password,
    ...options
  }

};