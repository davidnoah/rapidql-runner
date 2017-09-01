# RapidQL Runner Atom Package


<img src="https://storage.googleapis.com/rapid-misc-files/rapidQLogo2x.png" width="150">

## What is RapidQL?

RapidQL is an open source unified interface for querying datasources like databases and online APIs. RapidQL let’s you join multiple datasources together, to combine and enrich data. You can find more information at http://www.rapidql.com/ or the GitHub repo https://github.com/iddogino/rapidql.

Documentation: https://docs.rapidql.com/

## Getting Started

This repo houses the most current version of rapidql-runner; a package to perform RapidQL querys directly in the Atom text editor.

Install the package using `apm install rapidql-runner`

In your current directory, create two files

- .rqloptions
- .rqlcontext

The options file contains all of your database and API connection info. You can find out more about these files by heading over to https://docs.rapidql.com/.

Example .rqloptions file
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

Example .rqlcontext file
```
{
  "mailboxLayerAPIKey": "###############"
}
```

Now that you have created two files to house both your options and context object, you can now create an RQL query. Create a new file with the extension `.rql`. Again, you can read about writing RapidQL queries here: https://docs.rapidql.com/.

Example query

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

If your current directory contains these files, select the query file in your Atom file tree and run the query!

## Running your .rql query

In order to run the rapidql-runner, press the hotkey `CTRL-ALT-O` once a query is selected. This will cause a user interface to appear which will contains a response or any errors associated with the query.
