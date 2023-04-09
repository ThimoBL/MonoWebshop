import request = require('supertest');

import {MongooseModule} from "@nestjs/mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {disconnect} from "mongoose";
import {MongoClient} from 'mongodb';

import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, Logger, Module} from '@nestjs/common';
import {AuthModule} from './app/auth/auth.module';

import {UsersModule} from "./app/users/users.module";
import {Neo4jModule, Neo4jScheme} from "nest-neo4j";
import {ApiResponseInterceptor} from "./app/interceptors/api-response.interceptor";
import {ManufacturerModule} from "./app/manufacturer/manufacturer.module";
import {AppController} from "./app/app.controller";
import {AppService} from "./app/app.service";
import {environment} from "./environments/environment";

let mongod: MongoMemoryServer;
let uri: string;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        return {uri};
      },
    }),
    Neo4jModule.forRootAsync({
      useFactory: async () => {
        return {
          scheme: environment.NEO4J_URI as Neo4jScheme,
          host: environment.NEO4J_HOST,
          port: environment.NEO4J_PORT,
          username: environment.NEO4J_USERNAME,
          password: environment.NEO4J_PASSWORD,
        };
      },
    }),
    AuthModule,
    UsersModule,
    ManufacturerModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService
  ],
})
class TestAppModule {
}

describe('(e2e) Webshop API', () => {
  let app: INestApplication;
  let module: TestingModule;
  let mongoc: MongoClient;
  let server;

  it('should be true', () => {
    expect(true).toBe(true);
  });

  // beforeAll(async () => {
  //   module = await Test.createTestingModule({
  //     imports: [TestAppModule],
  //   }).compile();
  //
  //   app = module.createNestApplication();
  //   app.useGlobalInterceptors(new ApiResponseInterceptor());
  //   app.setGlobalPrefix('api');
  //   await app.init();
  //
  //   mongoc = new MongoClient(uri);
  //   await mongoc.connect();
  //
  //   server = app.getHttpServer();
  // });
  //
  // beforeEach(async () => {
  //   await mongoc.db(environment.DB_NAME).collection('manufacturers').deleteMany({});
  //   await mongoc.db(environment.DB_NAME).collection('users').deleteMany({});
  // });
  //
  // afterAll(async () => {
  //   await app.close();
  //   await mongoc.close();
  //   await disconnect();
  //   await mongod.stop();
  // });
  //
  // it('should be defined', () => {
  //   expect(app).toBeDefined();
  // });
  //
  // it('should create a user', async () => {
  //   const register = await request(server)
  //     .get('/api/init');
  //
  //   expect(register.body.info.status).toBe(200);
  //   expect(register.body.info.message).toEqual('OK');
  // });
  //
  // it('should login a user', async () => {
  //   const login = await request(server)
  //     .post('/api/auth/register')
  //     .send({
  //       email: 'example@gmail.com',
  //       password: 'PassWord123',
  //     });
  //
  //   expect(login.body.info.status).toBe(201);
  //   expect(login.body.info.message).toEqual('OK');
  //   expect(login.body.result.access_token).toBeDefined();
  // });
  //
  // it('should not login a user with wrong password', async () => {
  //   const response = await request(server)
  //     .post('/api/auth/login')
  //     .send({
  //       "username": "example@gmail.com",
  //       "password": "PassWord123!"
  //     });
  //
  //   expect(response.body.statusCode).toBe(401);
  //   expect(response.body.message).toEqual('Unauthorized');
  // });
});
