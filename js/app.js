var initialStock = [
  {
    title: 'Google',
    symbol: 'GOOGL',
    quan: 4,
    stockPrice: 850,
    total: 0,
  },
  {
    title: 'Apple',
    symbol: 'AAPL',
    quan: 2,
    stockPrice: 120,
    total: 0,
  },
];
t = 0;
var $total = $('#total');
for (i=0;i<initialStock.length;i++) {
  t += initialStock[i].quan * initialStock[i].stockPrice;
}
$total.append(t)
for (j=0;j<initialStock.length;j++) {
  var googleUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ initialStock[j].symbol + '&apikey=MC0RBZLQPSIREYCD';

  currentstock(function(data,data1) {
    for (k=0;k<initialStock.length;k++) {
      if (initialStock[k].symbol == data1){
        currenttotal = 0
        var $currenttotal = $('#info')
        t1 = initialStock[k].quan * data
      }
    }
    $currenttotal.append(t1)
  });

}
  function currentstock (callback){
    $.ajax({
      url: googleUrl,
      dataType: "json",
      success: function( data ){
        var stockdata = (data["Meta Data"]["2. Symbol"]);
        var currentdate = new Date();
        var date =  currentdate.getFullYear() + "-"
                   + (currentdate.getMonth()+1)  + "-"
                   + ("0"+(currentdate.getDate())).slice(-2)
        var stockdata2 = (data["Time Series (Daily)"][date]["4. close"]);
        if(typeof callback === "function") callback(stockdata2,stockdata);
      }
    });

  }


var stockInformation = function (data) {
  this.title = (data.title);
  this.symbol = (data.symbol);
  this.total = (data.stockPrice * data.quan);
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
