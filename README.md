# Stock-App
  * Here I have developed a single-page application featuring a stock of my portfolio
     * index.html file is used to open this app.
     * js folder contains app.js that has used to Design MVVM pattern,to create Knockout framework, and handling ajax request.
     * js folder must contain jquery.min.js that has used to ajax request and knockout-3.4.2.js used to MVVM pattern. 
     * App display the Stocks and total portfolio Gain/Loss by default when the page is loaded.
     * Clicking a Stock name in the list View that gives the today stock price for the associated stock.
     * Added functionality using third-party APIs to provide information when a list view entry is clicked. 
 
App visit is here <https://aarthyravi.github.io/Stock-App/> 

# Setup
Download the Knockout framework. 

Knockout used to handle the list, filter.

# Alphavantage API(Third Party API)
  I have implemented (Alphavantage API) third-party APIs that provide additional information about each of these stocks.
  
  * var googleUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ initialStock[j].symbol + '&apikey=####';
  
