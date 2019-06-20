import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { saveCar, getCar } from "../services/carService";

class CarForm extends Form {
  state = {
    data: {
        CarNumber: "",
        CarColor: "",
        CarYear: "",
        CarMonth: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    CarNumber: Joi.string()
      .required()
      .min(7)
      .max(7)
      .label("CarNumber"),
      CarColor: Joi.string()
      .required()
      .label("CarColor"),
      CarYear: Joi.number()
      .required()
      .label("CarYear"),
      CarMonth: Joi.number()
      .required()
      .max(12)
      .label("CarMonth")
   
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
      CarNumber: car.CarNumber,
      CarColor: car.CarColor,
      CarYear: car.CarYear,
      CarMonth: car.CarMonth
    };
  }
  doSubmit = async () => {
    await saveCar(this.state.data);
    this.props.history.push("/cars");
  };
  render() {
    return (
      <div>
        <h1>Car Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("CarNumber", "CarNumber")}
          {this.renderInput("CarColor", "CarColor")}
          {this.renderInput("CarYear", "CarYear", "number")}
          {this.renderInput("CarMonth", "CarMonth", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CarForm;
