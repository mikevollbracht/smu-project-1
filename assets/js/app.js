$(document).ready(function() {
	var overview = {
		header: "Overview"
	};

	var btc = {
		coin: "Bitcoin",
		//raw numbers
		price: 0,
		priceChange: 0,
		percentChange: 0,
		open: 0,
		high: 0,
		low: 0,
		volume: 0,
		avgVolume: 0,
		marketCap: 0,
		circulatingSupply: 0,
		maxSupply: 0,
		//Display values
		priceDisplay: 0,
		priceChangeDisplay: 0,
		percentChangeDisplay: 0,
		openDisplay: 0,
		highDisplay: 0,
		lowDisplay: 0,
		volumeDisplay: 0,
		avgVolumeDisplay: 0,
		marketCapDisplay: 0,
		circulatingSupplyDisplay: 0,
		maxSupplyDisplay: 0,
		//news
		news1Headline: "",
		news1Link: "",
		news1Date: "",
		news2Headline: "",
		news2Link: "",
		news2Date: "",
		news3Headline: "",
		news3Link: "",
		news3Date: "",
		about: "Bitcoin is a cryptocurrency and worldwide payment system. It is the first decentralized digital currency, as the system works without a central bank or single administrator. The network is peer-to-peer and transactions take place between users directly through the use of cryptography, without an intermediary. These transactions are verified by network nodes and recorded in a public distributed ledger called a blockchain. Bitcoin was invented by an unknown person or group of people under the name Satoshi Nakamoto and released as open-source software in 2009.",
		aboutLink: "https://bitcoin.org/en/"
	};

	var eth = {
		coin: "Ethereum",
		//raw numbers
		price: 0,
		priceChange: 0,
		percentChange: 0,
		open: 0,
		high: 0,
		low: 0,
		volume: 0,
		avgVolume: 0,
		marketCap: 0,
		circulatingSupply: 0,
		maxSupply: 0,
		//Display values
		priceDisplay: 0,
		priceChangeDisplay: 0,
		percentChangeDisplay: 0,
		openDisplay: 0,
		highDisplay: 0,
		lowDisplay: 0,
		volumeDisplay: 0,
		avgVolumeDisplay: 0,
		marketCapDisplay: 0,
		circulatingSupplyDisplay: 0,
		maxSupplyDisplay: "No Limit",
		//news
		news1Headline: "",
		news1Link: "",
		news1Date: "",
		news2Headline: "",
		news2Link: "",
		news2Date: "",
		news3Headline: "",
		news3Link: "",
		news3Date: "",
		about: "Ethereum is an open-source, public, blockchain-based distributed computing platform featuring smart contract (scripting) functionality. It provides a decentralized Turing-complete virtual machine, the Ethereum Virtual Machine (EVM), which can execute scripts using an international network of public nodes. Ethereum also provides a cryptocurrency token called 'ether', which can be transferred between accounts and used to compensate participant nodes for computations performed.  'Gas', an internal transaction pricing mechanism, is used to mitigate spam and allocate resources on the network.",
		aboutLink: "https://www.ethereum.org/"
	};

	var ltc = {
		coin: "Litecoin",
		//raw numbers
		price: 0,
		priceChange: 0,
		percentChange: 0,
		open: 0,
		high: 0,
		low: 0,
		volume: 0,
		avgVolume: 0,
		marketCap: 0,
		circulatingSupply: 0,
		maxSupply: 0,
		//Display values
		priceDisplay: 0,
		priceChangeDisplay: 0,
		percentChangeDisplay: 0,
		openDisplay: 0,
		highDisplay: 0,
		lowDisplay: 0,
		volumeDisplay: 0,
		avgVolumeDisplay: 0,
		marketCapDisplay: 0,
		circulatingSupplyDisplay: 0,
		maxSupplyDisplay: 0,
		//news
		news1Headline: "",
		news1Link: "",
		news1Date: "",
		news2Headline: "",
		news2Link: "",
		news2Date: "",
		news3Headline: "",
		news3Link: "",
		news3Date: "",
		about: "Litecoin is a peer-to-peer cryptocurrency and open source software project released under the MIT/X11 license. Creation and transfer of coins is based on an open source cryptographic protocol and is not managed by any central authority. While inspired by, and in most regards technically nearly identical to Bitcoin (BTC), Litecoin is far quicker and cheaper.",
		aboutLink: "https://litecoin.org/"
	};

	var coinList = {
		eth: eth,
		btc: btc,
		ltc: ltc
	};

	//click event for the sidebar and mobile navigation
	$(".navigation-sel").click(function(){
		//nav item selected either mobile or sidebar
		// var navItem = $(this);
		//gets label of item selected (overview, btc, eth, ltc)
		var navLabel = $(this).data("label");
		//Finds selected item on mobile and sidebar
		var mobileItem = $(".navbar-nav").find("[data-label='" + navLabel + "']");
		var sidebarItem = $(".sidebar-list").find("[data-label='" + navLabel + "']");
		
		//changes active state on mobile menu
		mobileItem.addClass("active");
		mobileItem.siblings().removeClass("active");

		//changes active state on sidebar 
		sidebarItem.addClass("sidebar-active");
		sidebarItem.siblings().removeClass("sidebar-active");

		if (navLabel === "overview") {
			$("#overview-display").removeClass("d-none");
			$("#detailed-display").addClass("d-none");
			overviewDisplay(); 
		} else {
			$("#overview-display").addClass("d-none");
			$("#detailed-display").removeClass("d-none");

			var coinObject = coinList[navLabel];

			coinDisplay(coinObject);
		}
	})

	//update overview info when selected
	function overviewDisplay() {
		//btc
		$("#overview-btc-price").text(btc.priceDisplay);
		$("#overview-btc-change").text(btc.priceChangeDisplay);
		$("#overview-btc-percent").text(btc.percentChangeDisplay);
		$("#overview-btc-high").text(btc.highDisplay);
		$("#overview-btc-low").text(btc.lowDisplay);
		$("#overview-btc-vol").text(btc.volumeDisplay);

		//eth
		$("#overview-eth-price").text(eth.priceDisplay);
		$("#overview-eth-change").text(eth.priceChangeDisplay);
		$("#overview-eth-percent").text(eth.percentChangeDisplay);
		$("#overview-eth-high").text(eth.highDisplay);
		$("#overview-eth-low").text(eth.lowDisplay);
		$("#overview-eth-vol").text(eth.volumeDisplay);

		//ltc
		$("#overview-ltc-price").text(ltc.priceDisplay);
		$("#overview-ltc-change").text(ltc.priceChangeDisplay);
		$("#overview-ltc-percent").text(ltc.percentChangeDisplay);
		$("#overview-ltc-high").text(ltc.highDisplay);
		$("#overview-ltc-low").text(ltc.lowDisplay);
		$("#overview-ltc-vol").text(ltc.volumeDisplay);

	}

	//update detailed coin info when selected
	function coinDisplay (coinObj) {
		//name of coin
		$("#dtl-coin-name").text(coinObj.coin);
		//current price
		$("#dtl-coin-price").text(coinObj.priceDisplay);
		//change of price
		$("#dtl-coin-price-change").text(coinObj.priceChangeDisplay);
		//change in percentage
		$("#dtl-coin-percent-change").text(coinObj.percentChangeDisplay);
		// Open
		$("#dtl-coin-open").text(coinObj.openDisplay);
		// High
		$("#dtl-coin-high").text(coinObj.highDisplay);
		// Low
		$("#dtl-coin-low").text(coinObj.lowDisplay);
		// Volume
		$("#dtl-coin-vol").text(coinObj.volumeDisplay);
		// Avg Volume
		$("#dtl-coin-avg-vol").text(coinObj.avgVolumeDisplay);
		// Market Cap
		$("#dtl-coin-cap").text(coinObj.marketCapDisplay);
		// In Circulation
		$("#dtl-coin-circulation").text(coinObj.circulatingSupplyDisplay);
		// Max Supply
		$("#dtl-coin-max").text(coinObj.maxSupplyDisplay);
		//News 1 Headline 
		$("#dtl-coin-headline1").text(coinObj.news1Headline);
		//News 1 Link
		$("#dtl-coin-headline1").attr("href", coinObj.news1Link);
		//News 1 Date
		$("#dtl-coin-headline1-date").text(coinObj.news1Date);
		//News 2 Headline 
		$("#dtl-coin-headline2").text(coinObj.news2Headline);
		//News 2 Link
		$("#dtl-coin-headline2").attr("href", coinObj.news2Link);
		//News 2 Date
		$("#dtl-coin-headline2-date").text(coinObj.news2Date);
		//News 3 Headline 
		$("#dtl-coin-headline3").text(coinObj.news3Headline);
		//News 3 Link
		$("#dtl-coin-headline3").attr("href", coinObj.news3Link);
		//News 3 Date
		$("#dtl-coin-headline3-date").text(coinObj.news3Date);
		//About
		$("#dtl-coin-about").text(coinObj.about);
		//About Link 
		$("#dtl-coin-about-link").attr("href", coinObj.aboutLink);
		//About Link Text
		$("#dtl-coin-about-link").text(coinObj.aboutLinkText);
	}

	//initial load of overview data
	overviewDisplay(); 

//coinmarket cap bitcoin
var coinCapBTC = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";

$.ajax({
	url: coinCapBTC,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("Cap - BTC: ", data);
    	var cap = data[0].market_cap_usd;
    	var circ = data[0].available_supply;
    	var max = data[0].max_supply;

    	//set raw numbers in object for any calculations
    	btc.marketCap = cap;
    	btc.circulatingSupply = circ;
    	btc.maxSupply = max;

    	//convert to comma format for display in browser (comma no decimal)
    	btc.marketCapDisplay = numeral(cap).format('0.00a').toUpperCase();
    	btc.circulatingSupplyDisplay = numeral(circ).format('0,0');
    	btc.maxSupplyDisplay = numeral(max).format('0,0');

    },
    error: function(err) {
		console.log(err);
	}
});

//coinmarket cap ethereum
var coinCapETH = "https://api.coinmarketcap.com/v1/ticker/ethereum/";

$.ajax({
	url: coinCapETH,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("Cap - ETH: ", data);
   		var cap = data[0].market_cap_usd;
    	var circ = data[0].available_supply;
    	var max = data[0].max_supply;

    	//set raw numbers in object for any calculations
    	eth.marketCap = cap;
    	eth.circulatingSupply = circ;
    	//No ETH max supply

    	//convert to comma format for display in browser (comma no decimal)
    	eth.marketCapDisplay = numeral(cap).format('0.00a').toUpperCase();
    	eth.circulatingSupplyDisplay = numeral(circ).format('0,0');
    	//No ETH max supply
    },
    error: function(err) {
		console.log(err);
	}
});

