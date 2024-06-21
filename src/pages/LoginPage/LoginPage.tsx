import WallWrapper from '../../components/WallWrapper';

const LoginPage = () => {
  return (
    <WallWrapper>
      <div className='flex justify-center items-center'>
        <div className='py-72px px-12 themeBorder flex gap-x-8'>
          <img src='src/assets/images/loginImg.svg' alt='' />
          <div className=''>
            <h1 className='text-60px  font-extrabold text-navy'>Meta Wall</h1>
            <h2 className='font-bold mb-9'>到元宇宙展開全新社交圈</h2>
            <input type='text' />
          </div>
        </div>
      </div>
    </WallWrapper>
  );
};
export default LoginPage;
