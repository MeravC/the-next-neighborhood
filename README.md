# analyze-neighborhoods

> This module is the 3rd part of a tool which assists in the process of finding the new neighborhood to enter.

analyze-neighborhoods carries out the business-logic which applies the business-rules to the data and returns 
a prioritized list of recommended neighborhoods/cities.

Currently Not Supported:
- 1st part - GUI/CLI: User defines metric threshold -> visualizing results.
- 2nd part - Web Scraper: brings in the data from external sources.


## Bigger Picture
Before entering a neighborhood, first an analysis whether it'd be a good match for
the company's activity is conducted: resident distributions of age, occupation,
income, distance from city-center; availability of public transportation are part of the parameters to consider.

For this analysis to happen, first at least some data must be collected. 
This means that the web-scraper should start running and filling the DB with neighborhood data, 
before we activate the service I've built for the business logic.
I created a MongoDB database to mock having the data, and choose the following parameters to consider:
- Age.
- Distance from center.
- Income.
- Public Transportations Availability.
- Population Density.


Although visualization and an easy way to define a threshold for a parameter are important, It is not mandatory to have in order
for the successful operation of the analysis, so I decided not to focus on it at all as an MVP/home assignment, 
but it will work by letting the user to see the different parameters available, choose a set of thresholds, 
click on a button to kick in the business logic I wrote with small modifications, and finally showing the the prioritized 
list on a map, with drilldown to the parameters and how the score was made for better analysis to be made.


## Why the Business Logic?
I choose to build analyze-neighborhoods, because of my strong love for complicated busines-logic systems, and I
also wanted to demonstrate that I'm never afraid to take ownership of the important parts of the system.


While building a nice user interface\getting the data from the web are all very important as part of the whole
system which helps to determine what neighborhood to enter next, the business-logic engine is the 
brain of the system, and the decisions the company will make are ultimately based on it.

If we didn't choose correctly, there is a better neighborhood out there with people in it still waiting for our 
help, and the company is obviously making less money than it could have.

## Future Thoughts
I can't wait to actually test different models of computations to decide which neighborhood to enter next, and
see what were the results a few months after the neighborhood was chosen by the company.

If I had more time, I would definitely invest in making my code more scalable and extensible for new business
rules, data-sources, computation models etc.


## Install

Clone this repo and run

```
$ npm install
```


## Usage

```
$ node controller.js
```

outputs

```
[
  {
    neighborhoodName: 'Shawnee',
    scoreAge: 8,
    scoreDisFromCenter: 4,
    scoreIncome: 2,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 1
  },
  {
    neighborhoodName: 'Pawtuckett',
    scoreAge: 9,
    scoreDisFromCenter: 2,
    scoreIncome: 10,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 1
  },
  {
    neighborhoodName: 'Jordan',
    scoreAge: 6,
    scoreDisFromCenter: 8,
    scoreIncome: 4,
    scoreAvailabilityOfPublicTrans: 10,
    scorePopulationDensity: 2
  },
  {
    neighborhoodName: 'Dorchester',
    scoreAge: 5,
    scoreDisFromCenter: 10,
    scoreIncome: 10,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 1
  },
  {
    neighborhoodName: 'Avondale',
    scoreAge: 4,
    scoreDisFromCenter: 10,
    scoreIncome: 6,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 10
  },
  {
    neighborhoodName: 'Deanwood',
    scoreAge: 7,
    scoreDisFromCenter: 10,
    scoreIncome: 6,
    scoreAvailabilityOfPublicTrans: 10,
    scorePopulationDensity: 5
  },
  {
    neighborhoodName: 'Washington Park',
    scoreAge: 8,
    scoreDisFromCenter: 10,
    scoreIncome: 2,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 1
  },
  {
    neighborhoodName: 'Southwest Germantown',
    scoreAge: 10,
    scoreDisFromCenter: 10,
    scoreIncome: 10,
    scoreAvailabilityOfPublicTrans: 10,
    scorePopulationDensity: 10
  },
  {
    neighborhoodName: 'Point Breeze',
    scoreAge: 4,
    scoreDisFromCenter: 0,
    scoreIncome: 2,
    scoreAvailabilityOfPublicTrans: 2,
    scorePopulationDensity: 1
  }
]
The next neighborhood- Southwest Germantown with priority 50
```
