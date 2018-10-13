import React from 'react';
import { 
  Alert,Glyphicon,Button,Modal,
  FormGroup,ControlLabel,FormControl,
  HelpBlock,ButtonToolbar
 } from 'react-bootstrap';
import TodoEditForm from './TodoEditForm';
import { BootstrapTable , TableHeaderColumn, InsertButton} from 'react-bootstrap-table';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Todos extends React.Component {
  constructor(props){
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditTodo = this.submitEditTodo.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteTodo = this.cofirmDeleteTodo.bind(this);
    this.createCustomInsertButton = this.createCustomInsertButton.bind(this);
    this.work = this.work.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.showDetailModal = this.showDetailModal.bind(this);

    this.state ={
      show: false,
      detail: true
    }
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
  this.props.mappedhideEditModal();
    const editForm = document.getElementById('EditTodoForm');
    if(editForm.todoText.value !== ""){
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

buttonEdit(cell, row, enumObject, rowIndex){
  return (<Button onClick={() => this.showEditModal(row)} bsStyle="info" bsSize="xsmall">Edit <Glyphicon glyph="pencil" /></Button>);
}
buttonDelete(cell, row, enumObject, rowIndex){
  return (<Button onClick={() => this.showDeleteModal(row)} bsStyle="danger" bsSize="xsmall">Delete<Glyphicon glyph="trash" /></Button>);
}
buttonDetails(cell, row, enumObject, rowIndex){
  return (<Button onClick={() => this.showDetail(row._id)} bsStyle="info" bsSize="xsmall">Details <Glyphicon glyph="open-eye" /></Button>);
}

showDetail(id){
  this.props.mappedfetchTodoById(id);
  this.setState({detail: true})
}

hideDetail(){
  this.setState({detail: false})
}

renderShowsTotal(start, to, total) {
  return (
    <p style={ { color: 'white' } }>
      From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
    </p>
  );
}
handleHide(){
  this.setState({show: false})
}
handleShow(){
  this.setState({show: true})
}
work(){
  return(
      <ButtonToolbar>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton style ={{background:'rgb(66, 209, 244)'}}>
            <Modal.Title id="contained-modal-title-lg contained-modal-title">
              Add Your Work
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form id="addTodoForm" onSubmit={this.addTodo}>
              <FieldGroup
                name="todoText"
                type="text"
                label="Work Headline"
                placeholder="Enter Your Work Headline"
              />       
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Work Description</ControlLabel>
                <FormControl name="todoDesc" componentClass="textarea" placeholder="Enter Your Work Description" />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
  )
}

addTodo(e){
  e.preventDefault();
  this.setState({show: false})
  const form = document.getElementById('addTodoForm');
  if(form.todoText.value !== ""  && form.todoDesc.value !== ""){
    const data = new FormData();
   data.append('todoText', form.todoText.value);
   data.append('todoDesc', form.todoDesc.value);
   this.props.mappedAddTodo(data);
  }
  else{
    return ;
  }
}

createCustomInsertButton = (onClick) => {
  return (
    <InsertButton
    btnText='Add Work'
    btnContextual='btn-primary'
    className='my-custom-class'
    btnGlyphicon='glyphicon glyphicon-plus'
    onClick={ () => this.handleShow(onClick) }/>
  );
}

createCustomToolBar = props => {
  /**
   *  This function only pass one argument, is props object which has following properties
   *  
   *  {
   *    components: {  // here are all the components
   *      exportCSVBtn,  // export CSV button JSX
   *      insertBtn,  // insert button JSX
   *      deleteBtn,  // delete button JSX
   *      showSelectedOnlyBtn,  // show selected button JSX
   *      searchPanel,  // search panel JSX
   *      btnGroup,  // button groups JSX
   *      searchField,  // search field JSX
   *      clearBtn  // clear search field JSX
   *    },
   *    event: {  // here are all the related event you may use it
   *      openInsertModal,   // call it to open insert modal
   *      closeInsertModal,  // call it to close insert modal
   *      dropRow,   // call it to drop row
   *      showOnlyToogle,   // call it to toogle show only selections
   *      exportCSV,   // call it to export CSV file
   *      search  // call it with search text to search table
   *    }
   *  }
   *
   **/
  return (
    <div>
      <div style={{float: 'right', marginRight:'15px', marginBottom: '5px'}}>{ props.components.insertBtn  }</div>
      <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
      {  props.components.exportCSVBtn}
      </div>
    </div>
  );
}

showDetailModal(){
  const todoState = this.props.mappedTodoState;
  return(
    <Modal
    show={this.state.detail}
     onHide={this.hideDetail}
     container={this}
     dialogClassName="custom-modal"
     aria-labelledby="contained-modal-title"
   >
     <Modal.Header closeButton style ={{background:'rgb(66, 209, 244)'}}>
           <Modal.Title id="contained-modal-title-lg contained-modal-title">
             Your Work Details Here
           </Modal.Title>
         </Modal.Header>
   <Modal.Body>
 
   <h3>{todoState.todo.todoText}</h3>
   <p>{todoState.todo.todoDesc}</p>
     </Modal.Body>
     <Modal.Footer>
       <Button onClick={this.hideDetail}>Close</Button>
     </Modal.Footer>
   </Modal>
  )
}

render(){


    const todoState = this.props.mappedTodoState;
    const todos = todoState.todos;
    const editTodo = todoState.todoToEdit;

    const options = {
      toolBar: this.createCustomToolBar,
      page: 1,  // which page you want to show as default
      insertBtn: this.createCustomInsertButton,
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      },
      {
        text: '15', value: 15
      }, {
        text: 'All', value: todos.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };


    return(
      <div className="col-md-12">
      <h3 className="centerAlign" style={{color: 'white'}}>Works</h3>
      {!todos && todoState.isFetching &&
        <p>Loading todos....</p>
      }
      {todos.length <= 0 && !todoState.isFetching &&
        <p>No Todos Available. Add A Todo to List here.</p>
      }
      {todos && todos.length > 0 && !todoState.isFetching &&
      <table className="table booksTable">
     <BootstrapTable data={ todos.map( (item, index)=>{
        return({
          _id: item._id,
          todoText: item.todoText,
          todoDesc: item.todoDesc
        })
      }) } pagination={ true } options={ options } exportCSV
          insertRow
          bordered={ false }
          tableHeaderClass='my-header-class'
          tableBodyClass='my-body-class'
          containerClass='my-container-class'
          tableContainerClass='my-table-container-class'
          headerContainerClass='my-header-container-class'
          bodyContainerClass='my-body-container-class'
          className='account-manager-table'>
      <TableHeaderColumn hiddenOnInsert dataField='_id' isKey hidden></TableHeaderColumn>
      <TableHeaderColumn columnClassName='td-column-string-example' className='td-header-string-example' dataField='todoText'>Work</TableHeaderColumn>
      <TableHeaderColumn columnClassName='td-column-string-example' className='td-header-string-example-1' dataFormat={this.buttonDetails.bind(this)}>Details</TableHeaderColumn>
      <TableHeaderColumn hiddenOnInsert dataField='edit' dataFormat={this.buttonEdit.bind(this)} >Edit</TableHeaderColumn>
      <TableHeaderColumn hiddenOnInsert dataField='delete' dataFormat={this.buttonDelete.bind(this)}>Delete</TableHeaderColumn>
      </BootstrapTable>

      </table>
    }
{/* Modal for editing todo */}
    <Modal
      show={todoState.showEditModal}
      onHide={this.hideEditModal}
      container={this}
      dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton style ={{background:'rgb(66, 209, 244)'}}>
            <Modal.Title id="contained-modal-title-lg contained-modal-title">
              Add Your Work
            </Modal.Title>
          </Modal.Header>
    <Modal.Body>
    <div>
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
    <Modal.Header closeButton style ={{background:'rgb(183, 162, 25)'}}>
            <Modal.Title id="contained-modal-title-lg contained-modal-title">
              Delete Your Work
            </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {todoState.todoToDelete && !todoState.error && !todoState.isFetching &&
      <Alert bsStyle="warning">
 Are you sure you want to delete <strong>{todoState.todoToDelete.todoText} </strong> ?
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
  { this.work()}
  {
    todoState.todo && 
    this.showDetailModal()
  }
    </div>
    );
  }
}