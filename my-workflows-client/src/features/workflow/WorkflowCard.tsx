import { Workflow } from "app/services/workflow";
import { ItemContainer } from "features/ui";
import CardHeader from "features/ui/shared/CardHeader";
import ColumnHeader from "features/ui/table/ColumnHeader";
import TableCell from "features/ui/table/TableCell";
import { Fragment } from "react";
import { ActionMenu } from "features/ui/ActionMenu";

interface Props {
  workflows: Workflow[]
}


const enUSFormatter = new Intl.DateTimeFormat('en-US');

const actions = [
  {
    action: 'edit',
    to: '/workflow'
  },
  {
    action: 'copy',
    to: '/workflow'
  },
  {
    action: 'delete',
    fn: ()=> null
  },
  {
    action: 'deploy',
    to: '/workflow'
  },

]

const WorkflowCard = ({workflows}: Props) => {
  
  return(
    <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[488px]">
    <CardHeader>My Workflows</CardHeader> 
    <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit w-">
      <div className={`grid w-fit min-h-[288px]
        grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(5rem,8rem)]
        lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8rem)] 
         content-start
      `}>
          <div className=""></div>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Description</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
          <ColumnHeader>Duration</ColumnHeader>
          <ColumnHeader>Owner</ColumnHeader>
          <ColumnHeader>Last Modified</ColumnHeader>
          {workflows.map((workflow) => {
            console.log(workflow.updatedAt)
           return (
            <Fragment key={workflow.workflowID}>
              <TableCell><ActionMenu actions={actions} /></TableCell>
              <TableCell>{workflow.name}</TableCell>
              <TableCell>{workflow.description}</TableCell>
              <TableCell>{workflow.status}</TableCell>
              <TableCell>{workflow.duration}</TableCell>
              <TableCell>{workflow.owner}</TableCell>
              <TableCell>{workflow.updatedAt.toISOString()}</TableCell>
            </Fragment>
           ) 
          })}
      </div>
    </div>
  </ItemContainer>
  )
}
 
export default WorkflowCard;