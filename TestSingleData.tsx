import { useQuery, gql } from "@apollo/client";

const TestSingleData: React.FC = () => {
  const GET_POSTS = gql`
    query {
      post(id: 5) {
        id
        title
        body
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_POSTS);
  console.log(data, "data");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const post = data.post;
  return (
    <div>
      <h1>Posts</h1>
      <h2>{post.id}</h2>
      <h2>{post.title}</h2>
      <h2>{post.body}</h2>
      {/* {post.map((post: any) => (
        <div key={post.id}>
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))} */}
    </div>
  );
};

export default TestSingleData;
