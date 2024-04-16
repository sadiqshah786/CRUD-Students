import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../store/UserReducers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "/assets/imgs/graduation.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const navigate = useNavigate();
  const initialValues = {
    student_name: "",
    student_class: "",
    student_section: "",
  };

  const validationSchema = Yup.object({
    student_name: Yup.string().required("Student Name Required"),
    student_class: Yup.string().required("Student Class Required"),
    student_section: Yup.string().required("Student Section Required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const notify = (errorMessage) => {
      toast.error(errorMessage);
    };
    try {
      const response = await axios.post("http://localhost:3000/users", values);
      console.log("Response:", response);
      dispatch(
        addUsers({
          id: users?.length > 0 ? users[users.length - 1].id + 1 : 1,
          ...values,
        })
      );
      navigate("/");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      notify("Error: API call failed!");
    }
    setSubmitting(false);
  };

  return (
    <div className="main w-100">
      <div className="flex gap-3 items-center justify-center ">
        <Image width={120} src={img} />
        <h1 className="text-center">Add Student Data</h1>
      </div>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name">Student Name</label>
              <Field
                type="text"
                name="student_name"
                placeholder="Enter Student Name"
                className="form-control"
              />
              <ErrorMessage
                name="student_name"
                component="div"
                className="error"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="student_class">Student Class</label>
              <Field
                type="text"
                name="student_class"
                placeholder="Enter Student Class"
                className="form-control"
              />
              <ErrorMessage
                name="student_class"
                component="div"
                className="error"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">Student Section</label>
              <Field
                type="text"
                name="student_section"
                placeholder="Enter Student Section"
                className="form-control"
              />
              <ErrorMessage
                name="student_section"
                component="div"
                className="error"
              />
            </div>

            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
