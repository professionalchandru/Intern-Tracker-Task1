import utils from "../utils/common";
import projectModel from "../models/projectModel";
import { v4 as uuidv4 } from "uuid";
class ProjectController {
  /**
   * CREATE PROJECT
   */

  async createProject({ req }: any) {
    try {
      let createdBy = utils.createdBy({ req });

      const projectData = {
        projectName: req.body.projectName,
        studentRef: req.body.studentRef,
        noOfTasks: 0,
        noOfTasksCompleted: 0,
        noOfTaskRemaining: 0,
        isDeleted: false,
        isCompleted: false,
        createdAt: new Date(),
        createdBy,
      };

      //To check existing project
      const project = await projectModel.findOne({
        projectName: req.body.projectName,
      });

      if (project) {
        let response = {
          status: "Failure",
          statusCode: 409,
          message: "Project Already exist",
        };
        return response;
      }

      const projectObj = new projectModel(projectData);

      const newProject = await projectObj.save();

      let response = {
        status: "Success",
        statusCode: 200,
        message: newProject._id,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * EDIT PROJECT DETAILS
   */

  async editProject({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
        isDeleted: false,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Doesn't exist",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const projectData = {
        projectName: req.body.projectName,
        updatedAt: new Date(),
        updatedBy,
      };

      const newProject = await projectModel.updateOne(
        { _id: req.params.projectId },
        { $set: projectData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Details Updated Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * ADD NEW TASKS
   */

  async addTask({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.findOne({
        _id: req.params.projectId,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Doesn't exist",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const projectData = {
        id: uuidv4(),
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        estimatedCompletionTime: req.body.estimatedCompletionTime,
        isTaskCompleted: false,
        isTaskDeleted: false,
        createdAt: new Date(),
      };

      let noOfTasks: number = project.noOfTasks;
      let noOfTaskRemaining: number = project.noOfTaskRemaining;
      let isCompleted: boolean = project.isCompleted;

      noOfTasks += 1;
      noOfTaskRemaining += 1;

      if (noOfTaskRemaining > 0) {
        isCompleted = false;
      }
      await projectModel.updateOne(
        { _id: req.params.projectId },
        {
          $push: { tasks: projectData },
          $set: {
            noOfTasks,
            noOfTaskRemaining,
            isCompleted,
            updatedAt: new Date(),
            updatedBy,
          },
        }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Details Updated Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * UPDATE WORK HISTORY
   */

  async updateHistory({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.findOne({
        _id: req.params.projectId,
        tasks: { $elemMatch: { id: req.params.taskId } },
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Or Task Doesn't exist",
        };
        return response;
      }
      let updatedBy = utils.createdBy({ req });
      let noOfTasks: number = project.noOfTasks;
      let noOfTaskRemaining: number = project.noOfTaskRemaining;
      let noOfTasksCompleted: number = project.noOfTasksCompleted;

      if (req.body.isTaskCompleted == true) {
        noOfTaskRemaining -= 1;
        noOfTasksCompleted += 1;
      }
      let isCompleted = false;
      if (
        noOfTasks === noOfTasksCompleted &&
        noOfTaskRemaining === 0 &&
        !project.isCompleted
      ) {
        isCompleted = true;
      }

      let isTaskCompleted = false;
      if (req.body.isTaskCompleted) {
        isTaskCompleted = true;
      }

      await projectModel.updateOne(
        {
          _id: req.params.projectId,
          tasks: {
            $elemMatch: {
              id: req.params.taskId,
            },
          },
        },
        {
          $push: {
            "tasks.$[a].workHistory": {
              message: req.body.message,
              isTaskCompleted: req.body.isTaskCompleted,
              timeSpent: req.body.timeSpent,
              historyUpdatedAt: new Date(),
            },
          },
          $set: {
            noOfTasksCompleted,
            noOfTaskRemaining,
            isCompleted,
            updatedAt: new Date(),
            updatedBy,
            "tasks.$[a].isTaskCompleted": true,
          },
        },
        { arrayFilters: [{ "a.id": req.params.taskId }] }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Work History Updated Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * TEMPORARILY DELETE PROJECT
   */

  async tempDeleteProject({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
        isDeleted: false,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Doesn't exist",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const projectData = {
        isDeleted: true,
        updatedAt: new Date(),
        updatedBy,
      };

      await projectModel.updateOne(
        { _id: req.params.projectId },
        { $set: projectData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Moved To Trash Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * RESOTRE TEMPORARILY DELETED PROJECT DATA
   */

  async restoreProject({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
        isDeleted: true,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Doesn't exist to restore",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const projectData = {
        isDeleted: false,
        updatedAt: new Date(),
        updatedBy,
      };

      await projectModel.updateOne(
        { _id: req.params.projectId },
        { $set: projectData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Data Restored Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * PERMENENTLY DELETE PROJECT DATA
   */

  async deleteProject({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Project Doesn't exist",
        };
        return response;
      }

      await projectModel.deleteOne({ _id: req.params.projectId });

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Deleted Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * TEMPORARILY DELETE TASK
   */

  async tempDeleteTask({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
        isDeleted: false,
        tasks: { $elemMatch: { id: req.params.taskId, isTaskDeleted: false } },
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Task Doesn't exist",
        };
        return response;
      }

      await projectModel.updateOne(
        { _id: req.params.projectId },
        { $set: { "tasks.$[a].isTaskDeleted": true } },
        { arrayFilters: [{ "a.id": req.params.taskId }] }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Moved To Trash Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * RESOTRE TEMPORARILY DELETED TASK
   */

  async restoreTask({ req }: any) {
    try {
      //To check existing project
      const project = await projectModel.findOne({
        _id: req.params.projectId,
        isDeleted: false,
        tasks: { $elemMatch: { id: req.params.taskId, isTaskDeleted: true } },
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Task Doesn't exist to restore",
        };
        return response;
      }

      await projectModel.updateOne(
        { _id: req.params.projectId },
        { $set: { "tasks.$[a].isTaskDeleted": false } },
        { arrayFilters: [{ "a.id": req.params.taskId }] }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Project Data Restored Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * PERMENENTLY DELETE TASK
   */

  async deleteTask({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.findOne({
        _id: req.params.projectId,
        tasks: {
          $elemMatch: {
            id: req.params.taskId,
            isTaskDeleted: true,
          },
        },
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Task Doesn't exist to delete",
        };
        return response;
      }

      let filterTask = await this.fiterTask(project, req);

      let noOfTasks: number = project.noOfTasks;
      let noOfTasksCompleted: number = project.noOfTasksCompleted;
      let noOfTaskRemaining: number = project.noOfTaskRemaining;

      if (noOfTasks > 0) {
        noOfTasks -= 1;
      } else {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "There is no task to delete",
        };
        return response;
      }

      if (filterTask[0].isTaskCompleted) {
        noOfTasksCompleted -= 1;
      } else {
        noOfTaskRemaining -= 1;
      }

      let deleteTask = await projectModel.updateOne(
        { _id: req.params.projectId },
        {
          $pull: { tasks: { id: req.params.taskId } },
          $set: { noOfTasks, noOfTasksCompleted, noOfTaskRemaining },
        }
      );

      if (!deleteTask) {
        let response = {
          status: "Failure",
          statusCode: 200,
          message: "Something went wrong",
        };
        return response;
      }
      let response = {
        status: "Success",
        statusCode: 200,
        message: "Task Deleted Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * GET ALL PROJECT DETAILS
   */

  async getAll({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.find({});
      console.log(project);

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "No projects found",
        };
        return response;
      }

      let response = {
        status: "Success",
        statusCode: 200,
        message: project,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * GET PROJECT BY ID
   */

  async getById({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.findOne({
        _id: req.params.projectId,
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "No projects found",
        };
        return response;
      }

      let response = {
        status: "Success",
        statusCode: 200,
        message: project,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * GET TASK BY ID
   */

  async getTaskById({ req }: any) {
    try {
      //To check existing project
      const project: any = await projectModel.findOne({
        _id: req.params.projectId,
        tasks: {
          $elemMatch: {
            id: req.params.taskId,
          },
        },
      });

      if (!project) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "No task found",
        };
        return response;
      }

      let filterTask = await this.fiterTask(project, req);

      let response = {
        status: "Success",
        statusCode: 200,
        message: filterTask,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * Filter matching task by id
   */
  async fiterTask(project: any, req: any) {
    let task = project.tasks.filter((ele: any) => {
      if (ele.id === req.params.taskId) {
        return ele;
      }
    });

    return task;
  }
}

export const projectController = new ProjectController();
