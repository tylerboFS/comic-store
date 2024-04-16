import { useEffect, useState } from "react";

const API_URL = "/api/comics";

const AllComics = () => {
  const [allComics, setAllComics] = useState([]);

  useEffect(() => {
    //fetch the comics and then set the allComics state
    const fetchComics = async () => {
      const result = await fetch(API_URL);
      const json = await result.json();

      console.log(json);
      setAllComics(json);
    };
    fetchComics();
  }, []);

  return (
    <>
      <h2>All Comics</h2>

      {allComics.map((comic) => {
        return (
          <p>
            #{comic.issueNumber} {comic.title}
          </p>
        );
      })}
    </>
  );
};

export default AllComics;
