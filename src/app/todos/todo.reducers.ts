
import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { TodoListComponent } from './todo-list/todo-list.component';
import { borrar, toggleAll, crear, editar, toogle,clearComplete } from './todo.actions';

 
export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del Capitan America'),
] ;
 
const _todoReducer = createReducer(estadoInicial,
  on(crear, (state,{texto}) => [...state,new Todo(texto)]),
  on(borrar,(state,{id}) => state.filter( todo => todo.id !== id)),
  on(clearComplete,(state)=> state.filter(todo => !todo.completado)),
  on(toggleAll,(state,{completado})=> {
    return state.map( todo => {

      return {
        ...todo,
        completado:completado
      }
    
    })
  }),
  on(toogle, (state,{id}) => {
    return state.map( todo => {
       if (  todo.id === id){
         return {
           ...todo,
           completado:!todo.completado
         }
       } else {
        return todo;
       }
    })
  }),
  on(editar, (state,{ id ,texto}) => {
    return state.map( todo => {
       if (  todo.id === id){
         return {
           ...todo,
           texto:texto
         }
       } else {
        return todo;
       }
    })
  }),
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}