// //coinmarket cap litecoin
var coinCapLTC = "https://api.coinmarketcap.com/v1/ticker/litecoin/";

$.ajax({
	url: coinCapLTC,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("Cap - LTC: ", data);
    	var cap = data[0].market_cap_usd;
    	var circ = data[0].available_supply;
    	var max = data[0].max_supply;

    	//set raw numbers in object for any calculations
    	ltc.marketCap = cap;
    	ltc.circulatingSupply = circ;
    	ltc.maxSupply = max;

    	//convert to comma format for display in browser (comma no decimal)
    	ltc.marketCapDisplay = numeral(cap).format('0.00a').toUpperCase();
    	ltc.circulatingSupplyDisplay = numeral(circ).format('0,0');
    	ltc.maxSupplyDisplay = numeral(max).format('0,0');
    	
    },
    error: function(err) {
		console.log(err);
	}
});

//GDAX Bitcoin
var gdaxBTC = "https://api.gdax.com/products/BTC-USD/stats";

$.ajax({
	url: gdaxBTC,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("GDAX BTC: ", data);
    	var open = parseFloat(data.open);
    	var high = parseFloat(data.high);
    	var low = parseFloat(data.low);
    	var last = parseFloat(data.last);
    	var volume = parseFloat(data.volume);
    	var volume30 = parseFloat(data.volume_30day);
    	

    	var calcPrice = last - open; 
    	var calcPercent =  (calcPrice / open);
    	var calcVol = volume30 / 30;

    	//set raw numbers in object for any calculations
    	btc.open = open;
    	btc.high = high;
    	btc.low = low;
    	btc.price = last;
    	btc.priceChange = calcPrice;
    	btc.percentChange = calcPercent;
    	btc.volume = volume;
    	btc.avgVolume = calcVol;


    	//convert to comma format for display in browser (comma no decimal)
    	btc.openDisplay =  numeral(open).format('0,0.00');
    	btc.highDisplay = numeral(high).format('0,0.00');
    	btc.lowDisplay = numeral(low).format('0,0.00');
    	btc.priceDisplay = numeral(last).format('0,0.00');
    	btc.priceChangeDisplay = numeral(calcPrice).format('+0,0.00');
    	btc.percentChangeDisplay = " (" + numeral(calcPercent).format("0.00%") + ")";
    	btc.volumeDisplay = numeral(volume).format('0,0');
    	btc.avgVolumeDisplay = numeral(calcVol).format('0,0');

    },
    error: function(err) {
		console.log(err);
	}
});

