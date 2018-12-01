import React, { Component } from "react";
import { Grid, Form, Input} from "semantic-ui-react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import Modal from "react-responsive-modal";

import "./../assets/Main.css";

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
      values: this.getValues()
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getStartDate() {
    return new Date("2018-12-01");
  }

  getEndDate() {
    return new Date("2018-12-31");
  }

  getValues() {
    return this.getRange(31).map(index => {
      return {
        date: this.shiftDate(today, index),
        count: 0
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

  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let cur = this.state.values;
    cur[this.state.date] = {
      date: cur[this.state.date].date,
      count: parseInt(this.state.value)
    }
    
    
    

    this.setState({values: cur});
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
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              values={this.state.values}
              showOutOfRangeDays={true}
              classForValue={value => {
                if (!value) {
                  return "color-null";
                } else if (value.count == 0) {
                  return "color-empty";
                }
                return `color-gitlab-${value.count}`;
              }}
              tooltipDataAttrs={value => {}}
              onClick={value => {
                this.setState({ currentDate: this.getDateData(value.date) });
                this.setState({ date: value.date.getDate() });
                this.openModal();
              }}
            />
          </div>
          <ReactTooltip />

          <Modal open={this.state.show} onClose={this.closeModal} center>
            <h2 className="modalHeading">Update Mood!</h2>
            <p> Update your mood for {this.state.currentDate} </p>
            <Form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
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
