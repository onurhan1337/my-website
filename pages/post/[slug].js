import { useMDXComponent } from "next-contentlayer/hooks"
import MDXComponents from "../../components/mdx-components"
import { allPosts } from "contentlayer/generated"
import Claps from "@upstash/claps"
import { format, parseISO } from "date-fns"
import { tr } from "date-fns/locale"

export async function getStaticPaths() {
    const paths = allPosts.map(post => ({ params: { slug: post.slug } }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const post = allPosts.find(post => post.slug === params.slug)

    if (!post) {
        return {
            redirect: {
                destination: "/404"
            }
        }
    }

    return {
        props: {
            post
        }
    }
}

const PostPage = ({ post }) => {
    const Component = useMDXComponent(post.body.code)

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <article>
                <h1 className="text-4xl text-black dark:text-zinc-400 font-bold mb-4">{post.title}</h1>
                <time className="text-gray-500" dateTime={post.date}>
                    {format(parseISO(post.date), "d LLLL yyyy", {
                        locale: tr
                    })}
                </time>
                <hr className="my-4" />
            </article>
            <div className="prose dark:prose-invert prose-p:font-jakarta prose-a:break-words dark:prose-headings:text-zinc-200 dark:prose-p:text-zinc-400 prose-li:text-gray-700 dark:prose-li:text-zinc-300 prose-strong:text-black dark:prose-strong:text-green-300">
                <Component
                    components={{
                        ...MDXComponents
                    }}
                />
            </div>
            <div className="fixed z-50">
                <Claps fixed="left" replyUrl={post.tweetUrl} />
            </div>
        </div>
    )
}

export default PostPage
