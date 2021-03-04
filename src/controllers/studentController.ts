import utils from "../utils/common";
import bcrypt from "bcrypt";
import studentModel from "../models/studentModle";
class StudentController {
  /**
   * CREATE STUDENT PROFILE
   */

  async createStudent({ req }: any) {
    try {
      let createdBy = utils.createdBy({ req });

      //Generate hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const studentData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword,
        address: req.body.address,
        college: req.body.college,
        company: req.body.company,
        internPeriod: req.body.internPeriod,
        dateOfJoining: req.body.dateOfJoining,
        internRole: req.body.internRole,
        isDeleted: false,
        createdAt: new Date(),
        createdBy,
      };

      //To check existing student
      const studentEmail = await studentModel.findOne({
        email: req.body.email,
      });

      if (studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 409,
          message: "Student Email Already exist",
        };
        return response;
      }

      const studentObj = new studentModel(studentData);

      const newStudent = await studentObj.save();

      let response = {
        status: "Success",
        statusCode: 200,
        message: newStudent._id,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

export const studentController = new StudentController();
