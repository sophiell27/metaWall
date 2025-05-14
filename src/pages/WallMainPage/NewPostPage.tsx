import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import { useNavigate } from 'react-router-dom';
import useAlertMessage from '../../hooks/userAlertMessage';
import { useTranslation } from 'react-i18next';

const NewPostPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setMessage, AlertMessage } = useAlertMessage();
  const [post, setPost] = useState({
    content: '',
    imageUrl: '',
  });

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      // axios.post('http://localhost:8000/posts'),
      axiosInstance.post(
        '/posts',
        {
          content: post.content,
          // id: window.sessionStorage.getItem('id')
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      ),
    onSuccess: () => navigate('/'),
    onError: () => setMessage(t('message.unablePost')),
  });

  const handleSumbit = () => {
    if (!post.content) {
      return;
    }
    mutateAsync();
  };
  return (
    <div className=''>
      <AlertMessage />
      <SectionTitle title={t('createPost')} />
      <div className='itemWrapper p-8'>
        <div className='mb-4  text-left'>
          <p className='mb-1 '>{t('content')}</p>
          <textarea
            className='defaultBg themeBorder py-3 px-4 w-full h-[169px]'
            value={post.content}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
          />
        </div>
        <div className=' text-left'>
          <button className='rounded-md py-2 px-8 bg-black text-white mb-4'>
            {t('uploadImg')}
          </button>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt='image'
              className='w-full max-h-[157px] object-contain mb-8'
            />
          )}
        </div>
        <button
          className='bg-sunshine shadow-listItem themeBorder rounded-default py-4 px-[130px] mx-auto self-center disabled:bg-darkGrey active:shadow-none disabled:active:shadow-listItem'
          onClick={handleSumbit}
          type='button'
          disabled={!post.content}
        >
          {t('sendPost')}
        </button>
      </div>
    </div>
  );
};

export default NewPostPage;
