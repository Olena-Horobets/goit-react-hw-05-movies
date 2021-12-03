import { getGuestSessionId } from 'services/serviceAPI';

(function fetchSessionId() {
  const getNewSession = () => {
    getGuestSessionId().then(data =>
      localStorage.setItem('session', JSON.stringify(data)),
    );
  };

  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) {
    getNewSession();
  } else {
    const dateNow = new Date();
    const expireDate = new Date(session.expires_at);
    dateNow >= expireDate ?? getNewSession();
  }
})();
