import Link from 'next/link';
import ArrowUpRight from '../../public/photos/arrow-up-right.svg';

const TimelineItem = ({ experiences }) => {
    return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
        {experiences?.map((experience) => (
        <div key={experience.id}  className="flex relative pt-10 pb-10 sm:pb-20 sm:items-center md:w-2/3 sm:mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div
                className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-600 text-white relative z-10 title-font font-medium text-sm" />
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div
                    className="flex-shrink-0 w-18 h-18 inline-flex items-center justify-center">
                    <img className="w-12 h-12" src={experience.companyLogo ? experience.companyLogo : undefined} />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                    <div className="flex flex-row">
                        <Link href={experience.link} target="_blank" >
                            <h2 className="font-semibold title-font text-gray-900 mb-1 text-xl">{experience.company}</h2>
                        </Link>
                        <ArrowUpRight className="ml-1" src="photos/arrow-up-right.svg" />
                    </div>
                    <p className="leading-relaxed break-words">{experience.title}</p>
                    <p className="text-zinc-400 text-sm py-1">{experience.date}</p>
                </div>
            </div>
        </div>
        ))}
    </div>
    );
}

export default TimelineItem;