import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

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

const AddModal = ({status, type, refetchData, toggle}) => {
  const [postData, setPostData] = useState({
    fname: '',
    lname: '',
    avatar: '',
    age: 0
  });
  

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `https://627ef576b1cc1b12624eaac1.mockapi.io/api/v1/students`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        toggle(null, null);
        refetchData();
      })
      .catch((err) => console.log("error", err));
  };

  const {fname, lname, avatar, age} = postData;
  const imageContent = avatar ? avatar : "https://shorturl.at/jvKZ0";

  return (
    <div>
      <Modal isOpen={status}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form onSubmit={ handleSubmit}>
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
                placeholder="Enter new last name..."
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
                placeholder="Enter new age..."
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

export default AddModal;
