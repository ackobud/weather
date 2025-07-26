import axios, { AxiosResponse } from "axios";
import React, { JSX } from "react";

import { useForm } from "react-hook-form";

//nominatim.openstreetmap.org/reverse?lat=44.786568&lon=20.448921&

export const Home = (): JSX.Element => {
  const getAdress = (location: GeolocationPosition) => {
    const lat: number = location.coords.latitude;
    const long: number = location.coords.longitude;

    axios
      .get(
        "//nominatim.openstreetmap.org/reverse?lat=44.786568&lon=20.448921&format=json"
      )
      .then((response) => console.log(response.data.display_name));
  };

  const adressForbidden = () => console.log("We got rejected");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getAdress, adressForbidden);
  } else {
    console.log("Geo location not support");
  }

  const validCities: string[] = [
    "Beograd",
    "Subotica",
    "Novi Sad",
    "Zagreb",
    "Sarajevo",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isValidCityName = (name: string) => validCities.includes(name);

  const onFormSubmit = (data: object) => console.log("WORKS");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input
        {...register("cityName", {
          validate: isValidCityName,
        })}
        type="text"
        placeholder="Unesite ime grada"
      />
    </form>
  );
};
