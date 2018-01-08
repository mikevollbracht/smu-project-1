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
		about: "Bitcoin is a cryptocurrency and worldwide payment system. It is the first decentralized digital currency, as the system works without a central bank or single administrator. The network is peer-to-peer and transactions take place between users directly through the use of cryptography, without an intermediary. These transactions are verified by network nodes and recorded in a public distributed ledger called a blockchain. Bitcoin was invented by an unknown person or group of people under the name Satoshi Nakamoto and released as open-source software in 2009.",
		aboutLink: "https://bitcoin.org/en/",
		//api urls
		marketCapAPI: "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
		gdaxStats: "https://api.gdax.com/products/BTC-USD/stats", 
		gdaxDay: "https://api.gdax.com/products/BTC-USD/candles?granularity=86400",
		gdaxHour: "https://api.gdax.com/products/BTC-USD/candles?granularity=3600",
		gdaxSixHour: "https://api.gdax.com/products/BTC-USD/candles?granularity=21600",
		gdaxFifteenMin: "https://api.gdax.com/products/BTC-USD/candles?granularity=900" 
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
		about: "Ethereum is an open-source, public, blockchain-based distributed computing platform featuring smart contract (scripting) functionality. It provides a decentralized Turing-complete virtual machine, the Ethereum Virtual Machine (EVM), which can execute scripts using an international network of public nodes. Ethereum also provides a cryptocurrency token called 'ether', which can be transferred between accounts and used to compensate participant nodes for computations performed.  'Gas', an internal transaction pricing mechanism, is used to mitigate spam and allocate resources on the network.",
		aboutLink: "https://www.ethereum.org/",
		//api urls
		marketCapAPI: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
		gdaxStats: "https://api.gdax.com/products/ETH-USD/stats",
		gdaxDay: "https://api.gdax.com/products/ETH-USD/candles?granularity=86400",
		gdaxHour: "https://api.gdax.com/products/ETH-USD/candles?granularity=3600",
		gdaxSixHour: "https://api.gdax.com/products/ETH-USD/candles?granularity=21600",
		gdaxFifteenMin: "https://api.gdax.com/products/ETH-USD/candles?granularity=900" 
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
		about: "Litecoin is a peer-to-peer cryptocurrency and open source software project released under the MIT/X11 license. Creation and transfer of coins is based on an open source cryptographic protocol and is not managed by any central authority. While inspired by, and in most regards technically nearly identical to Bitcoin (BTC), Litecoin is far quicker and cheaper.",
		aboutLink: "https://litecoin.org/",
		//api urls
		marketCapAPI: "https://api.coinmarketcap.com/v1/ticker/litecoin/",
		gdaxStats: "https://api.gdax.com/products/LTC-USD/stats",
		gdaxDay: "https://api.gdax.com/products/LTC-USD/candles?granularity=86400",
		gdaxHour: "https://api.gdax.com/products/LTC-USD/candles?granularity=3600",
		gdaxSixHour: "https://api.gdax.com/products/LTC-USD/candles?granularity=21600",
		gdaxFifteenMin: "https://api.gdax.com/products/LTC-USD/candles?granularity=900"
	};

	//list of the coin objects (used with click events to pass object)
	var coinList = {
		eth: eth,
		btc: btc,
		ltc: ltc
	};

	//holds set interval data for coin display and historical
	var status = { 
		coinInterval: 0,
		currentCoin: null,
		historicalInterval: 0,
		period: "one",
		coinObj: btc,
		graph: "overviewChart",
		initialLoad: true
	}

	//click events
	//click event for the sidebar and mobile navigation
	$(".navigation-sel").click(function(){
		//nav item selected either mobile or sidebar
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

		//closes mobile nav if link clicked
		var mobileNavStatus = $("#navToggleButton").attr("aria-expanded");
		if (mobileNavStatus = "true") {
			$("#navToggleButton").addClass("collapsed");
			$("#navToggleButton").attr("aria-expanded", "false");
			$("#navbarToggler").removeClass("show");
		}

		if (navLabel === "overview") {
			$("#overview-display").removeClass("d-none");
			$("#detailed-display").addClass("d-none");
			overviewDisplay(); 

			//display overview graph
			gdaxHistorical("one", btc);

			//set active graph to bitcoin
			$(".graph-header").find("a").removeClass("graph-active");
			$(".graph-header").find('[data-initial="true"]').addClass("graph-active");

			//set status object graph to overview
			status.graph = "overviewChart";

		} else {
			var coinObject = coinList[navLabel];
			//set coin object in status object for the interval to use
			status.currentCoin = coinObject;

			$("#overview-display").addClass("d-none");
			$("#detailed-display").removeClass("d-none");

			//clear deatiled graph data-coin values
			$(".graph-header").find("a").removeData("data-coin");
			//set detailed graph data-coin values
			$("#detailed-graph").find("a").attr("data-coin", navLabel);
			
			//set active graph to 1D
			$(".graph-header").find("a").removeClass("graph-active");
			$(".graph-header").find('[data-initial="true"]').addClass("graph-active");
			//display detailed graph
			gdaxHistorical("one", coinObject);

			//Display detailed data
			coinDisplay(coinObject);
			//set interval to update price
			priceUpdate();

			//set status object graph to detailed
			status.graph = "detailedChart";

			//get day of week data
			dayOfWeek(coinObject);

			//get news articles
			getNews(coinObject.coin);
		}

		//scroll to top of page
		window.scrollTo(0, 0);
	})

	//click event to change graph
	$(".graph-header").find("a").click(function(){
		var graphChoice = $(this);
		var coin = graphChoice.attr("data-coin");
		var period = graphChoice.attr("data-period");
		var graph = graphChoice.attr("data-graph");
		var coinObject = coinList[coin];
		//highlight which item was selected
		graphChoice.addClass("graph-active");
		graphChoice.parent().siblings().find("a").removeClass("graph-active");
		
		//make graph
		gdaxHistorical(period, coinObject);
	})

	//JQuery Update functions
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
		//set color of price and percent
		if (coinObj.priceChange < 0) {
			//if negative red
			$("#dtl-coin-price-change").removeClass("positive");
			$("#dtl-coin-percent-change").removeClass("positive");
			$("#dtl-coin-price-change").addClass("negative");
			$("#dtl-coin-percent-change").addClass("negative");
		} else if (coinObj.priceChange > 0) {
			//if positive green
			$("#dtl-coin-price-change").removeClass("negative");
			$("#dtl-coin-percent-change").removeClass("negative");
			$("#dtl-coin-price-change").addClass("positive");
			$("#dtl-coin-percent-change").addClass("positive");
		} else {
			//if no change then black
			$("#dtl-coin-price-change").removeClass("negative");
			$("#dtl-coin-percent-change").removeClass("negative");
			$("#dtl-coin-price-change").removeClass("positive");
			$("#dtl-coin-percent-change").removeClass("positive");
		}

		//name of coin
		$("#dtl-coin-name").text(coinObj.coin);
		//current price
		$("#dtl-coin-price").text(coinObj.priceDisplay);
		//change of price
		$("#dtl-coin-price-change").text(coinObj.priceChangeDisplay);
		//change in percentage
		$("#dtl-coin-percent-change").text(" (" + coinObj.percentChangeDisplay + ")");
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

	//update detailed  
	function priceUpdate() {
		clearInterval(status.coinInterval);

		status.coinInterval = setInterval(function(){
			// console.log("priceUpdate");
			coinDisplay(status.currentCoin);
			overviewDisplay();
		}, 15000);
	}

	//updates graph 
	function historicalUpdate() { 
		clearInterval(status.historicalInterval);

		status.historicalInterval = setInterval(function(){
			// console.log("historical interval", status.period, status.coinObj, status.graph)
			gdaxHistorical(status.period, status.coinObj)
		}, 15000);
	}

	//APIs
	//coin market cap to get supply and market cap data
	function coinCap(coinObj) {

		$.ajax({
			url: coinObj.marketCapAPI,
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log("Cap: ", data);
		    	var cap = data[0].market_cap_usd;
		    	var circ = data[0].available_supply;
		    	var max = data[0].max_supply;

		    	//set raw numbers in object for any calculations
		    	coinObj.marketCap = cap;
		    	coinObj.circulatingSupply = circ;
		    	coinObj.maxSupply = max;

		    	//convert to comma format for display in browser (comma no decimal)
		    	coinObj.marketCapDisplay = numeral(cap).format('0.00a').toUpperCase();
		    	coinObj.circulatingSupplyDisplay = numeral(circ).format('0,0');

		    	if (coinObj === eth) {
		    		coinObj.maxSupplyDisplay = "No Limit";
		    	} else {
		    		coinObj.maxSupplyDisplay = numeral(max).format('0,0');
		    	}

		    	//load overview data
				overviewDisplay(); 
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}

	//top caps and other currencies
	function topTenCaps() {

		$.ajax({
			url: "https://api.coinmarketcap.com/v1/ticker/?limit=10",
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log("top ten", data)
		    	//clear existing data if there
		    	$("#overview-other-coins").find(".clearfix").remove();
		    	$("#overview-top-caps").find("h6").remove();

		    	for (i=0; i < data.length; i++){
		    		var coinData = data[i];
		    		var rank = coinData.rank;
		    		var name = coinData.name;
		    		var symbol = coinData.symbol;
		    		var cap = numeral(coinData.market_cap_usd).format('0.00a').toUpperCase();
		    		var price = coinData.price_usd;
		    		var percent = coinData.percent_change_24h;
		    		var original = (price / ((percent / 100) + 1)) ;
		    		var priceDisplay = numeral(coinData.price_usd).format('0,0.00');
		    		var percentDisplay = "("+coinData.percent_change_24h+"%)";
		    		var change = numeral(price - original).format('+0,0.00');
		    		var rankName = rank + ". " + name;

		    		//new line for market caps
		    		var newLine = $("<h6>" + rankName + "<span class='float-right'>"+ cap +"</span></h6>");

		    		//add to top market caps
		    		$("#overview-top-caps").append(newLine);

		    		//if not btc, eth, or ltc show in other currencies
		    		if (symbol !== "BTC" && symbol !== "ETH" && symbol !== "LTC") {

		    			var newCoinDiv = $("<div class='clearfix'></div>")
		    			var newName = $("<h6 class='d-inline-block otherCoins'>"+name+"</h6>")
				       	var newList = $("<ul class='list-inline float-right otherCoins'></ul>")
				       	var itemPrice = $("<li class='list-inline-item otherCoins'><h6>"+ priceDisplay +"</h6></li>")
						var itemChange = $("<li class='list-inline-item otherCoins'><h6>"+ change +"</h6></li>")	
						var itemPercent = $("<li class='list-inline-item otherCoins'><h6>"+ percentDisplay +"</h6></li>")

						//set color of price and percent
						if ((price - original) < 0) {
							//if negative red
							itemChange.addClass("negative");
							itemPercent.addClass("negative");

						} else if ((price - original) > 0) {
							//if positive green
							itemChange.addClass("positive");
							itemPercent.addClass("positive");
						} 

						//add items to newList
						newList.append(itemPrice);
						newList.append(itemChange);
						newList.append(itemPercent);

						//add name and new list to div
						newCoinDiv.append(newName);
						newCoinDiv.append(newList);

						//display on screen
						$("#overview-other-coins").append(newCoinDiv);
		    		}
		    	}
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}

	
	

	//call GDAX stats and get current price data https://docs.gdax.com/#get-24hr-stats
	//documentation doesnt show but also returns "last price" which is current price on the exchange
	function gdaxStats(coinObj) {

		$.ajax({
			url: coinObj.gdaxStats,
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log("GDAX Stats: ", data);
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
		    	coinObj.open = open;
		    	coinObj.high = high;
		    	coinObj.low = low;
		    	coinObj.price = last;
		    	coinObj.priceChange = calcPrice;
		    	coinObj.percentChange = calcPercent;
		    	coinObj.volume = volume;
		    	coinObj.avgVolume = calcVol;

		    	//convert to comma format for display in browser (comma no decimal)
		    	coinObj.openDisplay =  numeral(open).format('0,0.00');
		    	coinObj.highDisplay = numeral(high).format('0,0.00');
		    	coinObj.lowDisplay = numeral(low).format('0,0.00');
		    	coinObj.priceDisplay = numeral(last).format('0,0.00');
		    	coinObj.priceChangeDisplay = numeral(calcPrice).format('+0,0.00');
		    	coinObj.percentChangeDisplay = numeral(calcPercent).format("0.00%");
		    	coinObj.volumeDisplay = numeral(volume).format('0,0');
		    	coinObj.avgVolumeDisplay = numeral(calcVol).format('0,0');

		    	//load overview data
				overviewDisplay(); 
				//create graph if intial load
				if (status.initialLoad === true) {
					setTimeout(function(){
						gdaxHistorical("one", btc)
					},250)
					status.initialLoad = false;
				}
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}
	

	//calls GDAX and gets historical data for graphs https://docs.gdax.com/#get-historic-rates
	function gdaxHistorical(period, coinObj) {
		var gdaxUrl = "";

		if (period === "six") {
			gdaxUrl = coinObj.gdaxDay;
		} else if (period === "month"){
			gdaxUrl = coinObj.gdaxSixHour;
		} else if (period === "five") {
			gdaxUrl = coinObj.gdaxHour;
		} else {
			gdaxUrl = coinObj.gdaxFifteenMin;
		}

		$.ajax({
			url: gdaxUrl,
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log("gdaxHistorical", data)
		    	var gdaxData = data;
		    	var priceArray = [];
		    	var labelArray = [];
		    	//default green
		    	var colorObj = {
		    			border: 'rgb(36, 157, 61)',
		    			background: 'rgba(36, 157, 61, 0.15)'
		    		};

		    	//six month logic
		    	if (period === "six") {
		    		//gets 364 days of 1 day prices
			    	for (i = 0; i < 180; i++) {
						//use unshift so that current day is at end of array
			    		priceArray.unshift(gdaxData[i][4]);
			    		if (i % 40 === 0) {
				    		labelArray.unshift(moment.unix(gdaxData[i][0]).format('MMM D'));
				    	} else {
				    		labelArray.unshift("");
				    	}
				    }
				//month logic
		    	} else if (period === "month") {
		    		//gets 364 days of 1 day prices
			    	for (i = 0; i < 119; i++) {
			    		priceArray.unshift(gdaxData[i][4]);
			    		if (i % 24 === 0) {
				    		labelArray.unshift(moment.unix(gdaxData[i][0]).format('MMM D'));
				    	} else {
				    		labelArray.unshift("");
				    	}
				    }
				//five day logic
		    	} else if (period === "five") {
		    		for (i = 0; i < 119; i++) {
		    			priceArray.unshift(gdaxData[i][4]);
			    		if (i % 24 === 0) {
				    		labelArray.unshift(moment.unix(gdaxData[i][0]).format('MMM D'));
				    	} else {
				    		labelArray.unshift("");
				    	}
				    }
		    	//one day logic
		    	} else {
		    		for (i = 0; i < 96; i++) {
		    			priceArray.unshift(gdaxData[i][4]);
			    		if (i % 19 === 0) {
				    		labelArray.unshift(moment.unix(gdaxData[i][0]).format('h:mm a'));
				    	} else {
				    		labelArray.unshift("");
				    	}
					}
		    	}

				priceArray.push(coinObj.price);

				//if opening price is lower than closing price change color of graph to red
				//first if checks for 1 day price because the data comes from 2 places so didnt always work out
				//with the calculation in the else if 
				if (gdaxUrl === coinObj.gdaxFifteenMin) {
					if (coinObj.priceChange < 0) {
						colorObj.border = 'rgb(210,63,49)';
						colorObj.background = 'rgba(210,63,49, 0.15)';
					}
				} else if (priceArray[0] > priceArray[priceArray.length - 1]) {
					colorObj.border = 'rgb(210,63,49)';
					colorObj.background = 'rgba(210,63,49, 0.15)';
				} 

		    	//plot chart
		    	makeChart(priceArray, labelArray, colorObj, status.graph);

		    	//set variables in the status object
		    	status.period = period;
		    	status.coinObj = coinObj;
		    	//set interval to update graph
		    	clearInterval(status.historicalInterval);
		    	historicalUpdate();
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}//end gdaxHistorical

	//Charts
	//day of week bar chart
	function dayOfWeek(coinObj) {
		$.ajax({
			url: coinObj.gdaxDay,
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log("dayOfWeek", data)
		    	var mon = [];
		    	var tue = [];
		    	var wed = [];
		    	var thu = [];
		    	var fri = [];
		    	var sat = [];
		    	var sun = [];
		    	var dayArray = [mon, tue, wed, thu, fri, sat, sun];
		    	var changeArray = [];
		    	var backgroundArray = [];
		    	var borderArray = [];

		    	for (i=0; i < data.length; i++) {
		    	 	//sunday is 0 
		    	 	var day = moment.unix(data[i][0]).day();
		    	 	var open = data[i][3];
		    	 	var close = data[i][4];
		    	 	//decimal
		    	 	//((y2 - y1) / y1) = your percentage change.
		    	 	var percentChange = ((close - open) / open) * 100;

		    	 	if (day === 0) {
		    	 		sun.push(percentChange);
		    	 	} else if ( day === 1) {
		    	 		mon.push(percentChange);
		    	 	} else if ( day === 2) {
		    	 		tue.push(percentChange);
		    	 	} else if ( day === 3) {
		    	 		wed.push(percentChange);
		    	 	} else if ( day === 4) {
		    	 		thu.push(percentChange);
		    	 	} else if ( day === 5) {
		    	 		fri.push(percentChange);
		    	 	} else {
		    	 		sat.push(percentChange);
		    	 	}
		    	}

		    	for (i=0; i < dayArray.length; i++) {
		    		var day = dayArray[i]; 
		    		var numberItems = dayArray[i].length;
		    		var sum = 0;
		    		var average = 0;

		    		for (x=0; x < day.length; x++){
		    			sum += day[x];
		    		}

		    		//get average for the day
		    		average = (sum / numberItems);

		    		//add each day monday
		    		dayArray[i] = average.toFixed(3);

		    		//set color for bar graph
		    		if (average < 0) {
		    			backgroundArray[i] = 'rgba(210,63,49, 0.15)';
		    			borderArray[i] = 'rgb(210,63,49)';
		    		} else {
		    			backgroundArray[i] = 'rgba(36, 157, 61, 0.15)';
		    			borderArray[i] = 'rgb(36, 157, 61)';
		    		}
		    	}

		    	//clear chart 
		    	$("#dayChart").remove();
		    	//add new div for chart
		    	$("#day-graph").append("<canvas id='dayChart'></canvas>");


		    	var ctx = document.getElementById("dayChart").getContext('2d');
				var myChart = new Chart(ctx, {
				    type: 'bar',
				    data: {
				        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				        datasets: [{
				            data: dayArray,
				            backgroundColor: backgroundArray,
				            borderColor: borderArray,
				            borderWidth: 3
				        }]
				    },
				    options: {
				    	animation: false,
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true,    
		      						maxTicksLimit: 5,
		      						callback: function(value) {
						               return value + "%"
						           }
				                }
				            }],
				            xAxes: [{
				                gridLines: {
				                    display:false
				                }
				            }]
				        },
				        maintainAspectRatio: false,
				    	responsive: true,
				    	legend: {
				        	display: false
				     	},
				     	tooltips: {
				        	callbacks: {
			                    label: function(tooltipItem, data) {
			                        return data['datasets'][0]['data'][tooltipItem['index']] + '%';
			                    }
		                	}
				        },//end tooltips
					}
				});
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}//end day of week

	//price chart
	function makeChart(priceData, labelData, colorObj, graph){
		// console.log("MakeChart", graph)
		//clear chart 
    	$("#overviewChart").remove();
    	$("#detailedChart").remove();
    	
    	//add new div for chart
    	$("#graph-overview").append("<canvas id='overviewChart'></canvas>");
    	$("#graph-detailed").append("<canvas id='detailedChart'></canvas>");

    	//remove repeating iframe from div that is created every time graph is updated
    	$(".graph").find("iframe").remove();

		var ctx = document.getElementById(graph).getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: labelData,
		        datasets: [{
		            data: priceData,
		            backgroundColor: colorObj.background,
		            borderColor: colorObj.border,
		            borderWidth: 3
		        }]
		    },
		    options: {
		    	animation: false,
		    	tooltips: {
		    		enabled: false
		    	},
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:false,
		      				maxTicksLimit: 5,
		      				callback: function(value) {
				               return numeral(value).format('0,0');
				           }

		                },
		            	gridLines: {
		                    display: false
		                }
		            }],
		            xAxes: [{
		            	gridLines: {
		                    display:false
		                },
		                ticks: {
		                	autoSkip: false,
		    				padding: 0,
		    				minRotation: 0,
		    				maxRotation: 0,
		    				// labelOffset: -10,
		    				drawTicks: true,
		    				tickMarkLength: 10
		                }
		            }]
		        },//end scales 
		        elements: {
	                point:{
	                    radius: 0
	                }
	            },//end elements
		        maintainAspectRatio: false,
		    	responsive: true,
		    	legend: {
		        	display: false
		     	},

		    }//end options
		});//end var myChart
	}//end make chart

	//news
	function getNews(searchTerm){
		var yesterdayDate = moment().format("YYYY-MM-DD")

		$.ajax({
			url: "https://newsapi.org/v2/everything?q="+searchTerm+"&apiKey=b32a0ad2ed594a4798bb1dd9add6c2e5&language=en&sortBy=relevancy&from="+yesterdayDate,
		    method: 'GET',
		    dataType: "Json",
		    success: function(data) {
		    	// console.log(data);
		    	// console.log($("#dtl-coin-headline1-date"));
		    	// console.log(data.articles[0]["description"]);

		    	newsElement = $(".coin-news");
		    	$(".newsItem").remove();

		    	for(i=0; i<3; i++){
		    		var newsDiv = $("<div class='newsItem'></div>");

		    		//news link
		    		newsRow = document.createElement("h5");
		    		newsLink = document.createElement("a");
		    		newsLink.setAttribute('class','news-title');
		    		newsLink.setAttribute('href', data.articles[i]["url"]);
		    		newsLink.setAttribute('target', "_blank");
		    		newsRow.append(newsLink);
		    		newsLink.innerText = data.articles[i]["title"];

		    		newsRow.append(newsLink);
		    		newsDiv.append(newsRow);

		    		//news preview
		    		newsContent = document.createElement("p");
		    		newsContent.setAttribute('class','news-paragraph');
		    		newsContent.innerText = data.articles[i]["description"];

		    		newsDiv.append(newsContent);

		    		//news date
		    		newsDate = document.createElement("small");
		    		newsDate.setAttribute('class','news-date');
		    		timestamp = data.articles[i]["publishedAt"];
		    		date = timestamp.split("T");
		    		newsDate.innerText = moment(date[0]).format("MM/DD/YYYY");

		    		newsDiv.append(newsDate);
		    		newsElement.append(newsDiv);
		    	}
	
		    	
		    },
		    error: function(err) {
				console.log(err);
			}
		});
	}

	//intial loading of page and updated calls
	function intialLoad() {
		//call gdax for stats
		gdaxStats(btc)
		gdaxStats(eth);
		gdaxStats(ltc);
		//update gdax prices 15 seconds
		setInterval(function(){
			gdaxStats(btc);
			gdaxStats(eth);
			gdaxStats(ltc);
			// console.log("GDAX Stats updated");
		}, 15000);

		//call coincap
		coinCap(btc);
		coinCap(eth);
		coinCap(ltc);
		//update coincap every 3 minutes
		setInterval(function(){
			coinCap(btc);
			coinCap(eth);
			coinCap(ltc);
			// console.log("Cap updated");
		}, 180000);

		//get top 10 caps
		topTenCaps()
		//update every minute
		setInterval(function(){
			topTenCaps()
		}, 60000);

	};

	intialLoad();
});