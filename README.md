
# S-Controller.js
New way to work with array object
## Authors

- [@tasvet](https://www.npmjs.com/~tasvet)

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Demo

Demo link : [Click here](https://codesandbox.io/s/s-collection-js-test-in-angular-98574p?file=/src/app/app.component.ts)


## Installation

Install s-event.js with npm

```bash
  npm install s-controller.js
```
    
## Usage/Examples
import : 
```
  import Collection from "s-collection.js";
```
Usage :
```
const data = new Collection([
                { id: 1, name: "John" },
                { id: 2, name: "Jane", abc: true },
                { id: 3, name: "Joe", range: [1, 10], abc: true },
                { id: 4, name: "Jack" },
                { id: 5, name: "Jill", range: [1, 5] },
                { id: 6, name: "Jim" },
                { id: 7, name: "Jem" },
                { id: 8, name: "Jenny", range: [4, 8] },
                { id: 9, name: "Juan" },
                { id: 10, name: "Jenny" },
            ]);

let test = data
            .hasField("range")
            .hasNotField("abc")
            .if("id", ">", 1)
            .if("id", "<", 10)
            .ifNot("name", "Jill")
            .inArray("id", [8, 1])
            .arrayInArray("range", [1, 4, 10])
            .arrayNotInArray("range", [7])
            .orderBy("id", "asc")
            .first();

console.log(test);
// { id: 8, name: "Jenny", range: [4, 8] }
```

## Attributes
| Name   |      arguments      |  description |
|----------|:-------------:|:------:|
| first() |   | get first item of collection |
| last() |       |   get last item of collection |
| get() | limit : \<number \| undefined\> |    get all item or by limit |
| count() |   | count item of collection |
| skip(index) | index : \<number\> |    offset item by index |
| if(field, operator, value) | field : \<string\> | if statement |
|| operator : \<string \| number\> ||
|| value : \<string \| number \| undefined\>||
| ifNot(field, value) | field : \<string\> | if not statement |
|| value : \<string \| number \| undefined\>||
| ifNull(field) | field : \<string\> | if null statement |
| ifNotNull(field) | field : \<string\> | if not null statement |
| inArray(field, value) | field : \<string\> | in array statement |
|| value : \<array\>||
| notInArray(field, value) | field : \<string\> | not in array statement |
|| value : \<array\>||
| arrayInArray(field, value) | field : \<string\> | array in array statement |
|| value : \<array\>||
| arrayNotInArray(field, value) | field : \<string\> | array not in array statement |
|| value : \<array\>||
| paginate(perPage, page) | perPage : \<number\> | make collection to paginate |
|| page : \<number \| default : 1\>||
| go(page) | page : \<number\> | use with paginate, go to page |
| next() |  | use with paginate, go to next page |
| prev() |  | use with paginate, go to prev page |
|hasMany(collection, localKey, foreignKey, fieldName)|collection: \<Collection \| array\> | relation has many with second collection or array |
||localKey : \<string\>||
||foreignKey : \<string\>||
||fieldName : \<string\> ||
|hasOne(collection, localKey, foreignKey, fieldName)|collection: \<Collection \| array\> | relation has one with second collection or array |
||localKey : \<string\>||
||foreignKey : \<string\>||
||fieldName : \<string\> ||
| orderBy(field, type) | field : \<string \| Array\> | order by item in Collection |
||type : \<string \| Array\<asc \| desc\>\> ||
| push(data) |data : \<Collection \| Object \| Array\> | push data in to Collection | 
| delete() || delete item from Collection ( can with condition ) |
| margeLeft(data) | data : \<Collection \| Array\> |merge array to start of Collection|
| margeRight(data) | data : \<Collection \| Array\> |merge array to end of Collection|
| margeRight(field) | field : \<string\> |group by field name|