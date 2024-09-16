const AuthorBio = ({ author }) => (
    <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-2">About the Author</h3>
      <p className="text-gray-700">{author.bio}</p>
      <a href={`/authors/${author.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-500 hover:underline">
        Read more articles by {author.name}
      </a>
    </div>
  );
  
  export default AuthorBio;
  