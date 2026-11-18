import Link from 'next/link';

import {deleteBlogPost} from '@/app/actions/blog';
import {ConfirmDeleteButton} from '@/components/admin/ConfirmDeleteButton';
import {Card} from '@/components/ui/Card';
import {getBlogPosts} from '@/lib/data/blog';

export default async function AdminBlogPage() {
    const posts = await getBlogPosts({includeUnpublished: true});

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-3xl font-bold text-ink">Blog</h1>
                <Link
                    href="/admin/blog/new"
                    className="rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-cream"
                >
                    + New Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <Card className="p-8 text-sm text-ink-soft">No posts yet.</Card>
            ) : (
                <Card className="overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                            <tr>
                                <th className="px-5 py-3">Title</th>
                                <th className="px-5 py-3">Published</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3" />
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-t border-line hover:bg-cream-soft"
                                >
                                    <td className="px-5 py-3 font-semibold text-ink">{post.title}</td>
                                    <td className="px-5 py-3 text-ink-soft">{post.publishedAt.toLocaleDateString('en-GB', {dateStyle: 'medium'})}</td>
                                    <td className="px-5 py-3">
                                        {post.isPublished ? (
                                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">Published</span>
                                        ) : (
                                            <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-bold text-gray-700">Draft</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="text-xs font-semibold text-ink-soft hover:text-ink"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <form action={deleteBlogPost}>
                                            <input
                                                type="hidden"
                                                name="id"
                                                value={post.id}
                                            />
                                            <ConfirmDeleteButton confirmMessage={`Delete "${post.title}"?`} />
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>
    );
}
