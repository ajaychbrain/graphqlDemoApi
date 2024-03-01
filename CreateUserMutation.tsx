import { gql, useMutation } from "@apollo/client";
import { Button, TextField, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UpdateUserMutation from "./UpdateUserMutation";
import DeleteUserMutation from "./DeleteUserMutation";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const CREATE_USER_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const CreateUserMutation = () => {
  const [createUser, { loading: createLoading, error: createError }] =
    useMutation(CREATE_USER_MUTATION);
  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_MUTATION);
  const [formData, setFormData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Show 4 records per page

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setShowLoader(true);

        const input = {
          title: values.title,
          body: values.body,
        };

        if (editIndex !== null) {
          const postId = formData[editIndex].id;
          await updateUser({ variables: { id: postId, input } });
          const updatedFormData: any = [...formData];
          updatedFormData[editIndex] = {
            ...updatedFormData[editIndex],
            ...input,
          };
          setFormData(updatedFormData);
          setEditIndex(null);
        } else {
          const { data } = await createUser({ variables: { input } });
          setFormData([...formData, data.createPost]);
        }

        formik.resetForm();
      } catch (error) {
        console.error("Error creating/updating post:", error);
      } finally {
        setTimeout(() => {
          setShowLoader(false);
        }, 100);
      }
    },
  });

  const handleEdit = (index: any) => {
    setEditIndex(index);
    const { title, body } = formData[index];
    formik.setFieldValue("title", title);
    formik.setFieldValue("body", body);
  };

  const handleDelete = async (index: number) => {
    try {
      const newData = [...formData];
      newData.splice(index, 1);
      setFormData(newData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = formData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredFormData = currentPosts.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="mainDiv">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search By Title"
          inputProps={{ "aria-label": "Search By Title " }}
          id="search"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          {/* <SearchIcon /> */}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
      <br />
      <br />

      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          type="text"
          label="Title"
          variant="outlined"
          name="title"
          placeholder="Enter Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <br />
        <br />
        <TextField
          id="body"
          label="Body"
          variant="outlined"
          type="text"
          name="body"
          placeholder="Enter Body"
          value={formik.values.body}
          onChange={formik.handleChange}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />
        <br />
        <br />
        <Button
          type="submit"
          disabled={createLoading || updateLoading}
          variant="contained"
          sx={{ ml: 5 }}
        >
          {createLoading || updateLoading
            ? "Processing..."
            : editIndex !== null
            ? "Update Post"
            : "Create Post"}
        </Button>
        {(createError || updateError) && (
          <p>
            Error:{" "}
            {(createError && createError.message) ||
              (updateError && updateError.message)}
          </p>
        )}
      </form>

      {showLoader && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}

      <div className="test1">
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          {filteredFormData.length > 0 ? <>Post Data</> : ""}
        </h2>
        <ul className="test1">
          {filteredFormData.length > 0 ? (
            <table border={2}>
              <thead>
                <tr>
                  <th className="gap2">ID</th>
                  <th className="gap2">Title</th>
                  <th className="gap2">Body</th>
                  <th className="gap2" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFormData.map((data, index) => (
                  <tr key={index}>
                    <td className="gap2">{indexOfFirstPost + index + 1}</td>
                    <td className="gap2">{data.title}</td>
                    <td className="gap2">{data.body}</td>
                    <td className="gap2">
                      <UpdateUserMutation onClick={() => handleEdit(index)} />
                    </td>
                    <td className="gap2">
                      <DeleteUserMutation onClick={() => handleDelete(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h2>Sorry No Data Available! Please Create the Post</h2>
            </div>
          )}
        </ul>
      </div>

      {/* Pagination */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPosts.length < postsPerPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateUserMutation;
