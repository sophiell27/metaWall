import { Link } from 'react-router-dom';
import Avatar from '../Wall/components/Avatar';
import Photo from '../Wall/components/Photo';

const Header = () => {
  const user = {
    name: 'user',
    photo: '',
  } as const;

  return (
    <header className=' p-2 borderBottom '>
      <div className='container flex justify-between items-center'>
        <Link to='/metaWall-w4' className='font-bold'>
          MetalWall
        </Link>
        <div className='alignIcon'>
          <Avatar>
            <Photo imageUrl={user.photo} />
          </Avatar>
          <p className='pb-1 border-b-4 border-b-black '>Member</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
