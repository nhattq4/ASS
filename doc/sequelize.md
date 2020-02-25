# Sequelize

## Install

```bash
npm install -g sequelize-auto
```

## Usage

```text
[node] sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName] -C

Options:
    -h, --host        IP/Hostname for the database.   [required]
    -d, --database    Database name.                  [required]
    -u, --user        Username for database.
    -x, --pass        Password for database.
    -p, --port        Port number for database.
    -c, --config      JSON file for Sequelize's constructor "options" flag object as defined here: https://sequelize.readthedocs.org/en/latest/api/sequelize/
    -o, --output      What directory to place the models.
    -e, --dialect     The dialect/engine that you're using: postgres, mysql, sqlite
    -a, --additional  Path to a json file containing model definitions (for all tables) which are to be defined within a model's configuration parameter. For more info: https://sequelize.readthedocs.org/en/latest/docs/models-definition/#configuration
    -t, --tables      Comma-separated names of tables to import
    -T, --skip-tables Comma-separated names of tables to skip
    -C, --camel       Use camel case to name models and fields
    -n, --no-write    Prevent writing the models to disk.
    -s, --schema      Database schema from which to retrieve tables
    -z, --typescript  Output models as typescript with a definitions file.
```

## Example

```bash
sequelize-auto -o "./models" -d dbtest -h localhost -u my_username -p 5432 -x my_password -e postgres
```

## Generate models from local

Generate all tables:
```bash
sequelize-auto -h localhost -d ecs -u root -x root -p 3306 -e mysql -o src/models
```

Generate specified tables:
```bash
sequelize-auto -h localhost -d ecs -u root -x root -p 3306 -e mysql -o src/models -t [Comma-separated table names]
```