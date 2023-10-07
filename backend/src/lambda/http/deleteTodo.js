import { todoModel } from '../../model/todo.js'
import { getUserId } from '../auth/jwt.js'

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)
  await todoModel.delete(todoId, getUserId(event))
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(todoModel.delete(todoId, userId))
  }
}

