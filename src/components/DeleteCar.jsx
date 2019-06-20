import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { deleteCar, getCar } from "../services/carService";

class DeleteCar extends Form {
  state = {
    data: {
        CarNumber: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    CarNumber: Joi.string()
      .required()
      .min(7)
      .max(7)
      .label("CarNumber")
  };

  async popolateCar() {
    const CarNumber = this.props.match.params.CarNumber;   
    try {
      const { data: car } = await getCar(CarNumber);
      this.setState({ data: this.mapToViewModel(car) });
      
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.popolateCar();
  }
  mapToViewModel(car) {
    return {
      _id: car._id,
      CarNumber: car.CarNumber
    };
  }
  doSubmit = async () => {
    await deleteCar(this.state.data.CarNumber);
    this.props.history.push("/cars");
  };
  render() {
    return (
      <div>
        <h1>Delete Car</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("CarNumber", "CarNumber")}
          {this.renderButton("Delete")}
        </form>
      </div>
    );
  }
}

export default DeleteCar;
