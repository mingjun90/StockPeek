$(document).ready(function(){
	$("#navigation").load("shared_nav.html");
	$("#sharedfooter").load("shared_footer.html");

	$(document.body).delegate("#searchbtn1, #searchbtn2", "click", function(event){
		// var API = "http://finance.yahoo.com/webservice/v1/symbols/YHOO/quote?format=json";
		// var APT1 = "http://finance.yahoo.com/webservice/v1/symbols/YHOO/quote?format=json&view=detail";

		var input = $( "input:first" ).val();
		var input2 = $("#searchinput2").val();

		var search;
		if(input == '' && input2 == '') {
			alert("Choose your stock please!");
			return false;
		} else if((input != '' && input2 != '') && (input != input2) ){
			alert("Choose one stock please!");
			return false;
		} else if((input != '' && input2 != '') && (input == input2) ){
			search  = input;
		} else if(input == '' && input2 != '') {
			search  = input2;
		} else if(input != '' && input2 == '') {
			search  = input;
		}

		var yahhoapi3 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes" +
			"%20where%20symbol%20IN%20(\""+search+"\")&format=json&env=http://datatables.org/alltables.env";
		$.getJSON(yahhoapi3, function (jsondata) {
			var out = "";

			var item = jsondata.query.results.quote;
			out += "<tr role=\"row\" class=\"sub\">" +
				"<td class=\"c1\">" +
				"<span class='topbtnleft'>" +
				"<button class=\"hoverbtn hoverbtn-refresh\"><span class=\"glyphicon glyphicon-refresh\"></span></button></span>" +
				item.symbol +
				"</td><td class=\"c2\">" +
				item.LastTradePriceOnly+
				"</td><td class=\"c3\">" +
				item.Change+
				"</td><td class=\"c4\">" +
				item.PercentChange +
				"</td><td class=\"c5\">" +
				item.Ask +
				"</td><td class=\"c6\">" +
				item.Bid+
				"</td><td class=\"c7\">" +
				item.Open +
				"</td><td class=\"c8\">" +
				item.PreviousClose +
				"</td><td class=\"c9\">" +
				"<span class='topbtnright'>" +
				"<button class=\"hoverbtn hoverbtn-delete\"><span class=\"glyphicon glyphicon-remove\"></span></button></span>" +
				item.Volume+
				"</td></tr>";
			$(''+out+'').appendTo($("#addon"));

			$.post("savehistory.php", {Symbol:item.symbol, Price:item.LastTradePriceOnly, Change:item.Change,
					PercentChange: item.PercentChange, Ask:item.Ask, Bid:item.Bid,
					Open:item.Open, PreviousClose:item.PreviousClose, Volume:item.Volume}, 
					function(){});
			console.log(item.Change);
		});

		this.form.reset();
		event.preventDefault();
	});



	$('.sort-table').click(function(e) {
		// e.preventDefault();                   	// prevent default button click behaviour
		//console.log($(this).attr('class'));

		////var $tabletest  = $(this).parent().parent().parent();
		////var $tabletest  = $(this).closest('table');
		//console.log($tabletest);

		var sortAsc = $(this).hasClass('asc'),     	// ASC or DESC
		    $table  = $(this).closest('table'),     // cache the selected table DOM element
			$rows   = $('tbody > tr', $table),     	// cache all rows from the target table body
			selectcolumn = $(this).attr('title');

		$rows.sort(function(a, b) {
			var keyA = $('td.c'+selectcolumn, a).text();
			var keyB = $('td.c'+selectcolumn, b).text();

			if (sortAsc) {
				return (keyA > keyB) ? 1 : 0;     // A bigger than B, sorting ascending
			} else {
				return (keyA < keyB) ? 1 : 0;     // B bigger than A, sorting descending
			}
		});


		$rows.each(function(index, row){
			$table.append(row);                    // append rows after sort
		});

		if (sortAsc) {
			$(this).removeClass('asc');
			$(this).addClass('desc');
		} else {
			$(this).removeClass('desc');
			$(this).addClass('asc');
		}
	});

	/*	table delete one row*/
	// $(".hoverbtn-delete").click(function(){
	// 	$(this).parent().parent().remove();
	// });
	$(document.body).delegate(".hoverbtn-delete", "click", function(){
		$(this).closest("tr").remove();
	});

	/*	table refresh one row*/
	$(document.body).delegate(".hoverbtn-refresh", "click", function(){
		var thisrow0 = $(this).closest("tr.sub");

		var oldsearch = thisrow0.find("td:first")[0].innerText;

		var thisrow = $(this).parent().parent().parent();
		//console.log(thisrow);
		//console.log(thisrow[0].cells[8].innerHTML);
		//console.log(thisrow[0].cells[8].innerText);

		var yahhoapi2 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes" +
			"%20where%20symbol%20IN%20(\""+oldsearch+"\")&format=json&env=http://datatables.org/alltables.env";

		$.getJSON(yahhoapi2, function (jsondata) {
			var item = jsondata.query.results.quote;

			thisrow[0].cells[0].innerHTML = "<span class='topbtnleft'>" +
				"<button class=\"hoverbtn hoverbtn-refresh\"><span class=\"glyphicon glyphicon-refresh\"></span></button>" +
				"</span>" +item.symbol;
			thisrow[0].cells[1].innerHTML = item.LastTradePriceOnly;
			thisrow[0].cells[2].innerHTML = item.Change;
			thisrow[0].cells[3].innerHTML = item.PercentChange;
			thisrow[0].cells[4].innerHTML = item.Ask;
			thisrow[0].cells[5].innerHTML = item.Bid;
			thisrow[0].cells[6].innerHTML = item.Open;
			thisrow[0].cells[7].innerHTML = item.PreviousClose ;
			thisrow[0].cells[8].innerHTML = "<span class='topbtnright'>" +
				"<button class=\"hoverbtn hoverbtn-delete\"><span class=\"glyphicon glyphicon-remove\"></span></button>" +
				"</span>" +item.Volume;

			//thisrow[0].cells[8].innerText = item.Volume; /*the button will disappear after refresh*/
		});
	});
	
});
