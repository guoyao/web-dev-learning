(function () {
	function fibonacci(n) {
		return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
	}

	var start = new Date();
	console.log(fibonacci(40));
	console.log((new Date().getTime() - start.getTime()) / 1000);
})();
