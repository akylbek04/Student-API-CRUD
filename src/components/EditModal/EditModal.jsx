import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

const EditModal = ({ id, status, type, toggle, refetchData }) => {
  
  const [student, setStudent] = useState({});
  const [isloaded, setIsLoaded] = useState(false);
  
  const url = `https://627ef576b1cc1b12624eaac1.mockapi.io/api/v1/students/${id}`;
  
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setStudent(data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    
    setStudent({...student, [name]:value})
    
  }
  
  const handleSubmit = (e, id) => {
    e.preventDefault();
    
    const url = `https://627ef576b1cc1b12624eaac1.mockapi.io/api/v1/students/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => {
      toggle(null, null)
      refetchData()
    })
    .catch(err => console.log("error", err))

  }

  const { avatar, lname, fname, age} = student;

  return (
    <div>
      <Modal isOpen={status}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form inline onSubmit={(e) => handleSubmit(e,id)}>
            <FormGroup>
              <Input
                id="fname"
                name="fname"
                placeholder="Enter new first name..."
                type="text"
                value={fname}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="lname"
                name="lname"
                placeholder="Enter new age..."
                type="text"
                value={lname}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="avatar"
                name="avatar"
                placeholder="Enter new url..."
                type="text"
                value={avatar}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id=" age"
                multiple
                name="age"
                type="number"
                value={age}
                onChange={handleChange}
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditModal;
