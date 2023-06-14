import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';

export const Form = ({editFormVisibility, editTodo, cancelUpdate}) => {

  // dispatch fonction de répartition pour répartir une action
  const dispatch = useDispatch();

  // état de la valeur todo pour le formulaire normal d'ajout de todo
  const [todoValue, setTodoValue]=useState('');

  // indiquer si quelqu'un modifie la valeur (à modifier) ​​dans le formulaire de mise à jour
  const [editValue, setEditValue]=useState('');

  // useEffect permet d'afficher la valeur (à modifier) ​​sous forme de mise à jour
  useEffect(()=>{
    setEditValue(editTodo.todo);
  },[editTodo])

  // normal ajouter todo soumettre
  const handleSubmit=(e)=>{
      e.preventDefault();
      let date = new Date();
      let time = date.getTime();
      let todoObj={
          id: time,
          todo: todoValue,
          completed: false
      }
      setTodoValue('');
      dispatch(addTodo(todoObj))
  }

  // soumettre le formulaire de mise à jour
  const editSubmit = (e) =>{
    e.preventDefault();
    let editedObj={
      id: editTodo.id,
      todo: editValue,
      completed: false
    }
    dispatch(handleEditSubmit(editedObj))
  }

  return (
    <>
      {editFormVisibility===false?(
        <form className='form-group custom-form' onSubmit={handleSubmit}>
          <label>Add your todo-items</label>
          <div className='input-and-btn'>
              <input type="text" className='form-control' required
              value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
              <button type="submit" className='btn btn-secondary btn-md ms-3'>ADD</button>
          </div>
        </form>
      ):(
        <form className='form-group custom-form' onSubmit={editSubmit}>
          <label>Update your todo-items</label>
          <div className='input-and-btn'>
              <input type="text" className='form-control' required
              value={editValue||""} onChange={(e)=>setEditValue(e.target.value)}/>
              <button type="submit" className='btn btn-secondary btn-md ms-3'>UPDATE</button>
          </div>
          <button type="button" className='btn btn-primary btn-md back-btn'
          onClick={cancelUpdate}>BACK</button>
        </form>
      )}
    </>
  )
}