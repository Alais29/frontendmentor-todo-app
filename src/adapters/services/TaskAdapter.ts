import { ITask, ITaskWitId } from '../../common/interfaces'
import { ItaskAdapter } from '../../ports/ITaskAdapter'
import { ItaskRepository } from '../../ports/ITaskRepository'

export class TaskAdapter implements ItaskAdapter {
  repository: ItaskRepository

  constructor(repository: ItaskRepository) {
    this.repository = repository
  }

  getTasks(): Promise<ITaskWitId[]> {
    return this.repository.get()
  }

  createTask(task: ITask): Promise<ITaskWitId> {
    return this.repository.create(task)
  }

  updateTask(taskId: string, data: Partial<ITask>): Promise<ITaskWitId> {
    return this.repository.update(taskId, data)
  }

  deleteTask(taskId: string): Promise<void> {
    return this.repository.delete(taskId)
  }
}
