import { useContext, useEffect, useRef, useState, JSX, useCallback } from "react";
import { LoadingConfig, LoadingContext } from "./LoadingContext";
import useTimeSince from "./useTimeSince";

type LoadItemProps = {
  children: React.ReactNode;
  fallback?: JSX.Element;
  onMount?: Function,
  onLoaded?: Function,
  isLoaded?: boolean
}

type LoadingEffectReturn = {
  complete: ()=>void,
  loading: ()=>void,
  LoadItem: (props: LoadItemProps) => JSX.Element
}

type LoadingEventFunctions = {
  onLoaded?: Function,
  onMount?: Function
}

const useLoadingEffect = (initialLoadValue: boolean): LoadingEffectReturn => {
  const {
     loadingState,
     setComponentLoadingState,
     fallback,
     config
  } = useContext(LoadingContext);

  const [_config, setConfig] = useState<LoadingConfig>(config);
  const eventFunctions = useRef<LoadingEventFunctions>({onLoaded:undefined, onMount:undefined});
  

  const timeLoading = useTimeSince();
  const prevIsLoadingRef = useRef(initialLoadValue);
  const prevIsMountedRef = useRef(!initialLoadValue);
  
  const {isComponentMounted, isLoading} = loadingState;
  const {delay, minLoading} = _config;

  const mountingDelay = Math.max(minLoading - timeLoading.get(), 0) + delay;
  

  useEffect(() => {
    const justStartedLoading = isLoading && prevIsLoadingRef.current === false;
    const justLoaded = !isLoading && prevIsLoadingRef.current === true;

    const {onLoaded} = eventFunctions.current;
    if(justStartedLoading){ //go back into loading state when isLoading changes to true
      setComponentLoadingState((prev) => ({
        ...prev,
        isComponentMounted: false
      }))
      
      timeLoading.reset();
    } else{
      if(justLoaded && onLoaded){ 
        onLoaded();
      }
    }
    prevIsLoadingRef.current = isLoading;
  },[isLoading, minLoading, timeLoading, setComponentLoadingState])


  useEffect(() => {
    const justMounted = isComponentMounted && prevIsMountedRef.current === false
    const {onMount} = eventFunctions.current
    if(justMounted && onMount){
      onMount();
    }
    prevIsMountedRef.current = isComponentMounted;
  }, [isComponentMounted]);


  const  mountComponent = useCallback(() => {
    const {onLoaded} = eventFunctions.current;
    const mount = ()=> {
      return setComponentLoadingState({
        isLoading: false,
        isComponentMounted: true
      });
    };

    //onLoad lifecycle occurs between load complete and component mounting
    if(onLoaded) {
      onLoaded()
    };

    if(mountingDelay){
      setTimeout(mount, mountingDelay);
      return;
    }
    mount()
  },[mountingDelay, setComponentLoadingState])


  const loading = useCallback((config?: LoadingConfig) => {
    if(isLoading && !isComponentMounted) return;
    setComponentLoadingState({
      isLoading: true,
      isComponentMounted: false
    })
    setConfig((prev) => ({...prev, ...config}));
  },[isLoading, isComponentMounted, setComponentLoadingState])


  const complete = useCallback(() => {
    if(!isLoading && isComponentMounted) return;
    mountComponent();
  },[isLoading, isComponentMounted, mountComponent])
  

  const LoadItem = useCallback(({children, fallback: priorityFallback, onLoaded, onMount, isLoaded}: LoadItemProps) =>{
    eventFunctions.current = {...eventFunctions.current, onLoaded, onMount};
    const _fallback = priorityFallback || fallback;
    // just render component if already mounted
    if(isComponentMounted){
      return (<>{children}</>)
    }

    //first time mounting after loading state. Factor delay for fade out effect
    // go ahead and render if no delay configured
    //? direct render here causes onLoaded to run after mount, but not believed to be an issue
    if(isLoaded){
      const justLoaded = prevIsLoadingRef.current === true
      if(justLoaded) {
        //! mountComponent();   cannot mount in render. update to still incorporate delay
        if(!mountingDelay){
          return ( <>{children}</>)
        }
      }
      return ( <>{children}</>)
    }
    return (<>{_fallback}</>)
  }
  ,[isComponentMounted, fallback, mountingDelay, ])

  return ( {
    complete,
    loading,
    LoadItem
  } );
}
 
export default useLoadingEffect;