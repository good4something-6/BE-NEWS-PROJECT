# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).



## Configuration

### Access to test and development databases

Two databases are included:  test and development
To connect to these the environment variable PGDATABASE needs to be configured with the code files prior to running the code.
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

The NODE_ENV environment variable is used for database creation and seeding from scratch using the following command lines:
    
````bash
--------------------
Development database
--------------------
    npm setup-dbs && npm seed
````

````bash
-------------
Test database
-------------
    npm setup-dbs && NODE_DEV=test npm seed
````

