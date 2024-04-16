import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../store/UserReducers";
import Empty from "../components/Empty";
import { CSVLink } from "react-csv";

function Home() {
  const users = useSelector((state) => state.user?.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "Student Name", key: "student_name" },
    { label: "Student Class", key: "student_class" },
    { label: "Student Section", key: "student_section" },
  ];

  const csvData = users.map((user) => ({
    id: user.id,
    student_name: user.student_name,
    student_class: user.student_class,
    student_section: user.student_section,
  }));

  return (
    <>
      <div className="main-tab py-8 w-100 flex items-center justify-between">
        <h1>Students List</h1>
        <div className="flex items-center">
          <Button
            onClick={() => navigate("/add")}
            variant="primary"
            className="text-xl px-5 mr-3"
          >
            + Add
          </Button>
          <CSVLink data={csvData} headers={headers} filename={"users.csv"}>
            <Button
              disabled={users.length < 1}
              variant="success"
              className="text-xl px-5"
            >
              Export
            </Button>
          </CSVLink>
        </div>
      </div>

      <div className="w-100">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Student Class</th>
              <th>Student Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.student_name}</td>
                  <td>{user.student_class}</td>
                  <td>{user.student_section}</td>
                  <td>
                    <div className="flex gap-3">
                      <Button
                        variant="success"
                        onClick={() => navigate(`/update/${user.id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-archive"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tr>
              <td colSpan={5}>
                <Empty />
              </td>
            </tr>
          )}
        </Table>
      </div>
    </>
  );
}

export default Home;
