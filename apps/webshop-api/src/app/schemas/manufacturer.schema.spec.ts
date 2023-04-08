import {Test} from '@nestjs/testing';
import {MongoMemoryServer} from "mongodb-memory-server";
import {disconnect, Model} from "mongoose";
import {User, UserSchema, UserDocument} from "./user.schema";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";

describe('Manufacturer Schema', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            return {uri: mongod.getUri()};
          }
        }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has required email field', async () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err).toBeInstanceOf(Error);
  });

  it('has unique email field', async () => {
    const original = new userModel(
      {
        "email": "example@gmail.com",
        "password": "PassWord123",
        "firstName": "firstName",
        "lastName": "lastName",
        "address": "address 12",
        "city": "city",
        "zipCode": "1234AB",
        "country": "country",
        "phone": "0612345678",
      }
    );
    const duplicate = new userModel(
      {
        "email": "example@gmail.com",
        "password": "PassWord123",
        "firstName": "firstName",
        "lastName": "lastName",
        "address": "address 12",
        "city": "city",
        "zipCode": "1234AB",
        "country": "country",
        "phone": "0612345678",
      }
    );
    await original.save();
    await expect(duplicate.save()).rejects.toThrow();
  });
});
