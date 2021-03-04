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
        status: "Success",
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

export default router;
