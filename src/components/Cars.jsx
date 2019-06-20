import React, { Component } from "react";

import { getCars,deleteCar } from "../services/carService";
import CarTable from "./CarTable";


class Cars extends Component {
  state = {
    cars: []
  };

  async componentDidMount() {
      const {data:cars}=await getCars();
    this.setState({ cars});
  }

  handleDelete = async car => {
    const originalCars = this.state.cars;
    const cars = originalCars.filter(c => c.CarNumber !== car.CarNumber);
    this.setState({ cars });
    try {
      await deleteCar(car.CarNumber);
    } catch (error) {
      if(error.response && error.response.status===404)
       console.log("error");
       
      this.setState({ cars:originalCars });
    }

  };


  render() {
    const { cars } = this.state;
    return (
      <div className="row">
          <CarTable
          cars={cars}
          onDelete={this.handleDelete}
          />
         
        </div>

    );
  }
}

export default Cars;
