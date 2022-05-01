var test;  // For checking "no-var"
var unused; // For checking "no-unused-vars"

// this is a comment
test = 1;
console.log(test);

for (let i = 0; i<5; i++){
  test=1+2; // For checking "space-infix-ops" and "indent"
}

//this is an inline comment to check "spaced-comment"
let semi = 5 // For checking "semi"

let a = 'nono'; // Both for checking "quotes" 
let b = `nonono`;

let c = do_something(test); // For checking "camelcase"

function do_something(test){
    let some_variable = test;
    return some_variable;
}

const constant = 1; // For checking "const-uppercase"

