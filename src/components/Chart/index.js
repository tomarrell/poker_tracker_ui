import React, { Component } from "react";
import PropTypes from "prop-types";
import Frappe from "frappe-charts/dist/frappe-charts.min.esm";

export default class Chart extends Component {
  componentDidMount() {
    const {
      title,
      data,
      type = "bar",
      height = 250,
      onSelect,
      ...rest
    } = this.props;

    this.c = new Frappe({
      parent: this.chart,
      title,
      data,
      type,
      height,
      is_navigatable: !!onSelect,
      ...rest
    });

    if (onSelect) {
      this.c.parent.addEventListener("data-select", onSelect);
    }
  }

  componentWillReceiveProps(props) {
    this.c.update_values(props.data.datasets, props.data.labels);
  }

  render() {
    return (
      <div
        ref={chart => {
          this.chart = chart;
        }}
      />
    );
  }
}

Chart.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.array.isRequired,
    labels: PropTypes.array
  }),
  title: PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.number,
  onSelect: PropTypes.func
};
