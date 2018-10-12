import React from 'react';
import { Navbar,Nav,NavItem,
         ButtonToolbar, Button, Modal, Grid, 
         Row, Col, FormGroup, ControlLabel, 
         FormControl, HelpBlock,
         MenuItem,NavDropdown
        } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

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

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.login = this.login.bind(this);
    this.siginIn = this.siginIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.loginPress = this.loginPress.bind(this);
    this.logout  = this.logout.bind(this);
    this.signUpPress = this.signUpPress.bind(this);

    this.state = {
      show: false,
      signIn : true,
      signUp: false,
      logIn: false
    };

  }

logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();
  }

siginIn(){
  console.log('Sing in click');
  this.setState({signIn: true, signUp: false})
}
loginPress(){
  console.log('In login');
  this.setState({logIn: true, show: false});
  const form = document.getElementById('loginUserForm');
  if(form.email.value !== ""  && form.password.value !== ""){
    const data = new FormData();
    data.append('email', form.email.value);
    data.append('password', form.password.value);
    this.props.mappedAddUser(data);
  }
  else{
    return ;
  }
}

signUp(){
  console.log('Click');
  this.setState({signIn: false, signUp: true});
}
signUpPress(){
  console.log('Register');
  const form = document.getElementById('userRegistrationForm');
  console.log(form);
  if(form.email.value !== ""  && form.password.value !== ""){
    const data = new FormData();
    data.append('email', form.email.value);
    data.append('password', form.password.value);
    data.append('name', form.name.value);
    data.append('username', form.username.value);
    this.props.mappedRegisterUser(data);
    console.log(data);
  }
  else{
    return ;
  }
  
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
              <form id="loginUserForm" onSubmit={this.loginPress}>
              <FieldGroup
                id="formControlsEmail"
                type="email"
                name="email"
                label="Email address"
                placeholder="Enter email"
              />
              <FieldGroup id="formControlsPassword" name="password" label="Password" type="password" />
              <Button bsStyle="success" bsSize="large" block onClick = {this.loginPress}>Login</Button>
              <Button bsStyle="primary" block onClick = {this.signUp}>Signup</Button>
              </form>
            </div>:
            <div>
            <form id="userRegistrationForm" onSubmit={this.signUpPress}>

                <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="Name"
                  name = "name"
                  placeholder="Enter Your Name"
                />
                <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  name = "email"
                  label="Email address"
                  placeholder="Enter email"
                />
                <FieldGroup
                  id="formControlsEmail"
                  type="text"
                  name = "username"
                  label="Enter Your Username"
                  placeholder="Enter email"
                />
                <FieldGroup id="formControlsPassword" name = "password" label="Password" type="password" />
                <FieldGroup id="formControlsConfirmPassword" label="Confirm Password" type="password" />
                <Button bsStyle="primary" bsSize="large" block onClick = {this.signUpPress}>Signup</Button>
                <Button bsStyle="success"  block onClick = {this.siginIn}>Login</Button>
            </form>
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
    const token = localStorage.getItem('token');
    const name  = localStorage.getItem('name');
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
      { token && 
             <NavDropdown eventKey="4" title={name} id="nav-dropdown">
             <MenuItem eventKey="4.1">Profile</MenuItem>
             <MenuItem eventKey="4.2">Settins</MenuItem>
             <MenuItem divider />
             <MenuItem eventKey="4.3" onClick={this.logout}>Log out</MenuItem>
           </NavDropdown>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="container" style={{marginTop: '55px'}}>
   { token ? <div>{this.props.children}</div>:
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