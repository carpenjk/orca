import { Task } from 'app/services/task';
import { User } from 'app/services/user';
import { Workflow, fieldSizes } from "app/services/workflow";
import { SubmitButton, MultilineTextInput, InputCell, InlineButton } from "features/ui";
import {ActionDropDown} from 'features/ui/ActionMenu';
import {SelectInput} from 'features/ui/shared';
import Table from 'features/ui/shared/Table';
import ColumnHeader from 'features/ui/table/ColumnHeader';
import TableCell from 'features/ui/table/TableCell';
import { Fragment } from 'react';
import { useWorkflow } from './useWorkflow';
import { SinglelineInput } from 'features/ui/shared';
import { getID, getPrefix } from 'utils/formFields';

type Props = {
  workflow?: Workflow,
  users: User[]
}

const getDisplayUsers = (users: User[]) => users.map((user) => ({
  value: user.userID , displayValue: user.name
}))

const getDisplayDependencies = (deps: Task[]) => deps.map((task) => ({
  value: task.taskID.toString(), displayValue:  task.name
}))
 

const WorkflowForm = ({workflow, users = []}: Props) => {
    const {
      formState,
      register,
      control,
      taskFields,
      saveWorkflow,
      createNewTask,
      copyTask,
      deleteTask
    } = useWorkflow(workflow);

    const newRowIndex = taskFields.length;
    const newIDPrefix = getPrefix('tasks', newRowIndex);
    const newNameID = getID(newIDPrefix, 'name');
    const newDescriptionID = getID(newIDPrefix, 'description');
    const newDependenciesID = getID(newIDPrefix, 'dependencies');;
    const newDueDayID = getID(newIDPrefix, 'dueDay');
    const newTaskOwnerID = getID(newIDPrefix, 'ownerID');
  
  return ( 
    
        <form className="w-full" onSubmit={saveWorkflow()}>
          <Table 
            className={`grid w-full
              grid-cols-[3.5rem_minmax(10.5rem,11.5rem)_minmax(15rem,1fr)_minmax(12rem,1fr)_minmax(5rem,_.5fr)_minmax(8.5rem,1fr)] 
              content-start`}
            maxHeightClassName='h-[calc(85vh-332px)] sm:h-[calc(85vh-364px)] lg:h-[calc(85vh-418px)] xl:h-[calc(85vh-266px)]'
            title='Tasks'
            actionComponent={
              <InlineButton type='button' onClick={createNewTask} className="absolute bottom-3 right-4 sm:right-8">
                New Task
              </InlineButton>
            }
            headers={
              <>
                <ColumnHeader></ColumnHeader>
                <ColumnHeader>Name</ColumnHeader>
                <ColumnHeader>Description</ColumnHeader>
                <ColumnHeader>Dependencies</ColumnHeader>
                <ColumnHeader>Due Day</ColumnHeader>
                <ColumnHeader>Owner</ColumnHeader>
              </>
            }
          >
            {taskFields.map((task, index) => {
              const idPrefix = getPrefix('tasks',index);
              const nameID = getID(idPrefix, 'name');
              const descriptionID = getID(idPrefix, 'description');
              const dependenciesID = getID(idPrefix, 'dependencies');;
              const dueDayID = getID(idPrefix, 'dueDay');
              const taskOwnerID = getID(idPrefix, 'ownerID');
              
              return (
                <Fragment key={task.id}>
                  <TableCell>
                    <ActionDropDown actions={[
                      {
                        action: 'edit',
                        to: '/workflow'
                      },
                      {
                        action: 'copy',
                        fn: ()=> copyTask(index),
                      },
                      {
                        action: 'delete',
                        fn: ()=> deleteTask({ taskID: Number(task.taskID), index: index }),
                      },
                      {
                        action: 'deploy',
                        to: '/workflow'
                      },
                    ]}/>
                  </TableCell>
                  <InputCell inputName={nameID}>
                    <TableCell>
                      <MultilineTextInput
                        id={nameID}
                        {...register(`tasks.${index}.name`, {required: true})}
                        control={control}
                        maxLength={fieldSizes.workflow.name}
                      />
                    </TableCell>
                  </InputCell>
                  <InputCell inputName={descriptionID}>
                    <TableCell>
                      <MultilineTextInput
                        id={descriptionID}
                        {...register(`tasks.${index}.description`, {required: true})}
                        control={control}
                        maxLength={fieldSizes.workflow.description}
                      />
                    </TableCell>
                  </InputCell>
                  <InputCell inputName={dependenciesID}>
                    <TableCell>
                      <SelectInput
                        id={dependenciesID}
                        {...register(`tasks.${index}.dependencies`, {required: true})}
                        control={control}
                        values={getDisplayDependencies(workflow?.tasks ?? [])}
                        multiple={true}
                        defaultValue={task.dependencies?.map(dep => dep.toString()) ?? []}
                      />
                    </TableCell>
                  </InputCell>  
                  <InputCell inputName={dueDayID}>
                    <TableCell>
                      <SinglelineInput
                        id={dueDayID}
                        {...register(`tasks.${index}.dueDay`, {required: true})}
                        defaultValue={task.dueDay === 0 ? undefined : task.dueDay.toString()}
                        pattern="\d*"
                        maxLength={fieldSizes.task.dueDay}
                        max={"9999"}
                        control={control}
                      />
                    </TableCell>
                  </InputCell>
                  <InputCell inputName={taskOwnerID} focusOnEsc>
                    <TableCell>
                      <SelectInput
                        id={taskOwnerID}
                        {...register(`tasks.${index}.ownerID`, {required: true})}
                        control={control}
                        values={getDisplayUsers(users)}
                        defaultValue={task.ownerID ?? []} // needed to prevent change from uncontrolled to controlled error
                      />
                    </TableCell>
                  </InputCell>
                </Fragment>
              )
            })}
            <Fragment key={taskFields.length -1}>
              <TableCell>
                <div>+</div>
              </TableCell>
              <InputCell inputName={newNameID}>
                <TableCell>
                  <MultilineTextInput
                    id={newNameID}
                    {...register(`tasks.${newRowIndex}.name`, {required: true})}
                    control={control}
                    maxLength={fieldSizes.workflow.name}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={newDescriptionID}>
                <TableCell>
                  <MultilineTextInput
                    id={newDescriptionID}
                    {...register(`tasks.${newRowIndex}.description`, {required: true})}
                    control={control}
                    maxLength={fieldSizes.workflow.description}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={newDependenciesID}>
                <TableCell>
                  <SelectInput
                    id={newDependenciesID}
                    {...register(`tasks.${newRowIndex}.dependencies`, {required: true})}
                    control={control}
                    values={getDisplayDependencies(workflow?.tasks ?? [])}
                    multiple={true}
                    defaultValue={[]}
                  />
                </TableCell>
              </InputCell>  
              <InputCell inputName={newDueDayID}>
                <TableCell>
                  <SinglelineInput
                    id={newDueDayID}
                    {...register(`tasks.${newRowIndex}.dueDay`, {required: true})}
                    defaultValue={ undefined}
                    pattern="\d*"
                    maxLength={fieldSizes.task.dueDay}
                    max={"9999"}
                    control={control}
                  />
                </TableCell>
              </InputCell>
              <InputCell inputName={newTaskOwnerID} focusOnEsc>
                <TableCell>
                  <SelectInput
                    id={newTaskOwnerID}
                    {...register(`tasks.${newRowIndex}.ownerID`, {required: true})}
                    control={control}
                    values={getDisplayUsers(users)}
                    defaultValue={[]} // needed to prevent change from uncontrolled to controlled error
                  />
                </TableCell>
              </InputCell>
            </Fragment>
          </Table>
          <div className="flex items-center justify-end w-full mt-3 space-x-6 lg:mt-6">
          <SubmitButton disabled={!formState.isDirty}>Save</SubmitButton>
          </div>
        </form>
   );
}
 
export default WorkflowForm;