//GDAX Ethereum
var gdaxETH = "https://api.gdax.com/products/ETH-USD/stats";

$.ajax({
	url: gdaxETH,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("GDAX ETH: ", data);
    	var open = parseFloat(data.open);
    	var high = parseFloat(data.high);
    	var low = parseFloat(data.low);
    	var last = parseFloat(data.last);
    	var volume = parseFloat(data.volume);
    	var volume30 = parseFloat(data.volume_30day);

    	var calcPrice = last - open; 
    	var calcPercent =  (calcPrice / open);
    	var calcVol = volume30 / 30;

    	//set raw numbers in object for any calculations
    	eth.open = open;
    	eth.high = high;
    	eth.low = low;
    	eth.price = last;
    	eth.priceChange = calcPrice;
    	eth.percentChange = calcPercent;
    	eth.volume = volume;
    	eth.avgVolume = calcVol;

    	//convert to comma format for display in browser (comma no decimal)
    	eth.openDisplay =  numeral(open).format('0,0.00');
    	eth.highDisplay = numeral(high).format('0,0.00');
    	eth.lowDisplay = numeral(low).format('0,0.00');
    	eth.priceDisplay = numeral(last).format('0,0.00');
    	eth.priceChangeDisplay = numeral(calcPrice).format('+0,0.00');
    	eth.percentChangeDisplay = " (" + numeral(calcPercent).format("0.00%") + ")";
    	eth.volumeDisplay = numeral(volume).format('0,0');
    	eth.avgVolumeDisplay = numeral(calcVol).format('0,0');
    },
    error: function(err) {
		console.log(err);
	}
});

