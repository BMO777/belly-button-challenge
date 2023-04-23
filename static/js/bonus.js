


// bonus = (Mfilterwfreq) => {//BONUS
//     let dgauge = [{
//         domain : {x: [0,1], y:[0,1]},
//         value : Mfilterwfreq,
//         title : {text : "Belly Button Wash Frequency Per Week"},
//         type : "indicator",
//         mode : "number+gauge",
//         // colorscale: 'Greens',
       
//         gauge: {
//             axis: { range: [null, 9],  dtick: 1},
//             bar: { color: "orange" },

//             steps : [
//                 //generated with the help of https://coolors.co
//                 {'range': [1, 2], 'color': "003f23"},                
//                 {'range': [2, 3], 'color': "70ffb5"},
//                 {'range': [3, 4], 'color': "4fe397"},
//                 {'range': [4, 5], 'color': "54cf91"},
//                 {'range': [5, 6], 'color': "54cf91"},
//                 {'range': [6, 7], 'color': "389f6c"},
//                 {'range': [7, 8], 'color': "389f6c"},
//                 {'range': [8, 9], 'color': "389f6c"},],
//             threshold: {
//               line: { color: "black", width: 4 },
//               thickness: 0.75,
//               value: Mfilterwfreq}}
//     }];
//     Plotly.newPlot("gauge", dgauge);}//end BONUS section
function bonus(wfreq) {
    // Enter the washing frequency between 0 and 180
    let level = +(wfreq) * 20;
  
    // Trig to calc meter point
    let degrees = 180 - level;
    let radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);
  
    // Path: may have to change to create a better triangle
    let mainPath = "M -.0 -0.05 L .0 0.05 L ";
    let pathX = String(x);
    let space = " ";
    let pathY = String(y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);
    let rainbow = new Rainbow();
    rainbow.setSpectrum('green', 'white');
    rainbow.setNumberRange(0, 10);
    console.log('hex: ', rainbow.colourAt(0))
    let a = [];
    for (let i of [...Array(10).keys()]) {
        let hex = ['#' + rainbow.colourAt(i)];
        // a.push.apply(a, hex);
        a.push(...hex);
    }
    console.log('a: ', a);

    let data = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "Freq",
        text: level,
        hoverinfo: "text+name"
      },
      {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: a
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];
  
    let layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
  
    Plotly.newPlot("gauge", data, layout);
  }
