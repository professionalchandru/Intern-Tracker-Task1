export default {
  // Students url constants
  createStudent: "/register",
  loginStudent: "/login",
  editStudent: "/edit/:id",
  deleteStudent: "/delete/:id",
  restoreStudent: "/restore/:id",
  permenantDeleteStudent: "/permenantDelete/:id",

  // Project and tasks url constants
  createProject: "/create",
  editProject: "/edit/:projectId",
  deleteProject: "/delete/:projectId",
  updateProjectStatus: "/status/update/:projectId",
  addTask: "/:projectId/task/add",
  updateTaskStatus: "/:projectId/task/update/:taskId",
  deleteTask: "/:projectId/task/delete/:taskId",
};