//GDAX Litecoin
var gdaxLTC = "https://api.gdax.com/products/LTC-USD/stats";

$.ajax({
	url: gdaxLTC,
    method: 'GET',
    dataType: "Json",
    success: function(data) {
    	console.log("GDAX LTC: ", data);
    	var open = parseFloat(data.open);
    	var high = parseFloat(data.high);
    	var low = parseFloat(data.low);
    	var last = parseFloat(data.last);
    	var volume = parseFloat(data.volume);
    	var volume30 = parseFloat(data.volume_30day);

    	var calcPrice = last - open; 
    	var calcPercent =  (calcPrice / open);
    	var calcVol = volume30 / 30;

    	//set raw numbers in object for any calculations
    	ltc.open = open;
    	ltc.high = high;
    	ltc.low = low;
    	ltc.price = last;
    	ltc.priceChange = calcPrice;
    	ltc.percentChange = calcPercent;
    	ltc.volume = volume;
    	ltc.avgVolume = calcVol;

    	//convert to comma format for display in browser (comma no decimal)
    	ltc.openDisplay =  numeral(open).format('0,0.00');
    	ltc.highDisplay = numeral(high).format('0,0.00');
    	ltc.lowDisplay = numeral(low).format('0,0.00');
    	ltc.priceDisplay = numeral(last).format('0,0.00');
    	ltc.priceChangeDisplay = numeral(calcPrice).format('+0,0.00');
    	ltc.percentChangeDisplay = " (" + numeral(calcPercent).format("0.00%") + ")";
    	ltc.volumeDisplay = numeral(volume).format('0,0');
    	ltc.avgVolumeDisplay = numeral(calcVol).format('0,0');
    },
    error: function(err) {
		console.log(err);
	}
});

