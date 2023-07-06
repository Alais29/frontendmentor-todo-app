export interface ITask {
  title: string
  completed: boolean
}

export interface ITaskWitId extends ITask {
  id: string
  toggle(): void
}
