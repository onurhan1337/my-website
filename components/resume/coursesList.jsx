import React from "react";
import axios from "axios";
import CourseCard from "../card/courseCard";

const CoursesList = () => {
  axios.defaults.headers[
    "Authorization"
  ] = `Bearer ${process.env.AIRTABLE_API_KEY}`;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Courses?view=Grid%20view`
      )
      .then(response => {
        setData(response.data.records);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {error && <div>Something went wrong...</div>}
      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <CourseCard data={data} />
      </div>
    </>
  );
};

export default CoursesList;
