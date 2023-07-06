import { ITask, ITaskWitId } from '../../common/interfaces'
import { Task } from '../../core/Task'
import { ItaskRepository } from '../../ports/ITaskRepository'

export class LocalStorageTasksRepository implements ItaskRepository {
  private tasks: ITaskWitId[]

  constructor() {
    const tasks: ITaskWitId[] = window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') as string)
      : []

    this.tasks = tasks.map(
      (task: ITaskWitId) => new Task(task.id, task.title, task.completed),
    )
  }

  get(): Promise<ITaskWitId[]> {
    return new Promise((res) => res(this.tasks))
  }

  create(task: ITask): Promise<ITaskWitId> {
    const newTask = new Task(Date.now().toString(), task.title, task.completed)

    this.tasks.push(newTask)
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    return new Promise((res) => res(newTask))
  }

  update(taskId: string, data: Partial<ITask>): Promise<ITaskWitId> {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId)

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...data }
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks))

    return new Promise((res) => res(this.tasks[taskIndex]))
  }

  delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id)

    this.tasks.splice(taskIndex, 1)
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    return new Promise((res) => res())
  }
}
