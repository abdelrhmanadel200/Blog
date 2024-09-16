import { useEffect } from 'react';

const Comments = ({ slug }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://disqus.com/embed.js`;
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="disqus_thread" />
  );
};

export default Comments;
