var initialStock = [
  {
    title: 'Google',
    symbol: 'GOOGL',
  },
  {
    title: 'Apple',
    symbol: 'AAPL',
  }
];

var stockInformation = function (data) {
  this.title = (data.title);
  this.symbol = (data.symbol);

};

var ViewModel = function () {
  var self = this;

  this.stockList = ko.observableArray([]);

  initialStock.forEach(function (stockItem) {
    self.stockList.push(new stockInformation(stockItem));
  });

  this.changeStock = function (clickStock) {
    populate(clickStock);
  };

}

function populate(clickStock){

  var $stockElem = $('#info');
  $stockElem.text("");
  var googleUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ clickStock.symbol + '&apikey=MC0RBZLQPSIREYCD';
  $.ajax({
    url: googleUrl,
    dataType: "json",
    success: function( data ){
      var stockdata = (data["Meta Data"]["2. Symbol"]);
      var stockdata1 = (data["Meta Data"]["3. Last Refreshed"]);
      var currentdate = new Date();
      var date =  currentdate.getFullYear() + "-"
                 + (currentdate.getMonth()+1)  + "-"
                 + ("0"+(currentdate.getDate())).slice(-2)
      var stockdata2 = (data["Time Series (Daily)"][date]["4. close"]);
      $stockElem.append(stockdata,"<br><br>");
      $stockElem.append(date,"<br><br>");
      $stockElem.append(stockdata2);
  },
  error: function () {
    alert("There was an error.Failed to get Stock Data Try again please!");
  }
});

  return false;
}

var vm = new ViewModel();
ko.applyBindings(vm);
