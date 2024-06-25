import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCard from "../components/AdminCard";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { CiShoppingTag } from "react-icons/ci";



const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/getUsers")
      .then((respo) => [setUsers(respo.data)]);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/getProduct")
      .then((respo) => [setProducts(respo.data)]);
  }, []);

  console.log(products);
  return (
    <div className="flex gap-2 p-6">
      <Link to={'/admin/users'}>
        <AdminCard title={"Users"} value={users.length} bg={"red"}>
          <FaRegUser />
        </AdminCard>
      </Link>
      <Link to={'/admin/products'}>
        <AdminCard title={"Products"} value={products.length} bg={"green"}>
        <CiShoppingTag />
        </AdminCard>
      </Link>
    </div>
  );
};

export default Admin;
