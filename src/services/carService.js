import http from "./httpService";


  const apiUrl="http://localhost:3900/api";


const apiUrl1 = apiUrl + "/car";

export function getCars() {
  return http.get(apiUrl1);
}

export function deleteCar(CarNumber) {
  return http.delete(apiUrl1 + "/" + CarNumber);
}

export function getCar(CarNumber) {
  return http.get(apiUrl1 + "/" + CarNumber);
}

export function saveCar(car) {
  if (car._id) {
    const body = { ...car };
    delete body._id;
    return http.put(apiUrl1 + "/" + car._id, body);
  } else {
    return http.post(apiUrl1, car);
  }
}
