import { useState } from 'react';

const CreatePostPage = () => {
  const [post, setPost] = useState({
    content: '',
    imageUrl: '',
  });

  const handleSumbit = () => {
    if (!post.content) {
      return;
    } else {
      //post to server
    }
  };
  return (
    <div className=''>
      <div className='themeBorder defaultBg shadowBorder py-5 mb-4 ml-2 '>
        張貼動態
      </div>
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
          className='bg-darkGrey themeBorder rounded-default py-4 px-[130px] mx-auto self-center disabled:bg-white disabled:text-borderGrey disabled:border-borderGrey'
          onClick={handleSumbit}
          disabled={!post.content}
        >
          送出貼文
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
