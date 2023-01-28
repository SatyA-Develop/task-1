import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineRead } from "react-icons/ai";
import Loading from "../Loading/Loading";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [uname, setUName] = useState("");
  const [uemail, setUEmail] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uphone, setUPhone] = useState("");
  const [loading, setIsloading] = useState(true);
  const [userID, setUserID] = useState(null);

  const getApiData = async () => {
    setIsloading(true);
    try {
      const res = await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setIsloading(false);
          setUsers(res.data);
          setUName(users[0].name);
          setUEmail(users[0].email);
          setUPhone(users[0].phone);
          setUserID(users[0].id);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleDelete = (id) => {
    setIsloading(true);
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      setIsloading(false),
      setUsers(
        users.filter((post) => {
          return post.id !== id;
        })
      )
    );
  };

  const Submit = (e) => {
    setIsloading(true);
    const data = {
      name: name,
      email: email,
      phone: phone,
    };
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", data)
      .then(
        setIsloading(false),
        setUsers([...users, data]),
        setName(""),
        setEmail(""),
        setPhone("")
      );
  };

  const selectUser = (id) => {
    let user = users[id - 1];
    setUName(user.name);
    setUEmail(user.email);
    setUPhone(user.phone);
    setUserID(user.id);
  };

  const updateUser = (id) => {
    const data = {
      name: uname,
      email: uemail,
      phone: uphone,
    };

    Axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, data)
      .then((res) => {
        setUsers(
          res
        )
      });
  };

  return (
    <div className="t-style">
      <p style={{marginTop:"12rem" , marginBottom:"-12rem", fontSize: "2rem"}}>{users.length} Data Avaliable</p>
      <form action="">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          type="text"
          placeholder="Enter Name"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Enter Email"
          required
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          name="phone"
          type="phone"
          placeholder="Enter Phone"
          required
        />
        <button className="btn" onClick={Submit}>
          ADD
        </button>
      </form>
      <form action="" className="form-2">
        <input
          type="text"
          placeholder="Name"
          value={uname}
          onChange={(e) => setUName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={uemail}
          onChange={(e) => setUEmail(e.target.value)}
        />
        <input
          type="phone"
          placeholder="Mobile Number"
          value={uphone}
          onChange={(e) => setUPhone(e.target.value)}
        />
        <button className="update-btn" onClick={updateUser}>
          Update
        </button>
      </form>

      {loading ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr className="header">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td className="btn-class">
                      <Link to={`/user/${data.id}`}>
                        <button className="icon-btn">
                          <AiOutlineRead className="icon" />
                        </button>
                      </Link>
                      {/* <Link to={`/edit/${data.id}`}> */}
                      <button
                        className="icon-btn"
                        onClick={() => selectUser(data.id)}
                      >
                        <BiEdit className="icon" />
                      </button>
                      {/* </Link> */}
                      <button
                        className="icon-btn"
                        onClick={() => handleDelete(data.id)}
                      >
                        <MdDeleteForever className="icon" />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
