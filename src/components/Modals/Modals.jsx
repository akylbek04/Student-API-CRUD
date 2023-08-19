import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddModal from "../AddModal/AddModal";
import InfoModal from "../InfoModal/InfoModal";

const Modals = ({id, toggle, refetchData,  modal : {status, type}}) => {
    console.log(id, toggle, status, type)
    return (
      <>
        {status && type === "info" && (
          <InfoModal toggle={toggle} id={id} status={status} type={type} />
        )}
        {status && type === "edit" && (
          <EditModal
            toggle={toggle}
            id={id}
            status={status}
            type={type}
            refetchData={refetchData}
          />
        )}
        {status && type === "delete" && (
          <DeleteModal
            toggle={toggle}
            id={id}
            status={status}
            type={type}
            refetchData={refetchData}
          />
        )}
        {status && type === "add" && (
          <AddModal
            toggle={toggle}
            id={id}
            status={status}
            type={type}
            refetchData={refetchData}
          />
        )}
      </>
    );
}

export default Modals