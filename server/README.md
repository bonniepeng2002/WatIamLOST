# API Documentation

Currently, server runs on `localhost:3000`.

## Classes

### /classes/:buildingCode

**Description**

Gets all classes that occur in a specific campus building on a certain day of the week.

**Parameters**

- `buildingCode`: The code of the building to get classes for.

**Query Parameters**

  - `day`: The day of the week to get classes for, which is one of the following: `M | T | W | Th | F | S | Su`.

**Example**

`/classes/MC?day=M`

**Response**
```json
[
  {
    "_id": "string",
    "term": "string",
    "level": "string",
    "dateUpdated": "string",
    "subjectCode": "string",
    "catalogNumber": "string",
    "units": "string",
    "title": "string",
    "classNumber": "string",
    "section": "string",
    "campusLocation": "string",
    "enrolCap": "string",
    "enrolTotal": "string",
    "time": {
      "_id": "string",
      "startTime": {
        "_id": "string",
        "hour": 14, // 24h format
        "mins": 30,
      },
      "endTime": {
        "_id": "string",
        "hour": 15, // 24h format
        "mins": 20,
      },
      "days": ["day"] 
      // days are one of the following:  
      // `M | T | W | Th | F | S | Su`.
    },
    "buildingCode": "string",
    "roomNumber": "string",
    "instructor": "string",
  }
]
```

### /classes/:buildingCode/:roomNumber

**Description**

Gets all classes that occur in a specific room of a building on a certain day of the week.

**Parameters**

- `buildingCode`: The code of the building to get classes for.
- `roomNumber`: The room number of the room in the building to get classes for.

**Query Parameters**

  - `day`: The day of the week to get classes for, which is one of the following: `M | T | W | Th | F | S | Su`.

**Example**

`/classes/MC/4021?day=M`

**Response**

Same as above.

### /classes/:buildingCode/:roomNumber/free

**Description**

Get all the free time intervals for a specific room of a building on a certain day of the week.

**Parameters**

- `buildingCode`: The code of the building to get classes for.
- `roomNumber`: The room number of the room in the building to get classes for.

**Query Parameters**

  - `day`: The day of the week to get classes for, which is one of the following: `M | T | W | Th | F | S | Su`.

**Example**

`/classes/MC/4021/free?day=M`

**Response**

```json
[
  {
    "startTime": {
      "hour": number, 
      "mins": number,
    },
    "endTime": {
      "hour": number, 
      "mins": number,
    },
  }
]
```

## Buildings

### /buildings

**Description**

Gets all the locations of all the campus buildings.

**Response**
```json
[
  {
    "buildingId": "string",
    "buildingCode": "string",
    "parentBuildingCode": "string", // this could be null
    "buildingName": "string",
    "alternateBuildingNames": [
      "string"
    ], // this might be null
    "latitude": 0,
    "longitude": 0
  }
]
```

### /buildings/:buildingCode

**Description**

Gets the location data of a campus building by building code (e.g. MC)

**Parameters**

- `buildingCode`: The code of the building to get data for.

**Response**

Same as above.


