// Get the samples.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data within init function with d3.json within .then 
init = () => { d3.json(url).then((data) => {
    console.log('data: ', data);

    let info = data.names;
    console.log('info: ', info);
    //populate dropdownmenu options with candidate info
    for (let infoset in info)
        {d3.select("#selDataset").append("option").property("value", info[infoset]).text(info[infoset])};
    
    //populate charts and demographics with random id value initially
    random = info[info.length * Math.random() | 0];
    //populate drop down menu with initial value
    d3.select("#selDataset").property("value", random) ;

    //pass data and initially random then selected id variables to visuals function outside init function
    //initially call random id to filter values within graph function holding plotting data
    visuals(data, random);
    //get selected value by id https://www.techiedelight.com/get-selected-value-dropdown-javascript-onchange/
    //get id (this.value)from dropdown selection and call function that calls graph function referencing selected id
    // document.getElementById('selDataset').onchange = function() {
    // visuals(data, this.value)};
    // Reference optionChanged from index.html and use value from dropdownmenu in function--reference error averted
    optionChanged = Id =>{
        visuals(data, Id)};
    });

}; 


//selected data id =sd
visuals = (data, sd) => {
    //filter all sample values used in bubble and bar chart based on initially random then selected id
    let Sfilter = data.samples.filter(ds => ds.id == (sd))[0];
    //bar chart trace and values
    let dbar = [{
        
        //id in .names is common in all arrays so it is filtered and accompanying data is extracted
        //then slice value to ten values convienienty ordered to get the top ten, then reverse for plotly
        x: Sfilter.sample_values.slice(0, 10).reverse(),
        y: Sfilter.otu_ids.slice(0, 10).reverse().map(a => `OTU ${a}`),
        text: Sfilter.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: 'h'
    }];
     //bubble chart trace and values
    let dbubble = [{

        x: Sfilter.otu_ids,
        y: Sfilter.sample_values,
        text: Sfilter.otu_labels,
        mode: "markers",
        marker: {
            size: Sfilter.sample_values,
            color: Sfilter.otu_ids,
            colorscale: 'Jet'
        },
    }];
    Plotly.newPlot("bar", dbar);
    Plotly.newPlot("bubble", dbubble);  
    //filter all individual metadata used in demographics table and gauge chart
    let Mfilter = data.metadata.filter(ds => ds.id == (sd))[0];

    //clear demographics box before change
    d3.select("#sample-metadata").html('');
    //filter once again based on sd id in metadata and use colon and space, instead of default comma to separate values in Object.entries
    dict = Object.entries(Mfilter).map(e => e.join(': '));
    //.entries in javascript is like .items in python
    for (let item in dict)
        {d3.select(".panel-body").append("h6").text(dict[item])};//populate demographics panel body appending h6 row for every value

    //BONUS
    let dgauge = [{
        domain : {x: [0,1], y:[0,1]},
        value : Mfilter.wfreq,
        title : {text : "Belly Button Wash Frequency Per Week"},
        type : "indicator",
        mode : "number+gauge",
        // colorscale: 'Greens',
       
        gauge: {
            axis: { range: [null, 9],  dtick: 1},
            bar: { color: "orange" },

            steps : [
                //generated with the help of https://coolors.co
                {'range': [1, 2], 'color': "003f23"},                
                {'range': [2, 3], 'color': "70ffb5"},
                {'range': [3, 4], 'color': "4fe397"},
                {'range': [4, 5], 'color': "54cf91"},
                {'range': [5, 6], 'color': "54cf91"},
                {'range': [6, 7], 'color': "389f6c"},
                {'range': [7, 8], 'color': "389f6c"},
                {'range': [8, 9], 'color': "389f6c"},],
            threshold: {
              line: { color: "black", width: 4 },
              thickness: 0.75,
              value: Mfilter.wfreq}}
        }];
        Plotly.newPlot("gauge", dgauge);//end BONUS section

        
    };

init();