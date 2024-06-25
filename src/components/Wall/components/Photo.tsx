import { IoPerson } from 'react-icons/io5';

const Photo = ({ imageUrl }: { imageUrl: string }) => {
    return imageUrl ? (
        <img src={imageUrl} alt='' className='w-full h-full object-cover' />
    ) : (
        <IoPerson />
    );
};

export default Photo;
