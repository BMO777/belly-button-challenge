# Belly Button Challenge

In this repository a html frame is modified by javascript files to visualize data on belly button bacteria colonies on a sample size of 153 different candidates. 

The index.html file holds the frame and references sites for d3, plotly and the css styles used to provide a framework for visuaizations.

In the folderpath -static/js/app.js-, within the javascript file, d3 is used to load the endpoint containing data and this data is unpacked and used to populate a bar graph, bubble chart, and bonus gauge chart which is referenced in the file bonus.js.

The bar chart visalizes the top 10 OTUs(taxonomic units) in a candidate belly button.

The bubble chart visualized all OTUs but the dominant or most populous ones are most visible because size of bubble references samples

The bonus gauge chart visualizes belly-button washing frequency.


Github pages site:
https://bmo777.github.io/belly-button-challenge/

References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.

