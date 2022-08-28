import axios from "axios";

const url = "api/users/";

const getAllUsers = () => {
  return axios
    .get(`${url}getAllUsers`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
};
const getUserById = (id: number) => {
  return axios
    .get(`${url}getUserById/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
};
const updateUser = (id: number, user: any) => {
  return axios
    .put(`${url}editUser/${id}`, user)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
};
const addUser = (user: any) => {
  return axios
    .post(`${url}addUser/`, user)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
};

const deleteUser = (id: number) => {
  return axios
    .put(`${url}deleteUser/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
};
const login = (obj: any) => {
  const data = axios
    .post(`${url}login/`, obj)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
  data
    .then((res) => {
      sessionStorage.setItem("token", res.accessToken);
      console.log(res.accessToken);
    })
    .catch((err: Error) => console.log(err));

  console.log(localStorage.getItem("products"));
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  login,
};
