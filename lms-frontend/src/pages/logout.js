import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, []);

  return null;
}

export default Logout;
