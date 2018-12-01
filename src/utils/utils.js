export function calcColor(inputs) {
  var sum = inputs.reduce(adder);
  var average = sum / inputs.length;

  var hue = 360 - (average * 26);
  return hue;
  }

  function adder(total, value, index, array) {
    return total + value;
}