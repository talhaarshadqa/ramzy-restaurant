import {createBlogPost} from '@/app/actions/blog';
import {BlogPostForm} from '@/components/admin/BlogPostForm';

export default function NewBlogPostPage() {
    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">New Blog Post</h1>
            <BlogPostForm action={createBlogPost} />
        </div>
    );
}
