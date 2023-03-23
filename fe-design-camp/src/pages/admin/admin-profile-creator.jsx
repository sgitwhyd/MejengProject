import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function AdminProfileCreator() {
  const [searchText, setSearchText] = useState("");

  const datas = [
    {
      name: "Ahmad Gito",
      region: "Sumatra",
      country: "Indonesia",
      postProject: "43 Project",
      totalView: "2999",
      totalLike: "200",
    },
    {
      name: "Nicko Fajar",
      region: "Papua",
      country: "Indonesia",
      postProject: "1 Project",
      totalView: "100",
      totalLike: "10",
    },
    {
      name: "Rizky Fajar",
      region: "Jawa",
      country: "Indonesia",
      postProject: "2 Project",
      totalView: "200",
      totalLike: "20",
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = datas.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <header className="text-xl font-bold">Profile Creator</header>
      <div className="mt-6 mb-2 flex items-center justify-end">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search creator name"
            className="input-bordered input input-sm w-full"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <BsSearch className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Creator Name
              </th>
              <th scope="col" className="px-6 py-3">
                Region &amp; Country
              </th>
              <th scope="col" className="px-6 py-3">
                Post Project
              </th>
              <th scope="col" className="px-6 py-3">
                Total View
              </th>
              <th scope="col" className="px-6 py-3">
                Total Like
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => {
              return (
                <tr key={data.name} className="border-b bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-4">
                    {data.region} - {data.country}
                  </td>
                  <td className="px-6 py-4">{data.postProject}</td>
                  <td className="px-6 py-4">{data.totalView}</td>
                  <td className="px-6 py-4">{data.totalLike}</td>
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr className="border-b bg-white">
                <td colSpan="5" className="px-6 py-4 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
