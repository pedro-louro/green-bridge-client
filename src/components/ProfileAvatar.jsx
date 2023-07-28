import { Avatar } from '@chakra-ui/react';
import { getUser } from '../api/auth.api';
import { useEffect, useState } from 'react';

const ProfileAvatar = () => {
  const userId = localStorage.getItem('userId');
  const userIdLocal = localStorage.getItem('userId');
  const [userImg, setUserImg] = useState('');
  const fetchUser = async () => {
    const response = await getUser(userId);
    setUserImg(response.data.img);
  };

  useEffect(() => {
    fetchUser();
  }, [userIdLocal, fetchUser]);
  return (
    <Avatar
      size={'sm'}
      src={userImg}
    />
  );
};

export default ProfileAvatar;
