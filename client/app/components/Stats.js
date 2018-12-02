import React, { Component } from "react";
import { getStd } from "./../utils/utils.js";

export class Stats extends Component {
    render() {
        const data = this.props.data;
        const sum = data.reduce((acc, val) => acc + val, 0);
        var avg;
        var std;
        if (data.length === 0) {
            avg = "No Data"
            std = "No Data"
        } else {
            avg = Math.round((sum / data.length) * 10) / 10;
            std = getStd(data);
        }
        return <div>Average: {avg} &nbsp; &nbsp; &nbsp; Standard Deviation: {std}</div>;
    }
}
