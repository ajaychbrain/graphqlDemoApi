import { gql, useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CREATE_USER_MUTATION = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

function CreateUserMutation() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const [formData, setFormData] = useState<any[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const input = {
      title: event.target.title.value,
      body: event.target.body.value,
    };

    try {
      const { data } = await createUser({ variables: { input } });
      console.log("New user created:", data);

      // Push the form data into formData array
      setFormData([...formData, input]);

      console.log(formData, "arrayData");

      // Handle success
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
    }
  };

  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
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
          id="outlined-basic"
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
          disabled={loading}
          variant="contained"
          sx={{ ml: 5 }}
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </form>
      {/* Display the formData array */}
      <div className="test1">
        <h2 style={{ display: "flex", justifyContent: "center" }}>Post Data</h2>
        <ul className="test1">
          <table border={2}>
            <tr>
              <th className="gap2">ID</th>
              <th className="gap2">Title</th>
              <th className="gap2">Body</th>
              <th className="gap2" colSpan={2}>
                Action
              </th>
            </tr>
            {formData.map((data, index) => (
              <tr>
                <td key={index} className="gap2">
                  {index + 1}
                </td>
                <td className="gap2">{data.title}</td>
                <td className="gap2">{data.body}</td>
                <td className="gap2">
                  <Button variant="contained" color="secondary">
                    Edit
                  </Button>
                </td>
                <td className="gap2">
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </ul>
      </div>
    </div>
  );
}

export default CreateUserMutation;
