import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import  {Link} from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("dddd", data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("users after delete", data);
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      {/* <section className="admin-users-section">
        <div className="container">
            <h1>Admin Users Data</h1>

        </div>
        <div className="container admin-users">
       <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {users.map((curUser, index) => {
        return <tr key={index}>
            <td>{curUser.username}</td>
            <td>{curUser.email}</td>
            <td>{curUser.phone}</td>
            <td>Edit</td>
           <td>Delete</td>
        </tr>
      })}
        </tbody>
       </table>
        
        </div>

      </section> */}

      <section className="admin-users-section py-5 ">
        <div className="container">
          <h1 className="text-center mb-4">Admin Users Data</h1>
        </div>
        <div
          className="container admin-users"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>edit</Link>
                    </td>
                    <td>
                      <button 
                      className="btn" 
                      onClick={() => deleteUserById(curUser._id)}
                      >
                        {""}Delete {""}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
