import { ITask, ITaskWitId } from '../common/interfaces'

export interface ItaskAdapter {
  getTasks(): Promise<ITaskWitId[]>
  createTask(task: ITask): Promise<ITaskWitId>
  updateTask(taskId: string, data: Partial<ITask>): Promise<ITaskWitId>
  deleteTask(taskId: string): Promise<void>
  deleteCompleted(tasksIds: string[]): Promise<void>
}
