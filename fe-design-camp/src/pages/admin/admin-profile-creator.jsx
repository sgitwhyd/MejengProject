import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";

export default function AdminProfileCreator() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const datas = [
    {
      name: "Ahmad Gito",
      region: "Sumatra",
      country: "Indonesia",
      postProject: "43 Project",
      totalView: "2999",
      totalLike: "200",
      status: true,
      totalReport: 20,
    },
    {
      name: "Nicko Fajar",
      region: "Papua",
      country: "Indonesia",
      postProject: "1 Project",
      totalView: "100",
      totalLike: "10",
      status: false,
      totalReport: 90,
    },
    {
      name: "Rizky Fajar",
      region: "Jawa",
      country: "Indonesia",
      postProject: "2 Project",
      totalView: "200",
      totalLike: "20",
      status: true,
      totalReport: 0,
    },
  ];

  const tableHeader = [
    "Creator Name",
    "Region & Country",
    "Post Project",
    "Total View",
    "Total Like",
    "Status",
    "Total Report",
    "Action",
  ];

  const handleModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = datas.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="relative h-full">
      <header className="text-xl font-bold">Profile Creator</header>
      <div
        className={`mt-6 mb-2 flex items-center justify-end ${
          isModalOpen && "blur-sm"
        }`}
      >
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
      <div
        className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
          isModalOpen && "blur-sm"
        }`}
      >
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              {tableHeader.map((header) => {
                return (
                  <th
                    key={header}
                    scope="col"
                    className="whitespace-nowrap px-6 py-3"
                  >
                    {header}
                  </th>
                );
              })}
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
                  <td className="px-6 py-4">
                    {data.status ? (
                      <button className="btn-success btn-xs btn">Active</button>
                    ) : (
                      <button className="btn-error btn-xs btn">Disable</button>
                    )}
                  </td>
                  <td className="px-6 py-4">{data.totalReport}</td>
                  <td className="px-6 py-4">
                    <button
                      className="btn-error btn-sm btn gap-2"
                      onClick={() => handleModal(data)}
                    >
                      <MdReportProblem />
                      Ban Creator
                    </button>
                  </td>
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
      {isModalOpen && (
        <div className="absolute inset-0 z-[99] mx-auto my-auto  h-[300px] w-[478px] rounded-2xl  border bg-white shadow-lg drop-shadow-xl">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <label
              className="btn-sm btn-circle btn absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </label>
            <h1 className="text-lg font-bold">
              Are you sure to ban this creator?
            </h1>
            <p>Creator Name : {modalData.name}</p>
            <p>Reason Ban : Karena ...</p>
            <div className="mt-3 flex gap-4">
              <button
                className="btn-error btn-sm btn text-white"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-success btn-sm btn text-white">Yes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
