var unused; // For checking "no-unused-vars"
var test;  // For checking "no-var"

test = 1;

//this is an inline comment to check "spaced-comment"
let semi = 5 // For checking "semi"

let a = 'nono'; // Both for checking "quotes"
let b = `nonono`;

for (let i = 0; i < 5; i++){
  test=1+2; // For checking "space-infix-ops" and "indent"
}

let c = do_something(test); // For checking "camelcase"

function do_something(test){
    this.test = test;
}

function car(model){
    this.model = model;
}

const CAR = new car("Honda Civic"); // For checking "new-cap"
