import React, { useEffect, useCallback, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import CloudUpload from "@mui/icons-material/CloudUpload";
import axios from "axios";

import "./Card.css";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const Card = ({ data, index, reload }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const workerData = JSON.parse(localStorage.getItem("workerData"));
  const [file, setFile] = useState("");

  function formatDateToCustom(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("Please select a file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log(`${BACKEND_URL}/api/tasks/upload_file_to_task/${data?._id}`);

      // Send a POST request to upload the file
      const response = await axios.put(`${BACKEND_URL}/api/tasks/upload_file_to_task/${data?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token : workerData?.token
        },
      });

      if(response.data.success){
          toast.success(response.data.message)
          reload();
      }else{
        throw new Error(response.data.message)
      }


      // Reset the file state
      setFile("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  function makeFileExtension(link){
    return link?.split(".").pop().toLowerCase();

  }

  return (
    <>
      <div className={`card border ${data?.status == 'pending' ? "border-warning" : data?.status == 'checked' ? "border-success" : data?.status == 'done' ? "border-slate-600" : "border-danger"} border-success shadow-0 mb-3  h-[400px] w-[300px]`}>
        <div className={`card-header bg-transparent ${data?.status == 'pending' ? "border-warning" : data?.status == 'checked' ? "border-success" : data?.status == 'done' ? "border-slate-600" : "border-danger"} `}>
          <p>№ {index}</p>
          <Dropdown>
          <Dropdown.Toggle
              variant={data?.status == 'pending' ? "border-warning" : data?.status == 'checked' ? "border-success" : data?.status == 'done' ? "border-slate-600" : "border-danger"}
              id="dropdown-basic"
              className="dropdawnCard"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" className="dropdownItem">
                <p>Vazifa berilgan:</p>
                <p>{formatDateToCustom(data?.createdAt)}</p>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" className="dropdownItem">
                <p>Tugatish kerak:</p>
                <p>{formatDateToCustom(data?.deadline)}</p>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3" className="dropdownItem">
                <p>Ishchilar:</p> <p>{data?.workers?.length}</p>
              </Dropdown.Item>
            </Dropdown.Menu>
            {/* ... (rest of the code unchanged) */}
          </Dropdown>
        </div>
        <div className="card-body">
          <h5 className="card-title">{data?.title}</h5>
          <p className={`card-text ${data?.status == 'pending' ? "border-warning" : data?.status == 'checked' ? "border-success" : data?.status == 'done' ? "border-slate-600" : "border-danger"}`}>{data?.desc}</p>
          <div className="mt-3">
            {data?.worker_file ? (
              <>
              <a download={data?.worker_file} href={`${BACKEND_URL}/${data?.worker_file}`}>
                Download File
              </a>
              <p>{data?.worker_file.slice(10, 20)}.{makeFileExtension(data?.worker_file)}</p>
              <p className="mt-2 text-[14px]">Holati: {data?.status == 'pending' ? "Jarayonda" : data?.status == 'done' ? "Tekshirilmagan" : data?.status == 'checked' ? "Muvofaqqiyatli bajarilgan" : "Rad etilgan"}</p>
              </>
            ) : (
              <div className="text-sm relative">
                <input
                  type="file"
                  className="absolute left-[73px]"
                  onChange={handleFileChange}
                  accept=".pdf, .doc, .docx, .zip, .rar, .jpg, .jpeg, .png, .gif, .mp4, .mov"
                />
                <label className="flex flex-col gap-2 ">
                  <CloudUpload sx={{ fontSize: "3em", cursor: "pointer" }} />
                  <span>
                    Bajargan faylingizni yuklang
                  </span>
                </label>
                <Button variant="contained" className="mt-3"  onClick={uploadFile}>Yuklash</Button>
                <p className="mt-2">Holati: {data?.status == 'pending' ? "Jarayonda" : data?.status == 'done' ? "Tekshirilmagan" : data?.status == 'checked' ? "Muvofaqqiyatli bajarilgan" : "Rad etilgan"}</p>
              </div>
            )}
          </div>
        </div>
        <div className={`card-footer bg-transparent ${data?.status == 'pending' ? "border-warning" : data?.status == 'checked' ? "border-success" : data?.status == 'done' ? "border-slate-600" : "border-danger"}`}>
          <Link to={`/chat/${data?._id}`}>
            <button className="btn btn-info">chat</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
