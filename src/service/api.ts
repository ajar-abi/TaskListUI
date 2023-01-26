import axios from "axios";

const header =  {
              "Content-Type": "application/x-www-form-urlencoded",
            };

export const taskCreate = (requestData: any) => {
    return axios.post('http://localhost:8080/addList', requestData, { headers: header })
    .then((response) => response);
};

export const viewTask = () => {
    return axios.get("http://localhost:8080/viewList", { headers: header })
    .then((response) => response);
};


export const deleteTask = (requestData: any) => {
    return axios.post('http://localhost:8080/deleteTask', requestData, { headers: header })
    .then((response) => response);
};
