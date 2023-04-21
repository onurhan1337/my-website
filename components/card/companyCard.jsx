import Link from "next/link";
import IconArrowRight from "../icons/arrow-right";

const CompanyCard = ({ data }) => {
  return (
    <>
      {data &&
        data.map(data => (
          <div className="border shadow-inner shadow- border-gray-300 rounded-lg">
            <div className="m-4">
              <div className="text-gray-500 text-sm">
                <span>{data.fields.WorkDate}</span>
              </div>
              <div className="flex flex-row space-x-3 my-2 items-center text-gray-700 dark:text-gray-200 text-lg font-bold">
                <h4 className="text-black text-base dark:text-white">
                  {data.fields.CompanyName}
                </h4>
                <span className="font-light text-base dark:text-gray-300">
                  {data.fields.Title}
                </span>
              </div>
            </div>
            <div>
              <Link
                href={data.fields.CompanyLink}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <button className="button text-black float-right dark:text-white">
                  Details
                  <IconArrowRight className="inline-block w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default CompanyCard;
