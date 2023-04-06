


bonus = (Mfilterwfreq) => {//BONUS
        //filter all individual metadata used in demographics table and gauge chart
    let dgauge = [{
        domain : {x: [0,1], y:[0,1]},
        value : Mfilterwfreq,
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
              value: Mfilterwfreq}}
    }];
    Plotly.newPlot("gauge", dgauge);}//end BONUS section