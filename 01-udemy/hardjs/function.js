function greeUser(userName = "none") {
    console.log("hi", userName + "!");
}

greeUser();

function sumUp(...numbers) {
    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    console.log(sum);
    return sum;
}

sumUp(1123, 24214, 5234343, 49870789);
