import Link from "next/link";
import IconArrowRight from "../icons/arrow-right";

const CourseCard = ({ data }) => {
  return (
    <>
      {data &&
        data.map(data => (
          <div className="border shadow-inner shadow- border-gray-300 rounded-lg">
            <div className="m-4">
              <div className="text-gray-500 text-sm dark:text-gray-500">
                <span>{data.fields.CourseDate}</span>
              </div>
              <div className="flex flex-row space-x-3 my-2 items-center text-gray-700 dark:text-gray-200 text-lg font-bold">
                <h4 className="text-black text-base dark:text-white">
                  {data.fields.CourseName}
                </h4>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold dark:text-gray-500">
                  {data.fields.CourseTitle}
                </p>
              </div>
            </div>
            <div>
              <Link href={data.fields.CourseLink} passHref>
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

export default CourseCard;
