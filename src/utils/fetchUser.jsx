export const fetchUser = () => {
    const userInfo = localStorage.getItem('user');
  
    // Check if userInfo is not 'undefined' (as a string) and not null
    if (userInfo && userInfo !== 'undefined') {
      return JSON.parse(userInfo);
    } else {
      // If userInfo is 'undefined' (as a string) or null, clear the local storage
      localStorage.clear();
      return null;
    }
  };
  