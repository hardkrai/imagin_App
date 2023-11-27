import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import imaginvid from '../assets/imaginvid.mp4';
import imaginlogo from '../assets/imaginlogo3.svg';
import { FcGoogle } from 'react-icons/fc';
import { client } from '../client';

const Login= ( ) => {
  const navigate = useNavigate();

  // const onSuccess = (res) => {
  //   console.log('Login success! current user:', res.profileObj);
  //   localStorage.setItem('user', JSON.stringify(res.profileObj));

  //   // Redirect to the homepage
  //   navigate('/');
  // };

  // const onFailure = (res) => {
  //   console.log('Login failed! res:', res);
  // };

  const responseGoogle = (res) => {
    console.log("res", res);
    localStorage.setItem('user', JSON.stringify(res.profileObj));

    const { name, googleId, imageUrl } = res.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    console.log("doc", doc);

    client.createIfNotExists(doc)
      .then(() => {
        // Update user state after successful login
        // setUser(res.profileObj);
        // Redirect to the homepage
        navigate('/', { replace: true });
      });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={imaginvid}
          autoPlay
          muted
          loop
          type="video/mp4"
          controls={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 backdrop-blur-sm bg-blackOverlay">
          <div className="">
            <img className="flex justify-center items-center ml-auto mr-auto  transition-all ease-in-out duration-200 animate-spin-slow mb-80 mt-80" src={imaginlogo} width="150" alt="imaginlogo" />
            <div className="m-3"></div>
            <div id="signInButton">
              <div className="mt-80">
                <GoogleLogin
                  clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className=" border-lime-950 border-2 hover:border-2 hover:shadow-inner hover:shadow-orange-400 hover:border-orange-200 hover:text-lime-950 hover:border-1 hover:bg-orange-50  transition-all ease-in-out duration-200 text-orange-100  flex justify-center items-center p-2 rounded-full cursor-pointer font-semibold pr-4 "
                    >
                      <FcGoogle className="mr-4 hover:text-lime-950   p-1 text-3xl rounded-full" /> Sign In With Google
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
