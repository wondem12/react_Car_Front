import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import CarDetails from "./components/CarDetails";
import CarForm from "./components/CarForm";
import DeleteCar from "./components/DeleteCar";
import Cars from "./components/Cars";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
        <Route path="/cars/:id" component={CarForm}/>
          <Route path="/CarDetails" component={CarDetails} />
          <Route path="/cars" component={Cars} />
          <Route path="/CarForm" component={CarForm} />
          <Route path="/DeleteCar" component={DeleteCar} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/cars" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
