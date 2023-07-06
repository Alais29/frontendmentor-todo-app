import { ITask, ITaskWitId } from '../common/interfaces'

export interface ItaskRepository {
  get(): Promise<ITaskWitId[]>
  create(task: ITask): Promise<ITaskWitId>
  update(taskId: string, data: Partial<ITask>): Promise<ITaskWitId>
  delete(taskId: string): Promise<void>
}
