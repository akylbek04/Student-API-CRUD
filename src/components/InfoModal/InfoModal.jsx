import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

const InfoModal = ({ toggle, id, status, type }) => {
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

  const { avatar, lname, fname, age, phone, company, country } = student;

  return (
    <div>
      {isloaded ? (
        <Modal isOpen={status}>
          <ModalHeader toggle={() => toggle(null, null)}>
            More detailed info about a student {fname} {lname}
          </ModalHeader>
          <ModalBody className="m-2 d-flex border border-secondary">
            <div className="">
              <img
                className="p-1 border border-secondary-subtle"
                src={avatar}
              />
            </div>
            <div className=" card-body ms-5 ">
              <h3 className="text-center fs-4">
                {fname} {lname}
              </h3>
              <p className="border-bottom border-secondary-subtle">
                <MdManageAccounts className="me-2 icon" />
                {age} y.o
              </p>
              <p className="border-bottom border-secondary-subtle">
                <AiTwotonePhone className="me-2 icon" /> {phone}
              </p>
              <p className="border-bottom border-secondary-subtle">
                <BsFillBuildingsFill className="me-2 icon" /> {company}
              </p>
              <p className="border-bottom border-secondary-subtle">
                <GiEarthAmerica className="me-2 icon" />
                {country}
              </p>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <Modal isOpen={status}>
          <div>...loading</div>
        </Modal>
      )}
    </div>
  );
};

export default InfoModal;
