import { LoadingOverlay } from "features/loading";

interface Props extends React.ComponentProps<'div'> {
  msg: string
}

const ToastMsg:React.FC<Props> = ({msg}: Props) => {
  return ( 
      <LoadingOverlay fadeOut={false} msg={msg}/>
   );
}
 
export default ToastMsg;