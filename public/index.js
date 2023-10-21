function getColor(stock){ //Here we are creating a function to assign a color to each of the stocks in the chart.
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

function HighestValue(values){                    //this is our second helper function. which seems to be a callback function . although i may be wrong about calling it that. have to check notes
    let highest = 0; 
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {  //was stuck with this part for too long , did not know that parseFloat was an option. could not figure out how to use math.max or if it could even be used.
            highest = value.high
        }                                        //refer to highest card game to compare code, seems very similar. 
})
    return highest  
}

function getMaxOfArray(numArray) {
    return Math.max.apply(numArray);
  }

//NOTE: could not get Math.MAx to work. 

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');   //CB NOTE: Set up a variable which we will use to place the charts. it is selecting elements in the html doucment which are divs with each a diffrent id. 
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    const response = await fetch ('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=8a5c6f0e412344509a3cec67f13b86d3')



    const resObj = await response.json()
// we created a fetch and response to get the data from twelvedata.com 

            // let GME = result.GME
            // let MSFT = result.MSFT
            // let DIS = result.DIS
            // let BNTX = result.BNTX

   const {GME, MSFT, DIS, BNTX} = mockData;     //NOTE: here we create a variable which makes GME MSFT DIS BNTX represnent the data collected ... not sure about this . NOTE: ask this in class. 
    
    const stocks = [GME, MSFT, DIS, BNTX]; // we are asigning a variable of stocks to use when needed. 

    stocks.forEach( stock => stock.values.reverse())  //NOTE: it is using forEach from our stocks variable on top, it goes through every stock we have listed above and gets its values . although not sure why its reverse .... NOTE ask in class .....


    // Bonus Note: 
    // Another way to write the above lines would to refactor it as:
       // const {GME, MSFT, DIS, BTNX} = result 
    // This is an example of "destructuring" an object
    // "Destructuring" creates new variables from an object or an array


//     const { GME, MSFT, DIS, BNTX } = mockData;

// const stocks = [GME, MSFT, DIS, BNTX];


// stocks.forEach( stock = stock.values.reverse())

new Chart(timeChartCanvas.getContext('2d'), {     // CB NOTE: creating a new chart using the guide from twelvedata.com. 
    type: 'line',  //Here we choose what kind of chart we want other choices can be bar ... 
    data: {
        labels: stocks[0].values.map(value => value.datetime),  // to label our chart we are using the value of the stock , and datatime seems to be when the data was collected
        datasets: stocks.map( stock => ({           
            label: stock.meta.symbol,
            backgroundColor:  getColor(stock.meta.symbol),
            borderColor:  getColor(stock.meta.symbol),
            data: stock.values.map(value => parseFloat(value.high))
        }))
    }
});
                                                  
new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: 'HighestAvarage',
            backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            borderColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            data: stocks.map(stock => (
                HighestValue(stock.values)
                // getMaxOfArray(stock.values)
            ))
        }]
    }
});

}




main()




//CB NOTE: Code breakdown Note