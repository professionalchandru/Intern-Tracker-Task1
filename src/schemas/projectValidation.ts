import {
  projectInterface,
  tasksInterface,
  workHistoryInterface,
} from "../modules/projectInterface";

/**
  Validation for create project
 */
export const validateCreateProject = ({
  projectName,
  studentRef,
}: projectInterface): boolean => {
  let resultFlag = true;

  if (
    projectName === undefined ||
    projectName.length === 0 ||
    studentRef === undefined ||
    studentRef.length === 0
  ) {
    resultFlag = false;
  }
  return resultFlag;
};

/**
 * Validation for edit project
 */
export const validateEditProject = ({
  projectName,
}: projectInterface): boolean => {
  let resultFlag = true;

  if (projectName === undefined || projectName.length === 0) {
    resultFlag = false;
  }
  return resultFlag;
};

/**
 * Validation for edit project
 */
export const validateAddTask = ({
  taskName,
  taskDescription,
  estimatedCompletionTime,
}: tasksInterface): boolean => {
  let resultFlag = true;

  if (
    taskName === undefined ||
    taskName.length === 0 ||
    taskDescription === undefined ||
    taskDescription.length === 0 ||
    estimatedCompletionTime === undefined ||
    estimatedCompletionTime.length === 0
  ) {
    resultFlag = false;
  }
  return resultFlag;
};

/**
 * Validation for Update Work History
 */
export const validateUpdateWorkHistory = ({
  message,
  isTaskCompleted,
  timeSpent,
}: workHistoryInterface): boolean => {
  let resultFlag = true;

  if (
    message === undefined ||
    message.length === 0 ||
    isTaskCompleted === undefined ||
    timeSpent === undefined ||
    timeSpent.length === 0
  ) {
    resultFlag = false;
  }
  return resultFlag;
};
