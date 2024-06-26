import { ItemContainer, Spinner } from "features/ui";

interface Props {
  fadeOut: boolean,
  msg?: string
}

const LoadingOverlay = ({fadeOut, msg = "Loading"}: Props) => {

   return ( 
         <div className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`space-y-2 absolute inset-0`}/>
            <ItemContainer className={` bg-gradient-to-br from-secondary-6/40 via-secondary-8/60
               to-secondary-6/40 dark:from-dk-primary-8/20 dark:via-dk-secondary-7/40
               dark:to-dk-primary-8/20 shadow-secondary-8/80 flex items-center 
               justify-center w-full max-w-sm min-h-[18rem]`}>
               <div className="flex flex-col items-center justify-between w-full h-full p-4 space-y-6">
                  <span><Spinner/></span><span className="text-xl">{msg}</span>
               </div>
            </ItemContainer>
         </div>
      );
}
 
export default LoadingOverlay;