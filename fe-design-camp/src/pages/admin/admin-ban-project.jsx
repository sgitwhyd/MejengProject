import React, { useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectAdmin } from "@/store/admin/admin.selector";
import { bannProject } from "@/store/admin/admin.action";
import { fetchReportedProjects } from "@/store/admin/admin.action";

import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import Table from "@/components/table";

export default function AdminBanProject() {
  let ammountInappropriate = 0;
  let ammountSensitive = 0;
  let ammountPlagiarism = 0;

  const dispatch = useDispatch();
  const [isModalBanOpen, setIsModalBanOpen] = useState(false);
  const [isModalDetailReportOpen, setIsModalDetailReportOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState({});

  const { reportedProjects, loading } = useSelector(selectAdmin);

  const handleBanProject = async (id) => {
    await dispatch(bannProject(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        SuccessToast(res.payload.message);
      } else {
        ErrorToast(res.payload.message);
      }
      dispatch(fetchReportedProjects());
    });
    setIsModalBanOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleModal = (data) => {
    setIsModalBanOpen(true);
    setModalData(data);
  };

  const filteredData = reportedProjects.filter((data) => {
    return data.title.toLowerCase().includes(search.toLowerCase());
  });

  const TABLE_HEADER = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Creator Name",
        accessor: "creator",
      },
      {
        Header: "Report Reason",
        accessor: "reportReason",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const TABLE_DATA = useMemo(
    () => [
      ...filteredData.map((data, index) => ({
        no: index + 1,
        title: data.title,
        creator: data.user.name,
        reportReason: (
          <>
            {reportedProjects.length > 0 ? (
              <div className="indicator">
                <span className="badge-accent badge badge-xs indicator-item "></span>
                <div
                  className="btn-warning btn-sm btn capitalize text-white"
                  onClick={() => {
                    setIsModalDetailReportOpen(!isModalDetailReportOpen);
                    setModalData(data);
                  }}
                >
                  See Detail
                </div>
              </div>
            ) : (
              <div
                className="btn-warning btn-sm btn capitalize text-white"
                onClick={() => {
                  setIsModalDetailReportOpen(!isModalDetailReportOpen);
                  setModalData(data);
                }}
              >
                See Detail
              </div>
            )}
          </>
        ),
        action: (
          <button
            className={`btn-sm btn gap-2 capitalize text-white ${
              data.is_active ? "btn-error " : "btn-disabled bg-black"
            }`}
            onClick={() => {
              handleModal(data);
            }}
          >
            <FaExclamationTriangle />
            {data.is_active ? "Ban Project" : "Banned"}
          </button>
        ),
      })),
    ],
    [filteredData]
  );

  return (
    <div>
      <header className="text-xl font-bold">Reported Project</header>
      <div
        className={`relative mt-[55px] overflow-x-auto sm:rounded-lg ${
          isModalBanOpen && "blur-sm"
        }`}
      >
        <div className="relative float-right w-full max-w-xs">
          <input
            type="text"
            placeholder="Search Project by Title"
            className="input-bordered input input-sm w-full focus:outline-none"
            value={search}
            onChange={handleSearch}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <BsSearch className="text-gray-400" />
          </div>
        </div>
        <div className="mt-14 shadow-sm ">
          <Table columns={TABLE_HEADER} data={TABLE_DATA} numberToShow={6} />
        </div>
      </div>
      {isModalBanOpen && (
        <div className="absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white p-10 shadow-lg drop-shadow-xl">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-center text-lg font-bold">
              Are you sure to banned this <br />
              <strong>{modalData.title}</strong> project ?
            </h1>
            <p className="my-5">Creator Name : {modalData.user.name}</p>
            <div className="mt-3 flex gap-4">
              <button
                className="btn-error btn-sm btn text-white"
                onClick={() => setIsModalBanOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`btn-success btn-sm btn text-white ${
                  loading ? "loading" : ""
                }`}
                onClick={() => {
                  handleBanProject({
                    id: modalData.id,
                  });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalDetailReportOpen && (
        <div className="absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white p-10 shadow-lg drop-shadow-xl">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-center text-lg font-bold">Detail</h1>
            <p className="my-5 w-full">
              {modalData.projectReportCategories.map((report) => {
                if (report.name === "Inappropiate") {
                  ammountInappropriate += 1;
                } else if (report.name === "Plagiarism") {
                  ammountPlagiarism += 1;
                } else if (report.name === "Sensitive") {
                  ammountSensitive += 1;
                }
              })}
              <table className="w-full">
                <tr>
                  <td>Kategori</td>
                  <td>Jumlah Report</td>
                </tr>
                <tr>
                  <td>Inappropriate</td>
                  <td>{ammountInappropriate}</td>
                </tr>
                <tr>
                  <td>Plagiarism</td>
                  <td>{ammountPlagiarism}</td>
                </tr>
                <tr>
                  <td>Sensitive</td>
                  <td>{ammountSensitive}</td>
                </tr>
              </table>
              <h4 className="my-5 text-center">
                Others{" "}
                {modalData.projectReportCategories.length -
                  (ammountInappropriate + ammountPlagiarism + ammountSensitive)}
              </h4>
              <div
                className={`h-[300px] overflow-y-auto ${
                  modalData.projectReportCategories.length -
                    (ammountInappropriate +
                      ammountPlagiarism +
                      ammountSensitive) <
                  10
                    ? "h-fit"
                    : "h-[200px]"
                }`}
              >
                {modalData.projectReportCategories.map((report, index) => (
                  <ol type="1" key={index}>
                    {report.body && <li>{report.body}</li>}
                  </ol>
                ))}
              </div>
            </p>
            <div className="mt-3 flex gap-4">
              <button
                className="btn-error btn-sm btn text-white"
                onClick={() =>
                  setIsModalDetailReportOpen(!isModalDetailReportOpen)
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
