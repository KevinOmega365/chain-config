# chain-config

Ad hoc transformation from an Excel workbook to SQL via JSON

## Setup

### From scratch

* Make a folder
* Open the terminal in that folder
* Run

``` Terminal
npm init -y
```

* Add ```"type": "module"``` to package.json
* Run

``` Terminal
npm i --save https://cdn.sheetjs.com/xlsx-0.20.0/xlsx-0.20.0.tgz
```

* Add ```"parse": "node main.js``` to the ```scripts``` element in package.json
