export default {
  // Students url constants
  createStudent: "/register",
  loginStudent: "/login",
  editStudent: "/edit/:id",
  deleteStudent: "/delete/:id",
  restoreStudent: "/restore/:id",
  permenantDeleteStudent: "/permenantDelete/:id",
  getAllStudent: "/getAll",

  // Project url constants
  createProject: "/create",
  editProject: "/edit/:projectId",
  deleteProject: "/delete/:projectId",
  restoreProject: "/restore/:projectId",
  permenantDeleteProject: "/permenantDelete/:projectId",
  getAllProjects: "/getAll",
  getProjectById: "/get/:projectId",
  // updateProjectStatus: "/status/update/:projectId",

  // Task url constants
  addTask: "/:projectId/task/add",
  updateWorkHistory: "/:projectId/task/updateHistory/:taskId",
  deleteTask: "/:projectId/task/delete/:taskId",
  restoreTask: "/:projectId/task/restore/:taskId",
  permenantDeleteTask: "/:projectId/task/permenantDelete/:taskId",
  getTaskById: "/:projectId/get/task/:taskId",
  // updateTaskStatus: "/:projectId/task/update/:taskId",

  studentProjectDetails: "/studentProjectDetails",
};
