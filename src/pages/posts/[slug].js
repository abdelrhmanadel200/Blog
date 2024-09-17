import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

// Define the posts directory path
const postsDirectory = path.join(process.cwd(), 'src/posts');

// Fetch all post slugs for static paths
export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: 'blocking', // Use 'blocking' to handle paths not yet generated
  };
}

// Fetch post data and convert markdown to HTML
export async function getStaticProps({ params }) {
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);

  // Mock related posts data (Replace with actual related post fetching if available)
  const relatedPosts = [
    { slug: 'first-post', title: 'Second Blog Post', image: '/images/imagg.png' },
    { slug: 'first-post', title: 'Third Blog Post', image: '/images/imagg.png' },
  ];

  return {
    props: {
      post: {
        ...data,
        content: htmlContent,
      },
      relatedPosts: relatedPosts || [], // Ensure relatedPosts is an array
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

// Main Post component
const Post = ({ post, relatedPosts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const disqusShortname = 'my-advanced-blog'; // Your Disqus shortname
  const disqusConfig = {
    url: `https://my-advanced-blog.com/posts/${post.slug}`,
    identifier: post.slug,
    title: post.title,
  };

  // Author Bio component
  const AuthorBio = ({ author }) => (
    <div className="mt-12 p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md flex items-center">
      <Image
        src="/images/action.png" // Placeholder for author's profile picture
        alt={author.name}
        width={80}
        height={80}
        className="rounded-full mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">About the Author</h3>
        <p className="text-black mb-4">{author.bio}</p>
        {author.social && (
          <div className="flex space-x-4">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                className="text-blue-700 hover:text-blue-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Related Posts component
  const RelatedPosts = ({ posts }) => (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4 text-black">Related Posts</h3>
      <ul className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug} className="flex items-center transition-transform transform hover:scale-105">
              <Image
                src={post.image || '/images/default.jpg'}
                alt={post.title}
                width={100}
                height={75}
                className="mr-4 rounded-lg"
              />
              <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                {post.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No related posts available.</li>
        )}
      </ul>
    </div>
  );

  // Social Sharing component
  const SocialSharing = ({ url, title }) => (
    <div className="flex space-x-6 mt-8">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        className="text-blue-500 hover:text-blue-700"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        className="text-blue-600 hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FaFacebookF size={24} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        className="text-blue-700 hover:text-blue-900"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedinIn size={24} />
      </a>
    </div>
  );

  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image || '/images/default.jpg'} />
        <meta property="og:url" content={`https://my-advanced-blog.com/posts/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://my-advanced-blog.com/posts/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.title,
            'description': post.description,
            'author': {
              '@type': 'Person',
              'name': post.author,
            },
            'datePublished': post.date,
            'image': post.image,
            'url': `https://my-advanced-blog.com/posts/${post.slug}`,
          })}
        </script>
      </Head>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <article className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-black">{post.title}</h1>
            <p className="text-black mb-4">
              {format(new Date(post.date), 'MMMM dd, yyyy')} by {post.author}
            </p>
            <Image
              src={post.image || '../../../public/images/imagg.png'}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-60 object-cover rounded-lg"
            />
          </header>

          <div className="prose lg:prose-xl mb-8 text-black" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-8">
            <SocialSharing url={`https://my-advanced-blog.com/posts/${post.slug}`} title={post.title} />
          </div>
        </article>

        <aside className="lg:col-span-1 space-y-12">
          <AuthorBio
            author={{
              name: post.author,
              bio: 'Author bio here',
              social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
            }}
          />
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>
    </>
  );
};

export default Post;
