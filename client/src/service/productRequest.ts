import axios from "axios";
import { Product } from "../Data";

const url = "api/products/";

function getAllProducts() {
  const token = sessionStorage.getItem("token");

  return axios
    .get(`${url}getAllProducts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
}

function getProductById(id: string) {
  return axios
    .get(`${url}getProductById/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
}
function addProduct(newProduct: Product) {
  return axios
    .post(`${url}addProduct/`, newProduct)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
}

async function editProduct(newProduct: any, id: string) {

  return axios
    .put(`${url}editProduct/${id}`, newProduct)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });

}

function deleteProduct(id: string) {
  return axios
    .delete(`${url}deleteProduct/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
}

export default {
  getAllProducts,
  getProductById,
  editProduct,
  addProduct,
  deleteProduct,
};
