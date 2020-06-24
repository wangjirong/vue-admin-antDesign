import {
    getDetailTime
} from './date.filter'
export function formBlogList(blogList) {
    blogList.map(blog => {
        blog.time = getDetailTime(blog.date)
        blog.commentCount = blog.comment.length
        blog.tag = blog.tags.join('、');
        blog.delivery = blog.delivery === true ? "yes" : "no"
        return blog
    })
    return blogList
}