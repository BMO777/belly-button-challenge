// Get the samples.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and run functions to create plot within it
d3.json(url).then(data2 = (data) => {
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
    //populate drop down with initial value
    d3.select("#selDataset").property("value", `${random}`) ;

    // console.log('randomvs: ', meta.filter(ds => ds.id == (random))[0]);
    // console.log('random: ', (random));
    //selected data -sd
    graph = (sd) => {
        let dbar = [{
            
            //id in .names is common in all arrays so it is filtered and accompanying data is extracted
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
            //filter once again based on sd id in metadata and use colon and space, instead of comma to separate values in Object.entries
            dict = Object.entries(meta.filter(ds => ds.id == (sd))[0]).map(e => e.join(': '));
        //.entries is like .items in python
            for (let item in dict)
                {d3.select(".panel-body").append("h6").text(`${dict[item]}`)};
            Plotly.newPlot("bar", dbar);
            Plotly.newPlot("bubble", dbubble);
        };
    init = () => {graph(random)}; 
 
    function optionChanged()  {
                //get id from dropdown selection
        let id = d3.selectAll("#selDataset").property("value")
        console.log('selectid: ', id) 
    
        let dbar = [{
            
            //id in .names is common in all arrays so it is filtered and accompanying data is extracted
            x: samples.filter(ds => ds.id == (id))[0].sample_values.slice(0, 10).reverse(),
            y: samples.filter(ds => ds.id == (id))[0].otu_ids.slice(0, 10).reverse().map(a => `OTU ${a}`),
            text: samples.filter(ds => ds.id == (id))[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h'
        }];
        let dbubble = [{

            x: samples.filter(ds => ds.id == (id))[0].otu_ids,
            y: samples.filter(ds => ds.id == (id))[0].sample_values,
            text: samples.filter(ds => ds.id == (id))[0].otu_labels,
            mode: "markers",
            marker: {
                size: samples.filter(ds => ds.id == (id))[0].sample_values,
                color: samples.filter(ds => ds.id == (id))[0].otu_ids
            },
        }];
            d3.select("#sample-metadata").html('')
            //filter once again based on id in metadata and use colon and space, instead of comma to separate values in Object.entries
            dict = Object.entries(meta.filter(ds => ds.id == (id))[0]).map(e => e.join(': '))
        //.entries is like .items in python
            for (let item in dict)
                {d3.select(".panel-body").append("h6").text(`${dict[item]}`)};

                Plotly.newPlot("bar", dbar);
                Plotly.newPlot("bubble", dbubble);}

        d3.select("#selDataset").on("change", optionChanged);

        init();

    });
    
//   data2()
        console.log('data2: ', data2);


