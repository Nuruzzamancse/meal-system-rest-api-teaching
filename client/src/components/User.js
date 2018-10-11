import React from 'react';
export default class User extends React.Component {
  componentDidMount(){
    this.props.mappedfetchUser(this.props.params.id);
  }
render(){
    const todoState = this.props.mappedTodoState;
    console.log(todoState);
    return(
      <div className="todoDetail">
       <h2>Todo Detail</h2>
         {!todoState.todo && todoState.isFetching &&
           <div>
             <p>Loading todo....</p>
           </div>
         }
       {todoState.todo && !todoState.isFetching &&
         <div>
           <h3>{todoState.todo.todoText}</h3>
           <p>{todoState.todo.todoDesc}</p>
         </div>
       }
      </div>
    );
  }
}