import { useEffect, useState } from "react";
import "./StudentList.css";
import { Table, Button, Navbar, NavbarBrand } from "reactstrap";
import SingleStudent from "../SingleStudent/SingleStudent";
import Modals from "../Modals/Modals";
import { FaUserPlus, FaUserAltSlash } from "react-icons/fa";

import { DebounceInput } from "react-debounce-input";
import "./StudentList.css";

const url = "https://627ef576b1cc1b12624eaac1.mockapi.io/api/v1/students";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [modal, setModal] = useState({ type: null, status: false });
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id, type) => {
    // console.log("id->", id, "type->", type)
    setModal({ type: type, status: !modal.status });
    setId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = () => {
  //     fetch(url)
  //     .then(res => res.json())
  //     .then(data => setStudents(data))
  //     .catch(err => console.log(err))
  // }
  const fetchData = async () => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const refetchData = () => {
    fetchData();
  };

  const modalsInfo = {
    id,
    toggle,
    modal,
    refetchData,
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const filtered = students.filter((student) =>
    (student.fname + student.lname)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar className="mb-4" color="dark" dark>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="https://w7.pngwing.com/pngs/44/778/png-transparent-student-egresado-education-computer-icons-student-people-logo-university.png"
            style={{
              height: 40,
              width: 40,
              marginRight: "10px",
            }}
            className="border-0 rounded-1 "
          />
          Students App
        </NavbarBrand>

        <DebounceInput
          minLength={3}
          debounceTimeout={2000}
          value={searchQuery}
          onChange={handleSearch}
          className="debounce"
        />

        <Button className="addBtn" onClick={() => toggle(null, "add")}>
          <FaUserPlus className="add-icon" />
        </Button>
      </Navbar>
      <div className="container-fluid mt-3">
        <Table bordered className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          {filtered.length > 0 ? (
            filtered.map((student) => {
              const total = { ...student, toggle };
              return <SingleStudent key={student.id} {...total} />;
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <FaUserAltSlash className="no-user" />
                </td>
              </tr>
            </tbody>
          )}
        </Table>
        <Modals {...modalsInfo} />
      </div>
    </>
  );
};

export default StudentList;
