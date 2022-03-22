import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "People";

interface IEntity {
  firstName: string;
  lastName: string;
  hobby: string;
}

class EntityService {
  public async getEntities() {
    const params = {
      TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    return characters;
  }

  public async getEntityById(id: string) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.get(params).promise();
  }

  public async addOrUpdateEntity(entity: IEntity) {
    const params = {
      TableName: TABLE_NAME,
      Item: entity,
    };
    return await dynamoClient.put(params).promise();
  }

  public async deleteEntity(id: string) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.delete(params).promise();
  }
}

export const entityService = new EntityService();
