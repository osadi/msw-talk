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
    <div className="cat">
      <h6>{cat.id}</h6>
      {cat.tags.map((tag) => {
        const image = `https://cataas.com/cat/${tag}`;
        return (
          <figure>
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
