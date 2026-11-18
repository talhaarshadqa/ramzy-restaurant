import {notFound} from 'next/navigation';

import {updateBlogPost} from '@/app/actions/blog';
import {BlogPostForm} from '@/components/admin/BlogPostForm';
import {getBlogPostById} from '@/lib/data/blog';

export default async function EditBlogPostPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const post = await getBlogPostById(id);
    if (!post) notFound();

    return (
        <div>
            <h1 className="mb-8 font-display text-3xl font-bold text-ink">Edit Blog Post</h1>
            <BlogPostForm
                post={post}
                action={updateBlogPost.bind(null, post.id)}
            />
        </div>
    );
}
