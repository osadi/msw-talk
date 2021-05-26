import { useConstant } from "../hooks/useConstant";
import { useGHQuery } from "../hooks/useGHQuery";

const query = `query User($login: String!) { 
    user(login: $login) { 
      bio
      company
      name
      repositories(first:5){
        nodes {
          name
        }
      }
    }
  }`;

type User = { name: string; repositories: { nodes: Array<{ name: string }> } };
type Variables = { login: string };

export const OctoCat = () => {
  const variables = useConstant(() => ({ login: "octocat" }));
  const data = useGHQuery<User, Variables>({
    query,
    variables
  });

  if (!data) return <div>Nada</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <ul>
        {data.repositories.nodes.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
