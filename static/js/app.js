// Get the samples.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and run functions to create plot within it
d3.json(url).then((data) => {
    console.log('data: ', data);
    //get all values within endpoint
    let meta = Object.values(data.metadata);
    // console.log('meta: ', Object.values(meta)[0].id);

    let ids = Object.values(data.names);
    console.log('ids: ', ids);
    //populate dropdownmenu options with ids
    for (let idset in ids)
        {d3.select("#selDataset").append("option").property("value", `${ids[idset]}`).text(`${ids[idset]}`)};
    let samples = Object.values(data.samples);
    // console.log('samples: ', samples.map(samples => samples.otu_labels));

    //populate charts and demographics with random value initially
    random = ids[ids.length * Math.random() | 0];
    //populate drop down menu with initial value
    d3.select("#selDataset").property("value", `${random}`) ;

    // console.log('randomvs: ', meta.filter(ds => ds.id == (random))[0]);
    // console.log('random: ', (random));
    //selected data id =sd
    graph = (sd) => {
        //bar chart trace and 
        let dbar = [{
            
            //id in .names is common in all arrays so it is filtered and accompanying data is extracted
            //then slice value to ten values convienienty ordered to get the top ten, then reverse for plotly
            x: samples.filter(ds => ds.id == (sd))[0].sample_values.slice(0, 10).reverse(),
            y: samples.filter(ds => ds.id == (sd))[0].otu_ids.slice(0, 10).reverse().map(a => `OTU ${a}`),
            text: samples.filter(ds => ds.id == (sd))[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h'
        }];
        let dbubble = [{

            x: samples.filter(ds => ds.id == (sd))[0].otu_ids,
            y: samples.filter(ds => ds.id == (sd))[0].sample_values,
            text: samples.filter(ds => ds.id == (sd))[0].otu_labels,
            mode: "markers",
            marker: {
                size: samples.filter(ds => ds.id == (sd))[0].sample_values,
                color: samples.filter(ds => ds.id == (sd))[0].otu_ids
            },
        }];
            //clear demographics box before change
            d3.select("#sample-metadata").html('');
            //filter once again based on sd id in metadata and use colon and space, instead of default comma to separate values in Object.entries
            dict = Object.entries(meta.filter(ds => ds.id == (sd))[0]).map(e => e.join(': '));
        //.entries is like .items in python
            for (let item in dict)
                {d3.select(".panel-body").append("h6").text(`${dict[item]}`)};
            Plotly.newPlot("bar", dbar);
            Plotly.newPlot("bubble", dbubble);
        };
        //initially call random value within graph function holding plotting data
    init = () => {graph(random)}; 
    init();
//get selected value by id https://www.techiedelight.com/get-selected-value-dropdown-javascript-onchange/
 //get id (this.value)from dropdown selection and call function that calls graph function referencing selected id
    document.getElementById('selDataset').onchange = function() {
            graph(this.value);
        };
    });

    // optionChanged = () => {graph(this.value)}

    // function optionChanged()  {
    //            
    //     // let id = d3.select("#selDataset").property("value")
    //     graph(this.value)};
