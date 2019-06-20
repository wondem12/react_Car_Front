import React, { Component } from "react";
import Table from "./table";

class MoviesTable extends Component {
  columns = [
    { path: "CarNumber", label: "CarNumber" },
    { path: "CarColor", label: "CarColor" },
    { path: "CarYear", label: "CarYear" },
    { path: "CarMonth", label: "CarMonth" }, {
      key: "delete",
      content: car => (
        <button
          onClick={() => this.props.onDelete(car)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { cars } = this.props;
    return <Table columns={this.columns} data={cars} />;
  }
}

export default MoviesTable;
