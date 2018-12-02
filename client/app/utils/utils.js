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

function isNum(args) {
  args = args.toString();
  if (args.length == 0) return false;
  for (var i = 0; i < args.length; i++) {
    if ((args.substring(i, i + 1) < "0" || args.substring(i, i + 1) > "9") && args.substring(i, i + 1) != "." && args.substring(i, i + 1) != "-") {
      return false;
    }
  }
  return true;
}
//calculate the mean of a number array
function mean(arr) {
  var len = 0;
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "") { }
    else if (!isNum(arr[i])) {
      alert(arr[i] + " is not number!");
      return;
    }
    else {
      len = len + 1;
      sum = sum + parseFloat(arr[i]);
    }
  }
  return sum / len;
}

function variance(arr) {
  var len = 0;
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "") { }
    else if (!isNum(arr[i])) {
      alert(arr[i] + " is not number, Variance Calculation failed!");
      return 0;
    }
    else {
      len = len + 1;
      sum = sum + parseFloat(arr[i]);
    }
  }
  var v = 0;
  if (len > 1) {
    var mean = sum / len;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == "") { }
      else {
        v = v + (arr[i] - mean) * (arr[i] - mean);
      }
    }
    return v / len;
  }
  else {
    return 0;
  }
}

export function getStd(array) {
  return Math.round(Math.sqrt(variance(array)) * 10) / 10;
}

export function retrieveData(currentMonth, years) {
  return [getDaily(currentMonth, years), getWeekly(currentMonth, years)];
}

function getDaily(currentMonth, years) {
  return [getParameter(currentMonth, 0, years), getParameter(currentMonth, 1, years), getParameter(currentMonth, 2, years), getParameter(currentMonth, 3, years)];
}

function getParameter(currentMonth, index, years) {
  var parameter;
  var hue = 360 - 50 * index
  switch (index) {
    case 0:
      parameter = "Overall";
      break;
    case 1:
      parameter = "Happiness";
      break;
    case 2:
      parameter = "Productivity";
      break;
    case 3:
      parameter = "Sleep";
      break;
    default:
      break;

  }

  return [{
    "id": parameter,
    "color": "hsl(" + hue + ", 100%, 50%)",
    "data": getDailyData(currentMonth, index, years)
  }]
}

function getDailyData(currentMonth, index, years) {

  function getPoint(day) {

    if (index === 0) {
      return {
        "x": (new Date(day.date)).getDate(),
        "y": Math.round((day.colorData.reduce((p, c) => p + c, 0) / day.colorData.length) * 10) / 10
      }
    } else if (index === 1) {
      return {
        "x": (new Date(day.date)).getDate(),
        "y": Math.round((day.colorData[0]) * 10) / 10
      }
    } else if (index === 2) {
      return {
        "x": (new Date(day.date)).getDate(),
        "y": Math.round((day.colorData[1]) * 10) / 10
      }
    } else {
      return {
        "x": (new Date(day.date)).getDate(),
        "y": Math.round((day.colorData[2]) * 10) / 10
      }
    }
  }

  var year = Math.floor(currentMonth / 12);
  var month = currentMonth % 12;
  var monthData;

  switch (month) {
    case 0:
      monthData = years[year].jan
      break;
    case 1:
      monthData = years[year].feb
      break;
    case 2:
      monthData = years[year].mar
      break;
    case 3:
      monthData = years[year].apr
      break;
    case 4:
      monthData = years[year].may
      break;
    case 5:
      monthData = years[year].jun
      break;
    case 6:
      monthData = years[year].jul
      break;
    case 7:
      monthData = years[year].aug
      break;
    case 8:
      monthData = years[year].sep
      break;
    case 9:
      monthData = years[year].oct
      break;
    case 10:
      monthData = years[year].nov
      break;
    case 11:
      monthData = years[year].dec
      break;
    default:
      break;
  }

  return monthData.filter((day) => day.colorData[0] !== -1).map(getPoint);
}


function getWeekly(currentMonth, years) {
  var data = getDaily(currentMonth, years)

  function getWeekday(index, object) {
    var year = Math.floor(currentMonth / 12) + 2018;
    var newData = object[0].data.filter((point) => {
      var currentDate = new Date(year, currentMonth % 12, parseInt(point.x));
      return currentDate.getDay() == index;
    })
    return [{
      "id": object[0].id,
      "color": object[0].color,
      "data": newData
    }];
  }

  return [
    data.map((obj) => getWeekday(0, obj)),
    data.map((obj) => getWeekday(1, obj)),
    data.map((obj) => getWeekday(2, obj)),
    data.map((obj) => getWeekday(3, obj)),
    data.map((obj) => getWeekday(4, obj)),
    data.map((obj) => getWeekday(5, obj)),
    data.map((obj) => getWeekday(6, obj))
  ]
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
    dec: december
  }

}

function makeMonth(year, month, days) {
  var dates = []

  for (var i = 1; i < days + 1; i++) {
    dates.push({
      date: new Date(year, month, i),
      colorData: [-1, -1, -1]
    });
  }
  return dates;
}
