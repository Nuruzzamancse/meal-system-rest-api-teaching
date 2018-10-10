import React from 'react';
import { Navbar,Nav,NavItem, ButtonToolbar, Button, Modal, Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import TodoForm from './TodoForm';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddTodo = this.toggleAddTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.login = this.login.bind(this);
    this.siginIn = this.siginIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.loginPress = this.loginPress.bind(this);

    this.state = {
      show: false,
      signIn : true,
      signUp: false,
      logIn: false
    };

  }
toggleAddTodo(e){
    e.preventDefault();
     this.props.mappedToggleAddTodo();
  }

  addTodo(e){
    e.preventDefault();
    const form = document.getElementById('addTodoForm');
    if(form.todoText.value !== ""  && form.todoDesc.value !== ""){
      const data = new FormData();
     data.append('todoText', form.todoText.value);
      data.append('todoDesc', form.todoDesc.value);
      this.props.mappedAddTodo(data);
      this.props.mappedToggleAddTodo();

    }
    else{
      return ;
    }
}

siginIn(){
  console.log('Sing in click');
  this.setState({signIn: true, signUp: false})
}
loginPress(){
  console.log('In login');
  this.setState({logIn: true})
}

signUp(){
  console.log('Sign up clicked');
  this.setState({signIn: false, signUp: true})
}

handleShow() {
  this.setState({ show: true });
}

handleHide() {
  this.setState({ show: false });
}

login(){
  return(
    <ButtonToolbar>
        <Button bsStyle="primary" bsSize="large" block onClick={this.handleShow}>
          Clicke Here To Login / Signup
        </Button>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton style ={{background:'rgb(66, 209, 244)'}}>
            <Modal.Title id="contained-modal-title-lg contained-modal-title">
              { this.state.signIn ? 'Sign In' : 'Sign Up' }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.signIn ? <div>
              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Enter email"
              />
              <FieldGroup id="formControlsPassword" label="Password" type="password" />
              <Button bsStyle="success" bsSize="large" block onClick = {this.loginPress}>Login</Button>
              <Button bsStyle="primary" block onClick = {this.signUp}>Signup</Button>
            </div>:
            <div>
                <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="Name"
                  placeholder="Enter Your Name"
                />
                <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                />
                <FieldGroup id="formControlsPassword" label="Password" type="password" />
                <FieldGroup id="formControlsConfirmPassword" label="Confirm Password" type="password" />
                <Button bsStyle="primary" bsSize="large" block onClick = {this.signUp}>Signup</Button>
                <Button bsStyle="success"  block onClick = {this.siginIn}>Login</Button>
            </div>
          }
             
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
  )
}

render(){
    const appState = this.props.mappedAppState;
    return(
      <div className="bg">
      <Navbar inverse  collapseOnSelect className="customNav">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/#">World</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={{ pathname: '/', query: {  } }}>
           <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
      {this.state.logIn && 
      <LinkContainer to={{ pathname: '/', query: {  } }} onClick={this.toggleAddTodo}>
         <NavItem eventKey={1}>Work</NavItem>
      </LinkContainer>
      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="container">
  {/* <BackgroundSlideshow style={{zIndex: '-5'}} images={[ image1, image2, image3 ]} /> */}
  {appState.showAddTodo &&
    <TodoForm addTodo={this.addTodo} />
  }
  { /* Each Smaller Components */}
   {this.state.logIn ? <div>{this.props.children}</div>:
   <div>
    <Grid >
   <Row className="show-grid" style={{marginTop: '200px'}}>
        <Col xs={1} md={4}></Col>
            <Col xs={4} md={4}>{ this.login() }</Col>
        <Col xs={1} md={4}></Col>
    </Row>

   <Row className="show-grid" style={{marginTop: '120px'}}>
        <Col xs={1} md={4}></Col>
            <Col xs={4} md={4}><h2 style={{color:'white'}}><b>Welcome to Our World!!</b></h2></Col>
        <Col xs={1} md={4}></Col>
    </Row>
   </Grid>
   </div>}
  </div>
 </div>
    );
  }
}