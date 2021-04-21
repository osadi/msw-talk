import { useEffect } from "react";
import useSwr from "swr";

const CatPage = () => {
  const { data, error } = useSwr<Cat[]>("http://localhost/api/cats");

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {!data ? (
        <div>Loading cats...</div>
      ) : (
        data?.map((cat) => <Cat cat={cat} key={cat.id} />)
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

export default CatPage;

type CatProps = {
  cat: Cat;
};

type Cat = {
  id: string;
  tags: string[];
};
