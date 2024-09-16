import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function getStaticProps() {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

const Home = ({ posts }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-4xl font-bold mb-4">My Blog</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(post => (
        <div key={post.slug} className="border rounded-lg overflow-hidden shadow-md">
          <Link href={`/posts/${post.slug}`}>
            <span>
              <Image
                src={post.image || '/images/default.jpg'}
                alt={post.title}
                width={500}
                height={300}
                className="object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </span>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
