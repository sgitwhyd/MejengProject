import { useState } from "react";
import Head from "next/head";

export default function index() {
  const [country, setCountry] = useState([]);

  const getCountries = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await res.json();
    setCountry(data);
  };

  return (
    <>
      <Head>
        <title>Edit Profile - Mejeng</title>
        <meta name="description" content="Login page Mejeng App " />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-24">
          <div>
            <h3>Username</h3>
            <input
              type="email"
              placeholder=""
              className="w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none "
            />
          </div>
          <div>
            <h3>Region</h3>
            <input
              type="email"
              placeholder=""
              className="w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none "
            />
          </div>
          <div>
            <h3>Country</h3>
            <select className="select-info select w-64 max-w-xs">
              <option disabled selected>
                Select language
              </option>
              <option>English</option>
              <option>Japanese</option>
              <option>Italian</option>
            </select>
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}
