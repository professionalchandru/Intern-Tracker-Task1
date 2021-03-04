import express from "express";
import urlConstants from "../utils/urlConstants";
import {
  validateCreateProject,
  validateEditProject,
  validateAddTask,
} from "../schemas/projectValidation";
import { projectController } from "../controllers/projectController";
const router = express.Router();

/**
 * CREATE NEW PROJECT
 */

router.post(urlConstants.createProject, async (req, res) => {
  try {
    if (validateCreateProject(req.body) === false) {
      return res.status(400).send({
        status: "Failure",
        message: "Please Check The Inputs and Input types",
      });
    }
    let result = await projectController.createProject({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    res.status(result.statusCode).send(response);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

/**
 * EDIT PROJECT
 */

router.put(urlConstants.editProject, async (req, res) => {
  try {
    if (validateEditProject(req.body) === false) {
      return res.status(400).send({
        status: "Failure",
        message: "Please Check The Inputs and Input types",
      });
    }
    let result = await projectController.editProject({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    return res.status(result.statusCode).send(response);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

/**
 * ADD TASKS PROJECT
 */

router.put(urlConstants.addTask, async (req, res) => {
  try {
    if (validateAddTask(req.body) === false) {
      return res.status(400).send({
        status: "Failure",
        message: "Please Check The Inputs and Input types",
      });
    }
    let result = await projectController.addTask({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    return res.status(result.statusCode).send(response);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

// /**
//  * TEMPORARLY DELETE STUDENT
//  */

// router.put(urlConstants.deleteStudent, async (req, res) => {
//   try {
//     let result = await projectController.tempDeleteProject({ req });
//     let response = {
//       status: result.status,
//       message: result.message,
//     };
//     res.status(result.statusCode).send(response);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// });

// /**
//  * RESTORE TEMPORARILY DELETED STUDENT
//  */

// router.put(urlConstants.restoreStudent, async (req, res) => {
//   try {
//     let result = await projectController.restoreProject({ req });
//     let response = {
//       status: result.status,
//       message: result.message,
//     };
//     res.status(result.statusCode).send(response);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// });

// /**
//  * PERMENANT DELETE STUDENT
//  */

// router.delete(urlConstants.permenantDeleteStudent, async (req, res) => {
//   try {
//     let result = await projectController.deleteProject({ req });
//     let response = {
//       status: result.status,
//       message: result.message,
//     };
//     res.status(result.statusCode).send(response);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// });

// /**
//  * LOGIN STUDENT USING EMAIL AND PASSWORD
//  */
// router.post(urlConstants.loginStudent, async (req, res) => {
//   try {
//     let result = await projectController.login({ req });
//     let response = {
//       status: result.status,
//       message: result.message,
//     };
//     res.status(result.statusCode).send(response);
//   } catch (err) {
//     throw new Error(err);
//   }
// });

export default router;
