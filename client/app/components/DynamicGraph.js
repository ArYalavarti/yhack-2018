import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line';
import { Button } from "semantic-ui-react";
import InputRange from "react-input-range";
import { Stats } from "./Stats";
import { retrieveData } from "./../utils/utils.js";

import "../../public/assets/Main.css";


const times = ["Day", "Week", "Year"];

const daily =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        },
        {
          "x": "3",
          "y": "6"
        },
        {
          "x": "4",
          "y": "5"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const sundays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const mondays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const tuesdays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "3",
          "y": "9"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const wednesdays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "3",
          "y": "6"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const thursdays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const fridays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const saturdays =
  [[
    {
      "id": "Overall",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ], [
    {
      "id": "Happiness",
      "color": "hsl(360, 100%, 50%)",
      "data": [
        {
          "x": "1",
          "y": "5"
        },
        {
          "x": "2",
          "y": "8"
        }
      ]
    }
  ],
  [
    {
      "id": "Sleep",
      "color": "hsl(280, 100%, 50%)",
      "data": [
        {
          "x": "2",
          "y": "4"
        },
        {
          "x": "3",
          "y": "5"
        }
      ]
    }
  ],
  [
    {
      "id": "Productivity",
      "color": "hsl(200, 100%, 50%)",
      "data": [
        {
          "x": "4",
          "y": "6"
        },
        {
          "x": "5",
          "y": "7"
        }
      ]
    }
  ]
  ]

const weekly = [sundays, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays];

//const timeData = [daily, weekly];
const timeNames = ["Daily", "Weekly"];
const valueNames = ["Overall", "Happiness", "Productivity", "Sleep"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

class DynamicGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeIndex: 0,
      valueIndex: 0,
      dayIndex: 0
    };
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleTimeClick = this.handleTimeClick.bind(this);
  }

  handleValueClick() {
    var newValueIndex = (this.state.valueIndex + 1) % valueNames.length;
    this.setState({ valueIndex: newValueIndex });
  }

  handleTimeClick() {
    var newTimeIndex = (this.state.timeIndex + 1) % timeNames.length
    this.setState({ timeIndex: newTimeIndex });
  }

  componentDidMount() {}

  render() {

    if (this.props.years) {
      const timeData = retrieveData(this.props.currentMonth, this.props.years);
      const graphData = collectData(this.state.timeIndex, this.state.dayIndex, this.state.valueIndex)[0];
      const parsedData = graphData.data.map((point) => parseInt(point.y));
  
      function collectData(timeIndex, sliderIndex, valueIndex) {
        if (timeIndex === 0) {
          return timeData[timeIndex][valueIndex];
        } else {
          return timeData[timeIndex][sliderIndex][valueIndex];
        }
      }  
    

    return (
      <div className="mainContainer">
        <div className="uiContainer">
          <div className="buttonsContainer">
            <Button onClick={this.handleValueClick}>
              {valueNames[this.state.valueIndex]}
            </Button>

            <Button onClick={this.handleTimeClick}>
              {timeNames[this.state.timeIndex]}
            </Button>
          </div>
          <div className="slider">
            <InputRange
              maxValue={6}
              minValue={0}
              formatLabel={value => dayNames[value]}
              value={this.state.dayIndex}
              onChange={value => this.setState({ dayIndex: value })}
            />
          </div>

        </div>

        <div className="graph-container">
          <Stats data={parsedData} />
          <ResponsiveLine
            data={collectData(this.state.timeIndex, this.state.dayIndex, this.state.valueIndex)}
            margin={{
              "top": 50,
              "right": 110,
              "bottom": 50,
              "left": 60
            }}
            xScale={{
              "type": "point"
            }}
            yScale={{
              "type": "linear",
              "stacked": true,
              "min": "0",
              "max": "10"
            }}
            lineWidth={3}
            minY="auto"
            maxY="auto"
            stacked={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              "orient": "bottom",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": timeNames[this.state.timeIndex],
              "legendOffset": 36,
              "legendPosition": "middle"
            }}
            axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": valueNames[this.state.valueIndex],
              "legendOffset": -40,
              "legendPosition": "middle"
            }}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={true}
            dotLabel="y"
            dotLabelYOffset={-12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </div>
    );
          }
  }
}

export default DynamicGraph;