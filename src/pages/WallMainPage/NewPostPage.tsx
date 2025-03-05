import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    content: '',
    imageUrl: '',
  });
  console.log('post', post);

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
    onSuccess: (res) => {
      console.log('res', res);
      // sessionStorage.setItem('token', res.data.token);
      // sessionStorage.setItem('id', res.data.id);
      navigate('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSumbit = () => {
    if (!post.content) {
      return;
    }
    console.log('payload', {
      content: post.content,
      // user: window.sessionStorage.getItem('id')
    });
    // console.log('mutateAsync', mutateAsync());
    mutateAsync();
  };
  return (
    <div className=''>
      <SectionTitle title='張貼動態' />
      <div className='itemWrapper p-8'>
        <div className='mb-4  text-left'>
          <p className='mb-1 '>貼文內容</p>
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
            上傳圖片
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
          className='bg-sunshine shadow-listItem themeBorder rounded-default py-4 px-[130px] mx-auto self-center disabled:bg-darkGrey active:shadow-none '
          onClick={handleSumbit}
          type='button'
          disabled={!post.content}
        >
          送出貼文
        </button>
      </div>
    </div>
  );
};

export default NewPostPage;