//gdax bitcoin price series
//Set up call to get the coinbase time, then call the individual apis for one day(1Y 1M), 15 min (5D 1d) 
//Starts 1 day back
// var oneDayBTC = "https://api.gdax.com/products/BTC-USD/candles?end=1514383200&granularity=86400";
// //
// //Starts at last hour 
// var fifteenMinBTC = "https://api.gdax.com/products/BTC-USD/candles?granularity=900"


// $.ajax({
// 	url: oneDayBTC,
//     method: 'GET',
//     dataType: "Json",
//     success: function(data) {
//     	console.log("GDAX Price Series BTC: ", data);
    	
//     },
//     error: function(err) {
// 		console.log(err);
// 	}
// });


//Charts 
	// alpha vantage https://www.alphavantage.co/documentation/
	var endpoint = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&outputsize=compact&symbol=BTC&market=USD&apikey=9AA4OWCBOEFDUNTK";
	var pricesesArr = [];
	var dateArr = [];
	var ctx = document.getElementById("myChart").getContext('2d');
	$.ajax({
		url: endpoint,
	    method: 'GET',
	    dataType: "Json",
	    success: function(data) {
	    	// console.log(data)
	    	var obj = data["Time Series (Digital Currency Daily)"]
	    	// console.log(data["Meta Data"]["Time Series (Digital Currency Daily)"]);

	    	for(var key in obj){
	    		// console.log(obj[key]["4a. close (USD)"])
	    		if (pricesesArr.length > 9) {
	    			break;
	    		}
	    		if (dateArr.length > 9){
	    			break;
	    		}
	    		var date = key.slice(5)
	    		dateArr.unshift(date)

	    		pricesesArr.unshift(parseInt(obj[key]["4a. close (USD)"]))
	    	}

	    	dateArr.forEach(function(val){
	    			
	    	console.log(val)
	    	})

	    	console.log(dateArr)

			var myChart = new Chart(ctx, {
	    	type: 'line',
	    	data: {
	        	labels: dateArr,
	        	datasets: [{
	            	label: '# of Votes',
	            	data: pricesesArr,
	            	backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
	            	],
	            	borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
	            	],
	            	borderWidth: 1
	        	}]
	    	},
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:false
		                },
		            	gridLines: {
		                    display:false
		                }
		            }],
		            xAxes: [{
		            	gridLines: {
		                    display:false
		                }
		            }]
		        },//end scales 
		        maintainAspectRatio: true,
		    	responsive: true,
		    	legend: {
	            	display: false
	         	},

		    }//end options
			});//end var myChart 
	    },//End sucess
	    error: function(err) {
	    	console.log(err);
	    }
	});

console.log(pricesesArr)

});