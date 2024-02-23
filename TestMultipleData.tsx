import { useQuery, gql } from "@apollo/client";

const TestMultipleData: React.FC = () => {
  const GET_POSTS = gql`
    query ($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
        }
        meta {
          totalCount
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_POSTS);
  console.log(data, "MultiUser");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  //   const post = data.post;
  return (
    <div>
      <h1>Posts</h1>

      {data.posts.data.map((post: any) => (
        <div key={post.id}>
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TestMultipleData;
