import { gql, useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import UpdateUserMutation from "./UpdateUserMutation";
import DeleteUserMutation from "./DeleteUserMutation";

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

const DELETE_USER_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

function CreateUserMutation() {
  const [createUser, { loading: createLoading, error: createError }] =
    useMutation(CREATE_USER_MUTATION);
  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_MUTATION);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER_MUTATION);
  const [formData, setFormData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const input = {
      title: event.target.title.value,
      body: event.target.body.value,
    };

    try {
      if (editIndex !== null) {
        // If editIndex is not null, update existing post
        const postId = formData[editIndex].id;
        await updateUser({ variables: { id: postId, input } });
        const updatedFormData = [...formData];
        updatedFormData[editIndex] = {
          ...updatedFormData[editIndex],
          ...input,
        };
        setFormData(updatedFormData);
        setEditIndex(null);
      } else {
        // If editIndex is null, create new post
        const { data } = await createUser({ variables: { input } });
        setFormData([...formData, data.createPost]);
        console.log(formData, "Create FormData");
      }
      event.target.reset();
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const { title, body } = formData[index];
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const bodyInput = document.getElementById("body") as HTMLInputElement;
    titleInput.value = title;
    bodyInput.value = body;
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
  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          type="text"
          label="Title"
          variant="outlined"
          name="title"
          placeholder="Enter Title"
          required
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
          required
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

      <div className="test1">
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          {formData.length > 0 ? <>Post Data</> : ""}
        </h2>
        <ul className="test1">
          {formData.length > 0 ? (
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
                {formData.map((data, index) => (
                  <tr key={index}>
                    <td className="gap2">{data.id}</td>
                    <td className="gap2">{data.title}</td>
                    <td className="gap2">{data.body}</td>
                    <td className="gap2">
                      {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button> */}
                      <UpdateUserMutation onClick={() => handleEdit(index)} />
                    </td>
                    <td className="gap2">
                      {/* <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button> */}
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
    </div>
  );
}

export default CreateUserMutation;
