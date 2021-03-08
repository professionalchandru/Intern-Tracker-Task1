import express from "express";
import urlConstants from "../utils/urlConstants";
import { validateCreateStudent } from "../schemas/studentValidation";
import { studentController } from "../controllers/studentController";
const router = express.Router();

/**
 * CREATE STUDENT
 */

router.post(urlConstants.createStudent, async (req, res) => {
  try {
    if (validateCreateStudent(req.body) === false) {
      res.status(400).send({
        status: "Failure",
        message: "Please Check The Inputs and Input types",
      });
    }
    let result = await studentController.createStudent({ req });
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
 * EDIT STUDENT
 */

router.put(urlConstants.editStudent, async (req, res) => {
  try {
    if (validateCreateStudent(req.body) === false) {
      res.status(400).send({
        status: "Failure",
        message: "Please Check The Inputs and Input types",
      });
    }
    let result = await studentController.editStudent({ req });
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
 * TEMPORARLY DELETE STUDENT
 */

router.put(urlConstants.deleteStudent, async (req, res) => {
  try {
    let result = await studentController.tempDeleteStudent({ req });
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
 * RESTORE TEMPORARILY DELETED STUDENT
 */

router.put(urlConstants.restoreStudent, async (req, res) => {
  try {
    let result = await studentController.restoreStudent({ req });
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
 * PERMENANT DELETE STUDENT
 */

router.delete(urlConstants.permenantDeleteStudent, async (req, res) => {
  try {
    let result = await studentController.deleteStudent({ req });
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
 * LOGIN STUDENT USING EMAIL AND PASSWORD
 */
router.post(urlConstants.loginStudent, async (req, res) => {
  try {
    let result = await studentController.login({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    res.status(result.statusCode).send(response);
  } catch (err) {
    throw new Error(err);
  }
});

/**
 * GET ALL STUDENT DETAILS
 */
router.get(urlConstants.getAllStudent, async (req, res) => {
  try {
    let result = await studentController.getAll({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    res.status(result.statusCode).send(response);
  } catch (err) {
    throw new Error(err);
  }
});

/**
 * GET ALL STUDENT DETAILS ALONG WITH PROJECT DETAILS
 */
router.get(urlConstants.studentProjectDetails, async (req, res) => {
  try {
    let result = await studentController.studentProjectDetails({ req });
    let response = {
      status: result.status,
      message: result.message,
    };
    res.status(result.statusCode).send(response);
  } catch (err) {
    throw new Error(err);
  }
});
export default router;
