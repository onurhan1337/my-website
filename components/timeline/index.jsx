import TimelineItem from "./timelineItem"
import CourseItem from "./courseItem"

const Index = ({ data }) => {
    return (
        <div className="flex flex-col justify-center items-center mx-auto">
            <TimelineItem data={data} />
            <CourseItem data={data} />
        </div>
    )
}

export default Index
