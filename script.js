var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
var rows = 20;
var currentNumber = 2;

function build_grid($, primes){
	primes.forEach(function(item){
		$('#grid').append('<div class="item head">'+item+'</div>'); 
	});
	
	for(var i=0;i<rows;i++){
		primes.forEach(function(item){
			$('#grid').append('<div class="item"></div>'); 
		});	
	}

	$('#grid').css("width", (primes.length*20) + 'px' );
	$('#header').css("width", (primes.length*20) + 'px' );

	setTimeout(render_and_increment, 500);

}

function get_prime_box(theprime, number){
	//NOTE this function accepts and returns numbers that start
	//counting at 1 (NOT ZERO)
	var i = 0;
	for(i=0; i<(primes.length); i++){
		if(primes[i]===theprime){
			break;
		}
	}
	//increment i because this function does not count from zero.
	i++;
	var childindex =  i + (number*primes.length);
	return $( "#grid div:nth-child("+childindex+")" );
}

function prime_factorization(number, result) {
  var result = (result || []);
  var root = Math.sqrt(number);
  var x = 2;

  if (number % x) {
    x = 3;

    while ((number % x) && ((x = (x + 2)) < root)) {}
  }

  x = (x <= root) ? x : number;

  result.push(x);

  return (x === number) ? result : prime_factorization((number / x), result);
};

function set_prime_factors_as_active(primefactors){
	var i = 0;
	var lastvalue = -1;
	var depth = 1;
	for (i=0; i < primefactors.length; i++){
		if(lastvalue === primefactors[i]){
			depth++;
		}
		else{
			depth = 1;
		}
		if(primefactors[i] <= primes[primes.length-1]){
			//only try to render the box if the number is in the grid
			get_prime_box(primefactors[i], depth).addClass('active');
		}
		lastvalue = primefactors[i];
	}
}

function render_and_increment(){
	//render current number in counter
	$('#currentnumber .number').text(currentNumber);

	//take prime factorization of current number
	var primefactors = prime_factorization(currentNumber);
	$('#currentnumber .factors').text(JSON.stringify(primefactors));

	//set all active to used
	$('#grid').find('.active').addClass('used').removeClass('active');

	
	//set all prime factors as active
	set_prime_factors_as_active(primefactors);

	//increment the current number
	currentNumber++;

	//set a timer to run the next count
	setTimeout(render_and_increment, 1000);
}

$( document ).ready(function() {
    build_grid($, primes);
});