import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksReposity } from './tasks.repository';
import { TaskStatus } from './tasks.schema';
import { TasksService } from './tasks.service';

/* For Testing purposes */
const mockService = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Test',
  id: 'someId',
  password: 'something',
  tasks: [],
};

describe('TasksService', () => {
  let service;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TasksService, useFactory: mockService }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('Get All tasks from the tasks repository', async () => {
      service.getTasks.mockResolvedValue('someVal');
      const tasks = await service.getTasks(
        { status: TaskStatus.OPEN, search: '' },
        mockUser,
      );
      console.log(tasks);
      expect(tasks).toEqual('someVal');
    });
  });
});
