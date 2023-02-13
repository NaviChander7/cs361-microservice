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

This requests a query for cards that are green of color, legend and merfolk type, and rare.

# how to RECEIVE data
The microservice will return a REST API query string to search for cards.
Query for example above:
https://api.scryfall.com/cards/search?q=+color%3Ag+type%3Alegend+type%3Amerfolk+rarity%3Arare

# UML Sequence Diagram

![Untitled2](https://user-images.githubusercontent.com/71683210/218590013-5c8752d7-a478-4b12-b7cf-ff4bcaafc464.jpg)
