import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/UserReducers";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import img from "/assets/imgs/graduation.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.user?.users);
  const selectedUser = users.find((item) => item.id == id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(selectedUser);
  const initialValues = {
    student_class: selectedUser ? selectedUser.student_class : "",
    student_name: selectedUser ? selectedUser.student_name : "",
    student_section: selectedUser ? selectedUser.student_section : "",
  };

  const validationSchema = Yup.object().shape({
    student_name: Yup.string().required("Name is required"),
    student_class: Yup.string().required("Name is required"),
    student_section: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const notify = (errorMessage) => {
      toast.error(errorMessage);
    };
    try {
      await dispatch(
        updateUser({
          id: id,
          student_name: values.student_name,
          student_class: values.student_class,
          student_section: values.student_section,
        })
      );
      navigate("/");
    } catch (error) {
      setFieldError("submit", error.message);
      notify("Error: API call failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="main w-100">
      <ToastContainer />
      <div className="flex gap-3 items-center justify-center ">
        <Image width={120} src={img} />
        <h1 className="text-center">Update Student Data</h1>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="student_name">Student Name</label>
              <Field
                type="text"
                name="student_name"
                placeholder="Enter Name"
                className="form-control"
              />
              <ErrorMessage
                name="student_name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="student_class">Student Class</label>
              <Field
                type="text"
                name="student_class"
                placeholder="Enter Email"
                className="form-control"
              />
              <ErrorMessage
                name="student_class"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="student_section">Student Section </label>
              <Field
                type="text"
                name="student_section"
                placeholder="Enter Phone"
                className="form-control"
              />
              <ErrorMessage
                name="student_section"
                component="div"
                className="text-danger"
              />
            </div>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-1"
                  />
                  Updating...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <ErrorMessage
              name="submit"
              component="div"
              className="text-danger"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
