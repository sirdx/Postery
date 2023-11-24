import 'src/styles/PagePost.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "src/api/Post";
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { TbLineDashed } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

export default function Post() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);

    const response = await getPost(id);

    if (response.errorDetails === null) {
      setPost(response.data);
    } else {
      setError(response.errorDetails.message);
    }

    setIsLoading(false);
  };

  return (
    <div className='post-page'>
      {post !== null && 
      <>
        <div className='post'>
          <div className='header'>
            <div className='avatar' style={{ backgroundColor: `#${post.authorProfileColor}` }}></div>
            <div className='info'>
              <h4>{post.authorDisplayName}</h4>
              <span>{formatDistance(Date.parse(post.createdAt), new Date(), { addSuffix: true, locale: enUS })}</span>
            </div>
            <div className='options'>
              <button>
                <TbLineDashed />
              </button>
            </div>
          </div>
          <div className='post-content'>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className='stats'>
          </div>
        </div>
        <div className='comments'>
          <p>Comments...</p>
        </div>
      </>}
    </div>
  );
}