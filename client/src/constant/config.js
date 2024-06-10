export const baseUrl = 'http://localhost:3333/';
// export const baseUrl = 'https://api.matheusmolokai.com.br/api/';
export const apiUrl = baseUrl;
export const getCurrentUser = () => {
  let user = null;
  try {
    user = localStorage.getItem('activeUser') != null ? JSON.parse(localStorage.getItem('activeUser')) : null;
  } catch (error) {
    console.log(">>>> src/utils/index.js : getCurrentUser -> error", error)
    user = null;
  }
  return user;
}

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.log(">>>> src/utils/index.js : setCurrentUser -> error", error)
  }
}
