import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

const DeleteModal = ({ status, type, id, toggle, refetchData }) => {


  const handleDelete = (id) => {
    const url = `https://627ef576b1cc1b12624eaac1.mockapi.io/api/v1/students/${id}`;


    fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        toggle(null, null);
        refetchData()
    })
    .catch(err => console.log("Error", err))
  };

  return (
    <div>
      <Modal isOpen={status}>
        <ModalHeader toggle={toggle}>Delete student?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete student with an ID: {id}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(id)}>
            Yes
          </Button>
          <Button color="danger" onClick={() => toggle(null, null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default DeleteModal;
