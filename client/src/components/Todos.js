import React from 'react';
import { Alert,Glyphicon,Button,Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import TodoEditForm from './TodoEditForm';
import { BootstrapTable , TableHeaderColumn, headerColumnClassNameFormat} from 'react-bootstrap-table';

function buttonFormatter(cell, row){
  return '<Button type="submit">Submit</Button>';
}

export default class Todos extends React.Component {
  constructor(props){
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditTodo = this.submitEditTodo.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteTodo = this.cofirmDeleteTodo.bind(this);
  }
componentWillMount(){
    this.props.fetchTodos();
  }
showEditModal(todoToEdit){
     this.props.mappedshowEditModal(todoToEdit);
  }
hideEditModal(){
     this.props.mappedhideEditModal();
  }
submitEditTodo(e){
    e.preventDefault();
    const editForm = document.getElementById('EditTodoForm');
    if(editForm.todoText.value !== ""){
      console.log(editForm.id.value);
      const data = new FormData();
      data.append('id', editForm.id.value);
     data.append('todoText', editForm.todoText.value);
      data.append('todoDesc', editForm.todoDesc.value);
      this.props.mappedEditTodo(data, editForm.id.value);
    }
    else{
      return;
    }
}
hideDeleteModal(){
  this.props.mappedhideDeleteModal();
}
showDeleteModal(todoToDelete){
  this.props.mappedshowDeleteModal(todoToDelete);
}
cofirmDeleteTodo(){
this.props.mappedDeleteTodo(this.props.mappedTodoState.todoToDelete);
}

renderShowsTotal(start, to, total) {
  return (
    <p style={ { color: 'blue' } }>
      From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
    </p>
  );
}

render(){


    const todoState = this.props.mappedTodoState;
    const todos = todoState.todos;
    const editTodo = todoState.todoToEdit;

  console.log(todos);

    const options = {
      page: 2,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: todos.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'top'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };


    return(
      <div className="col-md-12">
      <h3 className="centerAlign">Works</h3>
      {!todos && todoState.isFetching &&
        <p>Loading todos....</p>
      }
      {todos.length <= 0 && !todoState.isFetching &&
        <p>No Todos Available. Add A Todo to List here.</p>
      }
      {todos && todos.length > 0 && !todoState.isFetching &&
      <table className="table booksTable">
      <BootstrapTable data={ todos.map( item=>{
        return({
          _id: item.id,
          todoText: item.todoText,
          todoDesc: item.todoDesc,
          edit: <Button>Edit</Button>,
        })
      }) } pagination={ true } options={ options } exportCSV
          tableHeaderClass='my-header-class'
          tableBodyClass='my-body-class'
          containerClass='my-container-class'
          tableContainerClass='my-table-container-class'
          headerContainerClass='my-header-container-class'
          bodyContainerClass='my-body-container-class'>
      <TableHeaderColumn dataField='id' isKey hidden></TableHeaderColumn>
      <TableHeaderColumn className='td-header-string-example' dataField='todoText'>Work</TableHeaderColumn>
      <TableHeaderColumn columnClassName='td-column-string-example' dataFormat={buttonFormatter}>Details</TableHeaderColumn>
      <TableHeaderColumn dataField='edit' dataFormat={buttonFormatter} >Edit</TableHeaderColumn>
      <TableHeaderColumn dataField='delete' dataFormat={buttonFormatter} >Delete</TableHeaderColumn>
      </BootstrapTable>

      </table>
    }
{/* Modal for editing todo */}
    <Modal
      show={todoState.showEditModal}
      onHide={this.hideEditModal}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton style={{color: 'black'}}>
        <Modal.Title id="contained-modal-title">Edit Your Work</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <div className="col-md-12">
    {editTodo  &&
    <TodoEditForm todoData={editTodo} editTodo={this.submitEditTodo} />
    }
    {editTodo  && todoState.isFetching &&
      <Alert bsStyle="info">
  <strong>Updating...... </strong>
      </Alert>
    }
    {editTodo  && !todoState.isFetching && todoState.error &&
      <Alert bsStyle="danger">
  <strong>Failed. {todoState.error} </strong>
      </Alert>
    }
    {editTodo  && !todoState.isFetching && todoState.successMsg &&
      <Alert bsStyle="success">
  Book <strong> {editTodo.todoText} </strong>{todoState.successMsg}
      </Alert>
    }
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.hideEditModal}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* Modal for deleting todo */}
    <Modal
    show={todoState.showDeleteModal}
    onHide={this.hideDeleteModal}
    container={this}
    aria-labelledby="contained-modal-title"
  >
    <Modal.Header closeButton style={{color: 'black'}}>
      <Modal.Title id="contained-modal-title">Delete Your Work</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {todoState.todoToDelete && !todoState.error && !todoState.isFetching &&
      <Alert bsStyle="warning">
 Are you sure you want to delete<strong>{todoState.todoToDelete.todoText} </strong> ?
</Alert>
    }
    {todoState.todoToDelete && todoState.error &&
      <Alert bsStyle="warning">
 Failed. <strong>{todoState.error} </strong>
</Alert>
    }
{todoState.todoToDelete && !todoState.error && todoState.isFetching &&
      <Alert bsStyle="success">
  <strong>Deleting.... </strong>
</Alert>
    }
{!todoState.todoToDelete && !todoState.error && !todoState.isFetching&&
      <Alert bsStyle="success">
 Todo <strong>{todoState.successMsg} </strong>
</Alert>
    }
    </Modal.Body>
    <Modal.Footer>
     {!todoState.successMsg && !todoState.isFetching &&
       <div>
       <Button onClick={this.cofirmDeleteTodo}>Yes</Button>
       <Button onClick={this.hideDeleteModal}>No</Button>
       </div>
    }
    {todoState.successMsg && !todoState.isFetching &&
      <Button onClick={this.hideDeleteModal}>Close</Button>
    }
    </Modal.Footer>
  </Modal>
      </div>
    );
  }
}