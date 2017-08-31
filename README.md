# RapidQL Runner Atom Package


<img src="https://storage.googleapis.com/rapid-misc-files/rapidQLogo2x.png" width="150">

## What is RapidQL?

RapidQL is an open source unified interface for querying datasources like databases and online APIs. RapidQL let’s you join multiple datasources together, to combine and enrich data. You can find more information at http://www.rapidql.com/ or the GitHub repo https://github.com/iddogino/rapidql.

Domumentation: https://docs.rapidql.com/

## Getting Started

This repo houses the most current version of rapidql-runner; a package to perform RapidQL querys directly in the Atom text editor.

Install the package using `apm install rapidql-runner`

In your current directory, create three files

- options.rql
- context.rql
- query.rql

The options file contains all of your database and API connection info. You can find out more about these files by heading over to https://docs.rapidql.com/.

Example options.rql file
  ```
  {
  "RapidAPI": {
    "projectName": "rapidql-demo_5933abb8e4b05d38a42ea98b",
    "apiKey": "################"
  },
  "MySQL": {
    "Demo":{
      "host": "###########",
      "user": "########",
      "password": "########",
      "database": "public",
      "port": "3306"
    }
  }
}
```

The context file contains any variables/API keys you will need in your query.

Example context.rql file
```
{
  "mailboxLayerAPIKey": "###############"
}
```

Finally, the query file contains your mail RapidQL query.

Example query.rql file
```
{
    MySQL.Demo.users.find() {
        email,
        RapidAPI.Mailboxlayer.checkEmail(email: email, apiKey: mailboxLayerAPIKey) {
            score
        }
    }
}
```

You your current directory contains all these files, and each file uses correct RQL syntax, you can run this code!

## Running your .rql files

In order to run the rapidql-runner, press the hotkey `CTRL-ALT-O`. This will cause a user interface to appear, which will contains the query response or an errors associated with the query.
