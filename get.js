import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
  const params = {
    TableName: process.env.tableName,
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: event.pathParameters.id
    }
  };

  try{
    const result = await dynamoDbLib.call("get", params);
    if (result.Item){
      return success(result.Item);
    }else{
      return failure({status: false, error: "item not found."});
    }
  } catch (e) {
    return failure({ status: false});
  }
}
