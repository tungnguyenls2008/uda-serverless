import { todoModel } from '../../model/todo.js'
import { getUserId } from '../auth/jwt.js'

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const url=await todoModel.getPresignedUrl(todoId)
   //await todoModel.update({attachmentUrl:url},todoId, getUserId(event))
  await todoModel.updateImage(
    { attachmentUrl: url.split("?")[0] },
    todoId,
    getUserId(event))

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: url
    })
  }
}

