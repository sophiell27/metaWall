import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface IProps {
  senderId: string;
  senderName: string;
  postId: string;
}
const NotificationItem = ({ senderId, senderName, postId }: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Link to={`/${senderId}`} className='text-navy'>
        {senderName}{' '}
      </Link>
      {t('message.likeYour')}
      <Link to={`/post/${postId}`} className='text-navy'>
        {t('message.post')}
      </Link>
    </>
  );
};

export default NotificationItem;
