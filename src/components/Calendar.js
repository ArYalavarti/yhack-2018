import React, { Component } from "react";
import { Grid, Form, Input } from "semantic-ui-react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import Modal from "react-responsive-modal";

import "./../assets/Main.css";
import "./../assets/Blocks.css";

import {calcColor} from "./../utils/utils";

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

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      values: this.getEmptyValues(this.getStartDate())
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state);
  }

  getStartDate() {
    return new Date(2018, 11, 1);
  }

  getEndDate() {
    return new Date(2018, 11, 31);
  }

  getEmptyValues(date) {
    var n = 0;
    if ([1, 3, 5, 7, 8, 10, 12].includes(date.getMonth() + 1)) {
      n = 31;
    } else if ([4, 6, 9, 11].includes(date.getMonth() + 1)) {
      n = 30;
    } else {
      n = 29;
    }

    let x = this.getRange(n).map(index => {
      console.log(this.shiftDate(this.getStartDate(), index));
      return {
        date: this.shiftDate(this.getStartDate(), index),
        colorValue: 0
      };
    });
    console.log(x);
    return x;

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

  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    let cur = this.state.values;
    cur[this.state.date - 1] = {
      date: cur[this.state.date - 1].date,
      colorValue: calcColor([
        this.state.input1,
        this.state.input2,
        this.state.input3
      ])
    };
    console.log(cur);
    this.setState({ values: cur });
    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    console.log(this.state.values);
    return (
      <div className="mainContainer">
        <Grid>
          <div className="calendar-container">
            <CalendarHeatmap
              startDate={this.shiftDate(this.getStartDate(), -1)}
              endDate={this.state.endDate}
              values={this.state.values}
              showMonthLabels={false}
              showOutOfRangeDays={true}
              classForValue={value => {
                if (!value) {
                  return "color-null";
                } else if (value.colorValue == 0) {
                  return "color-empty";
                }
                return `color-block-${value.colorValue}`;
              }}
              tooltipDataAttrs={value => {
              }}
              onClick={value => {
                console.log(value);
                if (value) {
                  this.setState({ currentDate: this.getDateData(value.date) });
                  this.setState({ date: value.date.getDate() });
                  this.openModal();
                }
              }}
            />
          </div>
          <ReactTooltip />

          <Modal open={this.state.show} onClose={this.closeModal} center>
            <h2 className="modalHeading">Update Mood!</h2>
            <p> Update your mood for {this.state.currentDate} </p>
            <Form onSubmit={this.handleSubmit}>
              <label>
                Input1:
                <Input type="text" name="input1" onChange={this.handleChange} />
              </label>
              <label>
                Input2:
                <Input type="text" name="input2" onChange={this.handleChange} />
              </label>
              <label>
                Input3:
                <Input type="text" name="input3" onChange={this.handleChange} />
              </label>

              <Input type="submit" value="Submit" />
            </Form>
          </Modal>
        </Grid>
      </div>
    );
  }
}

export default Calendar;
