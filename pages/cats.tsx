import { useCats } from "../hooks/useCats";

const CatPage = () => {
  const { cats, isLoading, isError } = useCats(
    "http://localhost:3000/api/cats"
  );

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading cats...</div>;
  }

  return (
    <div>
      {cats?.map((cat) => (
        <Cat cat={cat} key={cat.id} />
      ))}
    </div>
  );
};

const Cat = ({ cat }: CatProps) => {
  return (
    <div className="cat">
      <h6>{cat.id}</h6>
      {cat.tags.map((tag) => {
        const image = `https://cataas.com/cat/${tag}`;
        return (
          <figure key={tag}>
            <img src={image} />
            <figcaption>{tag}</figcaption>
          </figure>
        );
      })}
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
