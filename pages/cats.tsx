import useSwr from "swr";

const CatPage = () => {
  const { data } = useSwr<Cat[]>("/api/cats");

  return (
    <div>
      {!data ? (
        <div>Loading cats...</div>
      ) : (
        data.map((cat) => <Cat cat={cat} />)
      )}
    </div>
  );
};

const Cat = ({ cat }: CatProps) => {
  return (
    <div>
      <h6>{cat.id}</h6>
      <ul>
        {cat.tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatPage;

type CatProps = {
  cat: Cat;
};

type Cat = {
  id: string;
  tags: string[];
};
