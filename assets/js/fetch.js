gamePivot = [];

fetch('JSON/ready.json').then((res)=>{
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	 for(let i = 0; i < res.length; i++) {
	 	let frame = res[i]['frame'];
	 	let size = res[i]['spriteSourceSize'];
	 	arr.push([frame,size])
	 }
	 gamePivot['_ready'] = arr;		    
})


fetch('JSON/kicker.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_kicker'] = arr;
})

fetch('JSON/keeper_idle.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_keeper_idle'] = arr;
})


fetch('JSON/keeper_left.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_keeper_left'] = arr;
})

fetch('JSON/keeper_center.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_keeper_center'] = arr;
})


fetch('JSON/keeper_right.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_keeper_right'] = arr;
})


fetch('JSON/effect_block.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_effect_block'] = arr;
})


fetch('JSON/effect_goal.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_effect_goal'] = arr;
})

fetch('JSON/signal01.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_signal_01'] = arr;
})

fetch('JSON/signal02.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_signal_02'] = arr;
})

fetch('JSON/signal03.json').then((res) => {
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	for(let i = 0; i < res.length; i++) {
		let frame = res[i]['frame'];
		let size = res[i]['spriteSourceSize'];
		arr.push([frame,size])
	} 

	gamePivot['_signal_03'] = arr;
})

fetch('JSON/btnsounds.json').then((res)=>{
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	 for(let i = 0; i < res.length; i++) {
	 	let frame = res[i]['frame'];
	 	let size = res[i]['spriteSourceSize'];
	 	arr.push([frame,size])
	 }
	 gamePivot['pivot_btnsounds'] = arr;		    
})
