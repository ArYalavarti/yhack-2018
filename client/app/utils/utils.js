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