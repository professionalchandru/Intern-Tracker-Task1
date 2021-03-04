import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  studentRef: {
    type: String,
    required: true,
  },
  noOfTasks: {
    type: Number,
  },
  noOfTasksCompleted: {
    type: Number,
  },
  noOfTaskRemaining: {
    type: Number,
  },
  tasks: [
    {
      id: String,
      taskName: String,
      taskDescription: String,
      estimatedCompletionTime: String,
      completedTime: String,
      totalTimeTaken: String,
      isTaskCompleted: Boolean,
      isTaskDeleted: Boolean,
      workHistory: [
        {
          message: String,
          historyUpdatedAt: Date,
          timeSpent: String,
        },
      ],
    },
  ],
  isDeleted: {
    type: Boolean,
  },
  isCompleted: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdBy: {
    type: Object,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: Object,
  },
});

export default mongoose.model("project", projectSchema);
