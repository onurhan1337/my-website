import Timeline from "../components/timeline/index";
import axios from "axios";
import React from "react";
import Progressbar from "../components/progressbar";
import Error from "./_error";

export default function ResumePage() {
  axios.defaults.headers[
    "Authorization"
  ] = `Bearer ${process.env.AIRTABLE_API_KEY}`;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Projects?view=Grid%20view`
      )
      .then((response) => {
        setData(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div>
        <Progressbar />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );

  return (
    <div>
      <section className="text-gray-600 body-font px-4 md:px-16 mx-auto max-w-screen-md">
        <Timeline data={data} />
      </section>
    </div>
  );
}
