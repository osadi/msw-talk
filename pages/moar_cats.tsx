import { useCats } from "../hooks/useCats";

const MoarCatPage = () => {
  const { cats, isLoading, isError } = useCats(
    "http://localhost:3000/api/moar_cats"
  );

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading moar cats...</div>
      ) : (
        cats?.map((cat) => <Cat cat={cat} key={cat.id} />)
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
          <figure key={tag}>
            <img src={image} />
            <figcaption>{tag}</figcaption>
          </figure>
        );
      })}
    </div>
  );
};

export default MoarCatPage;

type CatProps = {
  cat: Cat;
};

type Cat = {
  id: string;
  tags: string[];
};
