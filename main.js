"use strict";
$(document).ready(function () {
	const BTC_USD = 500;
	const ETH_USD = 600;
	const LTC_USD = 700;

	const BTC_OWNED = 10;
	const ETH_OWNED = 20;
	const LTC_OWNED = 30;
	//totals
	var usd_invested = BTC_USD + ETH_USD + LTC_USD;

	function roundToTwo(num) {
		return +(Math.round(num + "e+2")  + "e-2");
	}

	function ajax_get(coin, callback) {
		var exchange = 'https://min-api.cryptocompare.com/data/price?fsym=';
		var apiurl = exchange + coin + '&tsyms=USD';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				try {
					var data = JSON.parse(xmlhttp.responseText);
				} catch(err) {
					console.log(err.message + " in " + xmlhttp.responseText);
					return;
				}
				callback(data);
			}
		};
		xmlhttp.open("GET", apiurl, true);
		xmlhttp.send();
	}

	var gains = [];
	var totals = [];
	console.log(gains);
	console.log(gains.length);
	
	function calculateTotal(coin, price) {
		switch (coin)
		{
			case "BTC":
				var total = BTC_OWNED * price;
				var gain = total - BTC_USD
				totals.unshift(total);
				gains.unshift(gain);
				document.getElementById("btc_total").innerHTML = roundToTwo(total);
				document.getElementById("btc_gain").innerHTML = roundToTwo(gain);
				break;
			case "ETH":
				var total = ETH_OWNED * price;
				var gain = total - ETH_USD
				totals.unshift(total);
				gains.unshift(gain);
				document.getElementById("eth_total").innerHTML = roundToTwo(total);
				document.getElementById("eth_gain").innerHTML = roundToTwo(gain);
				break;
			case "LTC":
				var total = LTC_OWNED * price;
				var gain = total - LTC_USD
				totals.unshift(total);
				gains.unshift(gain);
				document.getElementById("ltc_total").innerHTML = roundToTwo(total);
				document.getElementById("ltc_gain").innerHTML = roundToTwo(gain);
				break;
		}
	}

	ajax_get('BTC', function(data) {
		var name = 'BTC';
		document.getElementById("td1").innerHTML = data["name"];
		var price = data.USD;
		document.getElementById("td1_value").innerHTML = price;
		calculateTotal(name, price);
	});

	ajax_get('ETH', function(data) {
		var name = 'ETH';
		document.getElementById("td2").innerHTML = data["name"];
		var price = data.USD;
		document.getElementById("td2_value").innerHTML = price;
		calculateTotal(name, price);
	});

	ajax_get('LTC', function(data) {
		var name = 'LTC';
		document.getElementById("td3").innerHTML = data["name"];
		var price = data.USD;
		document.getElementById("td3_value").innerHTML = price;
		calculateTotal(name, price);
	});

	document.getElementById("total_usd_invested").innerHTML = roundToTwo(usd_invested);
	//coins owned
	document.getElementById("btc_owned").innerHTML = roundToTwo(BTC_OWNED);
	document.getElementById("btc_usd").innerHTML = roundToTwo(BTC_USD);
	document.getElementById("eth_owned").innerHTML = roundToTwo(ETH_OWNED);
	document.getElementById("eth_usd").innerHTML = roundToTwo(ETH_USD);
	document.getElementById("ltc_owned").innerHTML = roundToTwo(LTC_OWNED);
	document.getElementById("ltc_usd").innerHTML = roundToTwo(LTC_USD);
});
