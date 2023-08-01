import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import useLoading from "features/loading/useLoading";
import WorkflowCard from "features/workflow/WorkflowCard";

const Workflow = () => {
  const navigate = useNavigate();
  const {Loading, setLoading, isLoading, config} = useLoading(true);
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized, isFetching} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  useEffect(() => {
    if(!isFetching){
      setLoading(isLoadingUser || isFetching)
      return;
    } 
    setLoading(false)
  }, [isUninitialized, isLoadingUser, isFetching, isLoading, setLoading]);

  return (  
    <Loading
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      isLoading={isLoading}
      delay={FADE_OUT_DELAY}
      minLoading={MIN_LOADING}
      onLoaded={()=> setIsFadingOut(true)}
      {...config}
    >
      <div className="flex items-start w-full h-full justify-stretch md:justify-start pt-28">
        <WorkflowCard/>);
      </div>
    </Loading>
  )
}
 
export default Workflow;