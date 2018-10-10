import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const TodoEditForm = (props) => {
  return (
    <form id="EditTodoForm" onSubmit={props.editTodo}>
    <input type="hidden" value={props.todoData._id} name="id"/>
    <FieldGroup
      name="todoText"
      defaultValue={props.todoData.todoText}
      type="text"
      label="Work Headline"
      placeholder="Enter Your Work Headline"
    />       
    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Work Description</ControlLabel>
      <FormControl name="todoDesc" defaultValue={props.todoData.todoDesc} componentClass="textarea" placeholder="Enter Your Work Description" />
    </FormGroup>
    <Button type="submit">Submit</Button>
    </form>
  );
}
export default TodoEditForm;