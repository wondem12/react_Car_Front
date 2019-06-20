import React, { Component } from "react";
import SearchBox from './searchBox'
import { getCars,deleteCar } from "../services/carService";
import CarTable from "./CarTable";


class CarDetails extends Component {
  state = {
    cars: [],
    searchQuery:"",
  };

  async componentDidMount() {
      const {data:cars}=await getCars();
    this.setState({ cars});
  }
  handleSearch = query =>{
    this.setState({ searchQuery: query});
  }

  getPageData = () =>{
    const {searchQuery, cars: allCars} = this.state;
    let filtered = allCars;
    if(searchQuery)
    filtered = allCars.filter(c=>
     c.CarNumber.toLowerCase().startsWith(searchQuery.toLowerCase())
     );
  return {data:filtered}
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
    const { searchQuery } = this.state;
    const {data:cars} = this.getPageData()
    return (
      <div className="row">
       <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <CarTable
          cars={cars}
          />
         
        </div>

    );
  }
}

export default CarDetails;
