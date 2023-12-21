import { useEffect, useState } from "react";
import { useLogoutMutation } from "app/services/auth";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { InlineLink } from "features/ui";
// import useLoading from "features/loading/useLoading";

const Logout = () => {
  const [logout, status] = useLogoutMutation();
  // const {Loading, setLoading, isLoading} = useLoading(true);
  const [isFadingOut, setIsFadingOut] =useState(false);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    async function asyncLogout(){
      try{
        const {message} = await logout().unwrap();
        setMessage(message);
      }catch(e){
        console.log(e);
      }
    }
    asyncLogout();
  }, [logout]);
  
  useEffect(() => {
    if(!status.isUninitialized){
      // setLoading(status.isLoading)
    }
    
  }, [status.isLoading, status.isUninitialized]);

  return ( 
  //   <Loading
  //   fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
  //   isLoading={isLoading}
  //   delay={FADE_OUT_DELAY}
  //   minLoading={MIN_LOADING}
  //   onLoaded={() => setIsFadingOut(true)}
  // >
        <div className="container flex flex-col items-center justify-center w-fill">
          <div>
            <h1>
            {message}
            </h1>
            <InlineLink to="/login">Go to login</InlineLink>
          </div>
        </div>
  // </Loading>
  )
}
 
export default Logout;