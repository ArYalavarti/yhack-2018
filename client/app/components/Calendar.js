import React, { Component } from "react";
import { Grid, Form, Input, Icon, Button } from "semantic-ui-react";
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

const today = new Date();

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

const monthNames2 = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      input1: 0,
      input2: 0,
      input3: 0,
      curMonth: today.getMonth(),
      curYear: today.getFullYear(),
      startDate: this.setStartDate(today),
      endDate: this.getEndDate(today),
      values: this.getValues(today)
    };
    //Function binding
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shiftUp = this.shiftUp.bind(this);
    this.shiftDown = this.shiftDown.bind(this);
    this.setToday = this.setToday.bind(this);
  }

  shiftUp() {
    if (this.state.curYear < 2021) {
      if (this.state.curMonth == 11) {
        var newDate = new Date(this.state.curYear + 1, 0, 1);

        this.setState({
          curMonth: 0,
          curYear: this.state.curYear + 1,
          startDate: this.setStartDate(newDate),
          endDate: this.getEndDate(newDate),
          values: this.getValues(newDate)
        });
      } else {
        var newDate = new Date(this.state.curYear, this.state.curMonth + 1, 1);

        this.setState({
          curMonth: this.state.curMonth + 1,
          startDate: this.setStartDate(newDate),
          endDate: this.getEndDate(newDate),
          values: this.getValues(newDate)
        });
      }
    } else {
    }
  }

  setToday() {
    this.setState({
      curMonth: today.getMonth(),
      curYear: today.getFullYear(),
      startDate: this.setStartDate(today),
      endDate: this.getEndDate(today),
      values: this.getValues(today)
    });
  }

  shiftDown() {
    if (this.state.curMonth == 0 && this.state.curYear == 2018) {
    } else {
      if (this.state.curMonth == 0) {
        var newDate = new Date(this.state.curYear - 1, 11, 1);

        this.setState({
          curMonth: 11,
          curYear: this.state.curYear - 1,
          startDate: this.setStartDate(newDate),
          endDate: this.getEndDate(newDate),
          values: this.getValues(newDate)
        });
      } else {
        var newDate = new Date(this.state.curYear, this.state.curMonth - 1, 1);

        this.setState({
          curMonth: this.state.curMonth - 1,
          startDate: this.setStartDate(newDate),
          endDate: this.getEndDate(newDate),
          values: this.getValues(newDate)
        });
      }
    }
  }
  //Date Functions
  setStartDate(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    return new Date(year, month, 1);
  }

  getValues(date) {
    let mon = monthNames2[date.getMonth()];
    return this.props.data[date.getFullYear() - 2018][mon];
  }

  getEndDate(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    let d = new Date(year, month, 1);
    return this.shiftDate(d, this.getNumDays(month) - 1);
  }

  getNumDays(date) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(date + 1)) {
      return 31;
    } else if ([4, 6, 9, 11].includes(date + 1)) {
      return 30;
    } else {
      return 28;
    }
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

    let mon = monthNames2[this.state.curMonth];

    let cur2 = this.props.data;
    cur2[this.state.curYear - 2018][mon] = cur;

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
          setInStorage("the_main_app", {
            token: json.token,
            data: json.data,
            email: this.props.email
          });
          setTimeout(() => {
            this.setState({
              signInError: "",
              isLoading: false,
              token: json.token,
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

  componentDidMount() {}

  render() {
    return (
      <div className="mainContainer">
        <Icon
          onClick={this.shiftDown}
          link
          size="big"
          name="arrow circle left"
        />
        <Icon
          link
          size="big"
          onClick={this.shiftUp}
          name="arrow circle right"
        />
        <div className="month">
          {monthNames[this.state.curMonth]} {this.state.curYear}
        </div>
        <Button onClick={this.setToday} className="today-button">
          Today
        </Button>

        <div className="calendar-container">
          <CalendarHeatmap
            startDate={this.shiftDate(this.state.startDate, -1)}
            endDate={this.state.endDate}
            values={this.state.values}
            showMonthLabels={false}
            horizontal={false}
            showWeekdayLabels={true}
            showOutOfRangeDays={false}
            classForValue={value => {
              if (!value) {
                return "color-null";
              } else if (calcColor(value.colorData) == 0) {
                return "color-empty";
              }
              return `color-block-${calcColor(value.colorData)}`;
            }}
            tooltipDataAttrs={value => {}}
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
