import IconArrowRight from "../icons/arrow-right";
import Link from "next/link";

const TimelineItem = ({ data }) => {
  return (
    <div className="container py-24 mx-auto">
      <h1 className="font-bold text-3xl border-2 rounded-full text-center border-black py-2 text-black dark:text-white dark:border-white">
        Work
      </h1>
      <div>
        <div className="flex flex-col mt-4">
          {data.map(data => (
            <div
              key={data.fields.CompanyName}
              className="-m-1 flex items-center flex-col lg:flex-row justify-between py-8"
            >
              <div>
                <p className="text-gray-400 dark:text-gray-500">
                  {data.fields.WorkDate}
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-end">
                <Link
                  href={data.fields.CompanyLink}
                  className="text-xl font-bold text-gray-700 dark:text-gray-300"
                  target="_blank"
                >
                  {data.fields.CompanyName}
                  <IconArrowRight className="inline-block w-4 h-4 ml-2" />
                </Link>
                <p className="text-gray-400 dark:text-gray-500">
                  {data.fields.Title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
