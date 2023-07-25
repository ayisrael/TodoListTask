import { gql } from 'apollo-server-express';
import { MyDataSource } from '../app';
import { Task } from '../entity/todoTask';

//resolvers logic
export const resolvers = {
  
  Query: {
    tasks: async () => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const tasks = await tasksRepository.find({
        order: {
          id: 'ASC', 
        },
      });
      return tasks;
    },
  },

  Mutation: {
    addTask: async (_: any, { name }: { name: string }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const task = tasksRepository.create({ name, iscompleted: false });
      const newTask = await MyDataSource.getRepository(Task).save(task);
      return newTask;
    },
    deleteTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const deleteResult = await tasksRepository.findOne({ where: { id } });
      if (!deleteResult) {
        return false;
      }
      await tasksRepository.delete(id);
      return true;
    },
    toggleTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const task = await tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new Error('Task not found');
      }

      task.iscompleted = !task.iscompleted;
      await tasksRepository.save(task);
      return task;
    },
  },
};
