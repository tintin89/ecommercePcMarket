import {auth} from '../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/entrar",
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Correo no encontrado, intente otra vez!"];
        reject(err);
      });
  });
};