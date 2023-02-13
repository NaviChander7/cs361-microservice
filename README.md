# cs361-microservice
Microservice for my partner in CS361 to use for his project.
This microservice returns a REST API query string for Magic: The Gathering Cards.

# how to REQUEST data
The microservice requires one to send it a JSON object with the following attributes:
* colors
* types
* restrictions

Example
``` java script
sampleRequest = {
    colors: 'g',
    types: ['legend', 'merfolk'],
    restrictions: ['rare']
}
```

This request a query for cards that are green of color, legend and merfolk type, and rare.

# how to RECEIVE data
The microservice will return a REST API query string to search for cards.
