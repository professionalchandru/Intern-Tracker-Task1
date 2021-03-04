export interface projectInterface {
  projectName: string;
  studentRef: string;
  noOfTasks: number;
  noOfTasksCompleted: number;
  noOfTaskRemaining: number;
  isDeleted?: boolean;
  isCompleted?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface tasksInterface {
  id: string;
  taskName: string;
  taskDescription: string;
  estimatedCompletionTime: string;
  completedTime: string;
  totalTimeTaken: string;
  isTaskCompleted?: boolean;
  isTaskDeleted?: boolean;
  workHistory: [
    {
      message: string;
      historyUpdatedAt: string;
      timeSpent: string;
    }
  ];
}
