const RelatedPosts = ({ relatedPosts }) => (
    <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Related Posts</h3>
      <ul>
        {relatedPosts.map(post => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default RelatedPosts;
  