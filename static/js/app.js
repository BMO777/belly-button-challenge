// Get the samples.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and run functions to create plot within it

d3.json(url).then(data => {
    console.log('data: ', data);
    //get all values within endpoint
    let meta = Object.values(data.metadata);
    console.log('meta: ', Object.values(meta)[0].id);

    let ids = Object.values(data.names);
    console.log('ids: ', ids);
    //populate dropdownmenu options with ids
    for (let idset in ids)
        {d3.select("#selDataset").append("option").property("value", `${ids[idset]}`).text(`${ids[idset]}`)};
    let samples = Object.values(data.samples);
    console.log('samples: ', samples.map(samples => samples.otu_labels));

    //populate charts and demographics with random value initially
    random = ids[ids.length * Math.random() | 0];

    console.log('randomvs: ', meta.filter(ds => ds.id == (random))[0]);
    console.log('random: ', (random));
    init = () => {
        let dbar = [{
            
            //id in .names is common in all arrays so it is filtered and accompanying data is extracted
            x: samples.filter(ds => ds.id == (random))[0].sample_values.slice(0, 10).reverse(),
            y: samples.filter(ds => ds.id == (random))[0].otu_ids.slice(0, 10).reverse().map(a => `OTU ${a}`),
            text: samples.filter(ds => ds.id == (random))[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h'
        }];
        let dbubble = [{

            x: samples.filter(ds => ds.id == (random))[0].otu_ids,
            y: samples.filter(ds => ds.id == (random))[0].sample_values,
            text: samples.filter(ds => ds.id == (random))[0].otu_labels,
            mode: "markers",
            marker: {
                size: samples.filter(ds => ds.id == (random))[0].sample_values,
                color: samples.filter(ds => ds.id == (random))[0].otu_ids
            },
        }];
            //filter once again based on random id in metadata and use colon and space, instead of comma to separate values in Object.entries
            dict = Object.entries(meta.filter(ds => ds.id == (random))[0]).map(e => e.join(': '))
        //.entries is like .items in python
            for (let item in dict)
                {d3.select(".panel-body").append("tr").text(`${dict[item]}`)};
            random == d3.select("#selDataset").property('value') 
            Plotly.newPlot("bar", dbar);
            Plotly.newPlot("bubble", dbubble);
        }
        

    d3.selectAll("#selDataset").on("change", optionChanged);
    function optionChanged(selectID) {
        console.log('selectid: ', selectID.value)}
    
    //         // Use D3 to select the dropdown menu
    //     let dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
    //     for (let idset in ids)
    //     {dropdownMenu.property("value", `${ids[idset]}`)};
       
    //     let dbubble = [{

    //         x: otu_ids,
    //         y: sample_values,
    //         text: samples.map(samples => samples.otu_labels),
    //         mode: "markers",
    //         marker: {
    //             size: sample_values,
    //             color: otu_ids
    //         },

    //     }];
        
    //         Plotly.restyle("bubble", dbubble);
    //     }
        // optionChanged()
        init();

    });


// data = d3.select(d3.json(url))
// console.log('data: ', data);

