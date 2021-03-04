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
        // tasks: [
        //   {
        //     id: uuidv4(),
        //     taskName: req.body.taskName,
        //     estimatedCompletionTime: req.body.estimatedCompletionTime,
        //   },
        // ],
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

      noOfTasks += 1;
      noOfTaskRemaining += 1;

      await projectModel.updateOne(
        { _id: req.params.projectId },
        {
          $push: { tasks: projectData },
          $set: { noOfTasks, noOfTaskRemaining },
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
}

export const projectController = new ProjectController();
