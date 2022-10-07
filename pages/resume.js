import NextLink from 'next/link';
import Button from '../components/button/index';
import Timeline from "../components/timeline/index";
import axios from "axios";
import React from "react";
import Progressbar from "../components/progressbar";
import Error from "./_error";


export default function ResumePage() {

    axios.defaults.headers['Authorization'] = `Bearer ${process.env.AIRTABLE_API_KEY}`;
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Projects?view=Grid%20view`)
        .then((response) => {
            setData(response.data.records);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div><Progressbar/></div>;
    if (error) return <div><Error/></div>;

      return (
        <div>
          <section className="text-gray-600 body-font px-4 md:px-16 mx-auto max-w-screen-md">
            <Timeline data={data} />
          </section>
          <div className="flex flex-col items-center justify-center space-x-3 space-y-3 mb-6">
            <p  className="text-normal text-center text-wrap px-3 dark:text-zinc-300">
              You can visit my linkedin account for my tech stack and other skills.
            </p>
            <NextLink href="https://www.linkedin.com/in/onurhan-demir/">
              <Button
                  className={"bg-[#100F0F] hover:ring-black dark:bg-stone-500 dark:text-black"}
                >
                  Linkedin
              </Button>
            </NextLink>
          </div>
        </div>
      );
};