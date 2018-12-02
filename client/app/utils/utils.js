export function calcColor(inputs) {
  var sum = inputs.reduce(adder);

  var average = Math.round(sum / inputs.length);

  var hue = 360 - (average * 26);

  return hue;
  }

  function adder(total, value, index, array) {
    return parseInt(total) + parseInt(value);
}

export function getPhrase(colorValue) {
  var phrase;
  if (colorValue === 0) {
    phrase = "Have a nice day!"
  } else if (colorValue <= 126) {
    phrase = "Excellent";
  } else if (colorValue <= 152) {
    phrase = "Amazing";
  } else if (colorValue <= 178) {
    phrase = "Great";
  } else if (colorValue <= 204) {
    phrase = "Good";
  } else if (colorValue <= 230) {
    phrase = "Fair";
  } else if (colorValue <= 256) {
    phrase = "Acceptable";
  } else if (colorValue <= 282) {
    phrase = "Fine";
  } else if (colorValue <= 308) {
    phrase = "Satisfactory";
  } else if (colorValue <= 334) {
    phrase = "Tolerable";
  } else {
    phrase = "Poor";
  } 
  return phrase;
  }

  export function initializeData(year) {
    var leapYear = year % 4 == 0;
  
    var january = makeMonth(year, 0, 31);
    var february = makeMonth(year, 1, leapYear ? 29 : 28);
    var march = makeMonth(year, 2, 31);
    var april = makeMonth(year, 3, 30);
    var may = makeMonth(year, 4, 31);
    var june = makeMonth(year, 5, 30);
    var july = makeMonth(year, 6, 31);
    var august = makeMonth(year, 7, 31);
    var september = makeMonth(year, 8, 30);
    var october = makeMonth(year, 9, 31);
    var november = makeMonth(year, 10, 30);
    var december = makeMonth(year, 11, 31);
  
    return {
        jan: january,
        feb: february,
        mar: march,
        apr: april,
        may: may,
        jun: june,
        jul: july,
        aug: august,
        sep: september,
        oct: october,
        nov: november,
        dec: december}
  
  }
  
  function makeMonth(year, month, days) {
    var dates = []
  
    for (var i = 1; i < days + 1; i++) {
        dates.push({
            date: new Date(year, month, i),
            colorData: [-1, -1, -1]});
    }
    return dates;
  }
  