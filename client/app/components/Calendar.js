import React, { Component } from "react";
import { Grid, Form, Input, Icon } from "semantic-ui-react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import Modal from "react-responsive-modal";
import InputRange from "react-input-range";

import "../../public/assets/Main.css";
import "../../public/assets/Blocks.css";
import "react-input-range/lib/css/index.css";

import "whatwg-fetch";
import { getFromStorage, setInStorage } from "./../utils/storage.js";


import { calcColor, getPhrase } from "./../utils/utils";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      input1: 0,
      input2: 0,
      input3: 0,
      startDate: this.setStartDate(),
      endDate: this.getEndDate(),
      values: props.data[0].dec
    };
    //Function binding
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Date Functions
  setStartDate() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    return new Date(year + 1, month, 1);
  }

  getEndDate() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    let d = new Date(year + 1, month, 1);

    return this.shiftDate(d, this.getNumDays(month));
  }

  getNumDays(date) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(date)) {
      return 31;
    } else if ([4, 6, 9, 11].includes(date)) {
      return 30;
    } else {
      return 29;
    }
  }

  getEmptyValues(date) {
    var n = 0;
    if ([1, 3, 5, 7, 8, 10, 12].includes(date.getMonth())) {
      n = 31;
    } else if ([4, 6, 9, 11].includes(date.getMonth())) {
      n = 30;
    } else {
      n = 29;
    }

    return this.getRange(n).map(index => {
      return {
        date: this.shiftDate(this.getStartDate(), index),
        colorValue: 0
      };
    });
  }

  getDateData(date) {
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  // Event handlers
  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false, input1: 0, input2: 0, input3: 0 });
  }

  handleSubmit(event) {
  
    let cur = this.state.values;
    cur[this.state.date - 1] = {
      date: cur[this.state.date - 1].date,
      colorData: [this.state.input1, this.state.input2, this.state.input3]
    };

    let cur2 = this.props.data
    cur2[0].dec = cur;

    console.log(cur2);

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.props.email,
        newData: cur2
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token, data: json.data, email: this.props.email });
          setTimeout(() => {
            this.setState({
              signInError: "",
              isLoading: false,
              token: json.token,
              data: json.data,
              email: this.props.email
            });
          }, 0);
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
    event.preventDefault();
  }

  // handleSubmit(event) {
  //   let cur = this.state.values;
  //   cur[this.state.date - 1] = {
  //     date: cur[this.state.date - 1].date,
  //     colorData: [this.state.input1, this.state.input2, this.state.input3]
  //   };
  //   this.setState({ values: cur });
  //   event.preventDefault();
  // }

  componentDidMount() {}

  render() {
    console.log(this.props.data);
    return (
      <div className="mainContainer">
        <Icon link size="big" name="arrow circle left" />
        <div className="calendar-container">
          <CalendarHeatmap
            startDate={this.shiftDate(this.state.startDate, -1)}
            endDate={this.state.endDate}
            values={this.state.values}
            showMonthLabels={false}
            horizontal={false}
            showWeekdayLabels={false}
            showOutOfRangeDays={false}
            classForValue={value => {
              let colorValue = calcColor(value.colorData);
              if (!value) {
                return "color-null";
              } else if (colorValue == 0) {
                return "color-empty";
              }
              return `color-block-${colorValue}`;
            }}
            tooltipDataAttrs={value => {
              return {
                "data-tip": `Day ${new Date(
                  value.date
                ).getDate()} : ${getPhrase(calcColor(value.colorData))}`
              };

              //   console.log(value);
              //   try {
              //     "data-tip": `Day ${value.date.getDate()} : ${getPhrase(
              //       value.colorValue
              //     )}` }
              // } catch (error) {
              //   console.log(error);
              //   }
            }}
            onClick={value => {
              if (value) {
                this.setState({
                  currentDate: this.getDateData(new Date(value.date))
                });
                this.setState({ date: new Date(value.date).getDate() });
                this.openModal();
              }
            }}
          />
        </div>
        <ReactTooltip />

        <Modal
          className="heroModal"
          open={this.state.show}
          onClose={this.closeModal}
          center
        >
          <h2 className="modalHeading">Update Mood!</h2>
          <div className="modalBody">
            <p> Update your mood for {this.state.currentDate} </p>
            <Form onSubmit={this.handleSubmit}>
              Happiness <br /> <br />
              <InputRange
                maxValue={10}
                minValue={0}
                value={this.state.input1}
                onChange={value => this.setState({ input1: value })}
              />
              <br />
              <br />
              Productivity <br />
              <br />
              <InputRange
                maxValue={10}
                minValue={0}
                value={this.state.input2}
                onChange={value => this.setState({ input2: value })}
              />
              <br />
              <br />
              Sleep <br />
              <br />
              <InputRange
                maxValue={10}
                minValue={0}
                value={this.state.input3}
                onChange={value => this.setState({ input3: value })}
              />
              <br />
              <br />
              <Input type="submit" value="Submit" />
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Calendar;
