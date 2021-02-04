let activeTable = 1;
	$('.tab-p-2').click(function(){
		$('.tab-btn').removeClass('active');
		$(this).addClass('active');
		$('.tabs-col').removeClass('active-tab');
		$('.tab-c-2').addClass('active-tab')
		$('.pattern-table').html('')
		table_one('keeper');
		activeTable = 2;


	})
	$('.tab-p-3').click(function(){
		$('.tab-btn').removeClass('active');
		$(this).addClass('active');
		$('.tabs-col').removeClass('active-tab');
		$('.tab-c-3').addClass('active-tab')
		$('.pattern-table').html('')
		table_one('goal');
		activeTable = 3;
	})

	$('.tab-p-1').click(function(){
		$('.tab-btn').removeClass('active');
		$(this).addClass('active');
		$('.tabs-col').removeClass('active-tab');
		$('.tab-c-1').addClass('active-tab')
		$('.pattern-table').html('')
		table_one('kicker');
		activeTable = 1;
	})

	let lastRound = 0;
	let todayData = [];
	let apiRecord = 'https://adminbet365.com';
	// let apiRecord = 'http://127.0.0.1:8000';
	let tableOnProcess = false;

	var targetTime = new Date();
	var timeZone = +9.00; //time zone value from database
	var tzDifference = timeZone * 60 + targetTime.getTimezoneOffset();
	var today = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

	let hour = today.getHours() * 60;
	let min = today.getMinutes();
	let roundFetch = hour + min;


	fetch(apiRecord+'/api/soccer/get-result/limit/'+roundFetch).then((res)=>{
		return res.json();
	}).then((data) => {
		todayData = data;
		lastRound = data[0]['round'];
		table_one('kicker');
	})



	setInterval(function(){
		var TT = new Date();
		var TZ = +9.00; //time zone value from database
		var TD = TZ * 60 + TT.getTimezoneOffset();
		var time = new Date(TT.getTime() + TD * 60 * 1000);
		var sec = time.getSeconds();
		if (sec == 6) {

			fetch(apiRecord+'/api/soccer/get-result/limit/1').then((res)=>{
				return res.json();
			}).then((data) => {
				if (lastRound != data[0]['round']) {
					todayData.unshift(data[0]);
					lastRound = data[0]['round'];
					$('.pattern-table').html('')
					if (activeTable  == 1) {
						table_one('kicker');
					} else if(activeTable == 2) {
						table_one('keeper');
					} else if(activeTable == 3) {
						table_one('goal');
					}
					
				}
			})
		}
	},1000)


	function table_one(compare1) {
		if (todayData.length > 0) {
			let lastWin = null;
			let rowCount = 0;
			let red = 0;
			let blue = 0;
			let rowY = 1;
			let rowYArr = [];
			let w = 0;

			let MaxBlueY = 0;
			let MaxRedY = 0;

			let blueY = 1;
			let redY = 1;

			for(let x = todayData.length  - 1; x >= 0; x--) { // LOOP.

				if (todayData[x]['round'] != 1440) {

					let res,name1,name2;

					if (compare1 == 'kicker') {
						res = todayData[x]['kicker'];
						name1 = '좌';
						name2 = '우';
					} else if (compare1 == 'keeper') {
					 	res = todayData[x]['keeper'];
					 	name1 = '좌';
					 	name2 = '우';
					} else if (compare1 == 'goal') {
						res = todayData[x]['goal'];
						name1 = '골';
						name2 = '노골';
					}

					
					if (lastWin == res) {
						if (res == 0) { 
							append_table_child(1,todayData[x]['round'],name1,name1)
							redY++
							red++;
						} else {
							append_table_child(2,todayData[x]['round'],name1,name2)
							blue++;
							blueY++;
						}
						rowY++;

					} else  {
						if (res == 0) { 
							append_table_parent(1,todayData[x]['round'],name1,name1)
							redY++
							red++;
						} else {
							append_table_parent(2,todayData[x]['round'],name1,name2)
							blueY++;
							blue++;
						}

						if (blueY > MaxBlueY) {
							MaxBlueY = blueY;
						}


						if (redY > MaxRedY) {
							MaxRedY = redY;
						}

						blueY = 1;
						redY = 1;

						rowCount++;
						rowYArr.push(rowY);
						append_table_down_parent(rowCount);
						lastWin = res
						rowY = 1;

						w += 35;
						$('.pattern-table').css({'width' : w})
					}
				}

			} // END OF LOOP
			setTimeout(function(){
				$('#t3').html('')
				for(x = 0; x < rowYArr.length; x++) {
					if ((x + 1) < rowYArr.length) {
						append_table_down_interval(rowYArr[x + 1])
					} else {
						append_table_down_interval($('#t1 dl').last().find('dd').length)
						$('.pattern-table-wrapper').animate({scrollLeft: $('.pattern-table-wrapper').width() * 100}, 0);
					}
				}

				let Rpercent = (red / (red + blue)) * 100;
				let Bpercent = (blue / (red + blue)) * 100;
				$('.redPercent').html(Math.round(Rpercent));
				$('.bluePercent').html(Math.round(Bpercent));

				$('.total-red').html(red+'번')
				$('.total-blue').html(blue+'번')
				$('.max-red').html(MaxRedY+'연속')
				$('.max-blue').html(MaxBlueY+'연속')
			})

		}

	}

	document.addEventListener("visibilitychange", function() {
	      if (!document.hidden) {
	      	var TT = new Date();
	      	var TZ = +9.00; //time zone value from database
	      	var TD = TZ * 60 + TT.getTimezoneOffset();
	      	var time = new Date(TT.getTime() + TD * 60 * 1000);
	      	var sec = time.getSeconds();
	      	let missedRound = ((time.getHours() * 60) + time.getMinutes()) - todayData.length;
	      	if (missedRound > 0) {
	      		fetch(apiRecord+'/api/get-result/limit/'+missedRound).then((res)=>{
	      			return res.json();
	      		}).then((data) => {
	      			for(let x = data.length - 1; x <= 0; x--) {
	      				todayData.unshift(data[x]);
	      			}
	      			$('.pattern-table').html('')
	      			if (activeTable  == 1) {
	      				table_one('kicker');
	      			} else if(activeTable == 2) {
	      				table_one('keeper');
	      			} else if(activeTable == 3) {
	      				table_one('goal');
	      			}
	      		})
	      	}

	      }
	});
	      
	      


	function append_table_parent(type,round,name1,name2) {
		if (type == 1) {
			$('#t1').append('<dl class="float-left">'+
								'<dt><span class="text-blue">'+name1+'</span></dt>'+
			  					'<dd>'+
			  						'<div class="circle-blue circle">'+round+'</div>'+
			  					'</dd>'+
							'</dl>');
		} else {
			$('#t1').append('<dl class="float-left">'+
								'<dt><span class="text-red">'+name2+'</span></dt>'+
			  					'<dd>'+
			  						'<div class="circle-red circle">'+round+'</div>'+
			  					'</dd>'+
							'</dl>');
		}
	}

	function append_table_child(type,round) {
		if (type == 1) {
			$('#t1').find('dl').last().append('<dd><div class="circle-blue circle">'+round+'</div></dd>')
		} else {
			$('#t1').find('dl').last().append('<dd><div class="circle-red circle">'+round+'</div></dd>')
		}
	}


	function append_table_down_interval(rowY) {

			$('#t3').append('<dl><dd>'+rowY+'</dd></dl>');

	}


	function append_table_down_parent(row_no) {

			$('#t2').append('<dl><dd>'+row_no+'</dd></dl>');

	}
