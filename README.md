# Technical test

## contents
- [installation](#installation)
- [run tests](#run-tests)
- [usage](#usage)
- [available APIs](#available-apis)
- [full scenario](#full-scenario)

## Installation
for the services to run smothly together,

just clone the repo then run `npm i` in frontend & backend directory.

## Run Tests

make sure you have node installed

run `npm run test`

## Usage

after running both frontend & backend using `npm run start`.


then you can hit REST APIs to `0.0.0.0:3000/api`

## Available APIs

- `POST    /file-storage`
- `GET    /file-storage/upload-history`
- `POST   /authentication/sent-otp`
- `POST   /authentication/sent-otp`

## Full Scenario

We need you to develop a web interface where we can upload xml or csv files and write them to a database.

###### Requirements:

A form where users can upload files to update products (from an XML file) or inventory status (from a CSV file) via a web interface.
Content of the files should be inserted to a database table. (You can use the "handle” to create a relation between product and inventory)
Previously uploaded files (an upload history) are listed under the upload form.
Unit tests
Supported file types are *.csv and *.xml
All code must be on a public VCS.
Optional:

###### Webhooks:
A request to given url after every single row update. 
These requests should be sent only for changed rows.
You can use https://requestbin.com/ for testing
Automated tests
Passwordless authentication
With a single use code to given email
--OR--
With github account
 

You can use;

- node.js, PHP or C#, depending on your choice. 

- Any database of your choice.

- Any framework (or without a framework)

Example files (in the attachment):
``` Files
Inventory: inventory.csv
Products: products.xml
```
