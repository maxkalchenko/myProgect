function weirdPromise (length) {
    return new Promise(function(resolve, reject) {
		if (length < 0) { 
			return reject(length + ' is < 0');
		}

		return resolve((function a(x){ // function sum(0 + ... + X)
			return x === 0 ? x : x + a(x - 1); // 0 is ok
		})(length));
	});
}


  
// chain of promises
	weirdPromise(4).then(function(sum) {
		//sum -= 11;
		return weirdPromise(sum);
	})
	
	.then(function(sum) {
		//sum *= -1;
		return weirdPromise(sum);
 	})
	
	.then(function(sum) {
 		console.log('chain:', sum);
		return sum; // to see at the end
 	})
	
	.catch(function(message) {
 	 	console.log('Something went wrong in chain:', message);
 	 	return message;
 	})
	
	.then(function(a) { // a = sum if catch doesn't work, else a = message
 		console.log('Always here', a);
	});

	
	
// promise all  
	Promise.all([weirdPromise(4), "to use this in then()", weirdPromise(3)])
	
	.then(function(a) {
		console.log('all: ', a);
 	})
	
	.catch(function(message) {
 	 	console.log('Something went wrong in all:', message);
 	 	return message;
	});


	
// fastest promise
	Promise.race([
		new Promise(function(resolve, reject) { 
			setTimeout(resolve, 300, 'first');
		}), 
	
		new Promise(function(resolve, reject) { 
			setTimeout(resolve, 200, 'second, but faster');
		})
	])
	
	.then(function(a) {
		console.log('race: ', a);
 	})
	
	.catch(function(message) {
 	   console.log('Something went wrong in race:', message);
 	   return message;
 	});

	
	
// all + race
	Promise.all([weirdPromise(1), weirdPromise(2), // some promise(s)
			
				Promise.race([
					new Promise(function(resolve, reject) { // + the faster one
						setTimeout(reject, 250, 'first'); // but second is faster 
					}), 
					
					new Promise(function(resolve, reject) { 
						setTimeout(resolve, 200, 'second, but faster');
					})
				])
			])
			
			.then(function(a) {
				console.log('all + race: ', a);
			})
			
			.catch(function(message) {
				console.log('Something went wrong in all:', message);
				return message;
	});

	
	
// all + chain (try 1-st promise, if it was rejected runs 2-nd)
	Promise.all([weirdPromise(1), // resolved promice
						
				(new Promise(function(resolve, reject) { // + one more 
						reject('first'); // always rejected
					})
					
					.then(function(a) {
						return a;
					})
					
					.catch(function(message) { // only for first one
						
						// if first one rejected try second 
						return new Promise(function(resolve, reject) { 
							resolve('second'); // always resolved
						})
						
						.then(function(a) {
							return a;
						})
					})
				)
			])
			
			.then(function(a) {
				console.log('all + chain: ', a);
			})
			
			.catch(function(message) {
				console.log('Something went wrong in all:', message);
				return message;
	});
