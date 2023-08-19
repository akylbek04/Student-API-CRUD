// import imagePng from "no-photo.jpeg";
import { Button } from "reactstrap"

const SingleStudent = ({avatar, id, lname, fname, age, toggle}) => {


    const imageContent = avatar.startsWith("http") ? avatar : ""
    return (
      <tbody>
        <tr>
          <th scope="row">{id}</th>
          <td>
            <img src={imageContent} alt="" width="50px" />
          </td>
          <td>
            {fname} {lname}
          </td>
          <td>{age}</td>
          <td>
            <Button onClick={() => toggle(id, "info")} color="info">
              info
            </Button>
            <Button onClick={() => toggle(id, "edit")} color="primary">
              edit
            </Button>
            <Button onClick={() => toggle(id, "delete")} color="danger">
              delete
            </Button>
          </td>
        </tr>
      </tbody>
    );
}

export default SingleStudent