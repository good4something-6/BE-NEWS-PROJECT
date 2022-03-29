# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Configuration

### Access to test and development databases

Two databases are included: test and development
To connect to these the environment variable PGDATABASE needs to be configured within the code files prior to running the code.
Or the environment variable NODE_ENV needs to be configured when launching the code

The PGDATABASE configuration is available through .env files which are not included in the project and need to be created.

```text
----------------
.env-development
----------------
PGDATABASE=nc_news;
```

```text
---------
.env-test
---------
PGDATABASE=nc_news_test;
```

### Creating and populating test and development databases

The (empty) databases are created from scratch by running the npm script as follows: 'npm run setup-dbs' (see package.json scripts section)

The test database is populated either manually or as part of the jest testing process

```bash
--------------------
Development database
--------------------
    ??????????????????????
```

```bash
-------------
Test database - manual
-------------
    NODE_DEV='test' npm run seed
```

```bash
-------------
Test database - jest testing
-------------
    npm test
```
