import { todoModel } from '../../model/todo.js'
import { getUserId } from '../auth/jwt.js'

export async function handler(event) {
  console.log(event.pathParameters)
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  console.log(updatedTodo)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const result = await todoModel.update(updatedTodo, todoId, getUserId(event))
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    },
    body: JSON.stringify({ item: result }, null, 2)
  }
}
