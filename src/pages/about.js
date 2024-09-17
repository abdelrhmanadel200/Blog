import Head from 'next/head';
import Link from 'next/link';

const About = () => (
  <>
    <Head>
      <title>About Us - My Blog</title>
      <meta name="description" content="Learn more about us and the mission behind My Blog." />
      <meta property="og:title" content="About Us - My Blog" />
      <meta property="og:description" content="Learn more about us and the mission behind My Blog." />
      <meta property="og:url" content="https://my-advanced-blog.com/about" />
    </Head>
    
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to My Blog! We are passionate about sharing insightful articles and stories on various topics.
        Our mission is to provide high-quality content that informs, entertains, and inspires our readers.
      </p>
      <p className="mb-4">
        Founded in 2024, we started with the goal of creating a platform where ideas can be freely shared and discussed.
        Our team consists of writers, editors, and enthusiasts who are dedicated to delivering engaging and valuable content.
      </p>
      <p className="mb-4">
        Thank you for visiting our blog. We hope you enjoy reading our posts as much as we enjoy creating them.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  </>
);

export default About;
