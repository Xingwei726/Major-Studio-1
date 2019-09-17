## Idea & Concept 
For this quantitative data project, I want to explore the pattern formed by artists' life spans, artworks and distance between artists' places of birth & places of death. This project aims to visualize their relationship from a relatively macro perspective. 

Design Sketches from Last Week:

![](LastWeek1.jpg)
![](LastWeek2.jpg)

## Finalize Design Direction
**Things I want to show through this visualization:**

 - General lifespan pattern among artists in European Paintings
   department at Met Museum
 - Distance between artists' places of birth and places of death
 - Frequencies at each interval
 - Two lengths: ‘length’ in terms of lifespan years and ‘length’ in
   terms of geographical distance. Explore if there is a relationship
   between the distance and their lifespan.

## The Data 
**Datasets I need from Met API:**

```javascript
  var currentID = objectData.objectID;
  var currentTitle = objectData.title; 
  var currentDate = objectData.objectBeginDate; 
  var endDate = objectData.objectEndDate;
  var artistBeginDate = objectData.artistBeginDate;
  var artistEndDate = objectData.artistEndDate;
  var geoLocation = objectData.artistDisplayBio;
```

**Primary Datasets:**

Lifespan = artistEndDate - artistBeginDate
Distance between birth and death = geoLocation of death - geolocation of birth
Timeline

**Secondary Datasets:**
Artists'names


## Design References and Mood board for Visual Elements
If we compare the MET museum to a breathing organism, artists are similar to its DNA which carrying genetic instructions for function and growth. Inspiration of the visual forms came from Gel Electrophoresis, it is used as a diagnostic tool to visualize the fragments. Using electrophoresis, we can see how many different DNA fragments are present in a sample and how large they are relative to one another. Instead of imitating DNA shape, I took the abstract from and its transparency feature, applied with the MET data.
![](Moodboard(visual).jpg)
A well-defined “line” of DNA on a gel is called a band. Each band contains a large number of DNA fragments of the same size that have all traveled as a group to the same position. In this visualization I adopted the ‘band’ shape to mark each year of the artwork.

## Final Design Mockup
![](FinalDesignMockup1.jpg)
![](FinalDesignMockup2.jpg)

## The Data’s limitations
**Uncertainties of Data**

Especially with date and location information, not all artists have records so there are missing pieces as well as approximate estimations. In my design mockup I've included some ways to deal with uncertainties of data but I believe as I dive into the building phrase, other problems will pop up so I will continue to refine the representation on these.

## Next Steps
- Refine and reorganize on the dataset so they are ready to be connected with p5.js
- Design visualizations in p5.js