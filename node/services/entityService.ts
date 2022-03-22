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

export interface IEntity {
  firstName: string;
  lastName: string;
  hobby: string;
  id?: string;
}

export const entityService = {
  async getEntities() {
    const params = {
      TableName: TABLE_NAME,
    };
    const entities = await dynamoClient.scan(params).promise();
    return entities;
  },

  async getEntityById(id: string) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.get(params).promise();
  },

  async addOrUpdateEntity(entity: IEntity) {
    const params = {
      TableName: TABLE_NAME,
      Item: entity,
    };
    return await dynamoClient.put(params).promise();
  },

  async deleteEntity(id: string) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.delete(params).promise();
  },
};

