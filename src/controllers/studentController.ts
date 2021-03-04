import utils from "../utils/common";
import bcrypt from "bcrypt";
import studentModel from "../models/studentModel";
import * as jwt from "jsonwebtoken";
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

  /**
   * EDIT STUDENT PROFILE
   */

  async editStudent({ req }: any) {
    try {
      //To check existing student
      const studentEmail = await studentModel.findOne({
        _id: req.params.id,
      });

      if (!studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Student Doesn't exist",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

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
        updatedAt: new Date(),
        updatedBy,
      };

      const newStudent = await studentModel.updateOne(
        { _id: req.params.id },
        { $set: studentData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Student Details Updated Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * TEMPORARILY DELETE STUDENT PROFILE
   */

  async tempDeleteStudent({ req }: any) {
    try {
      //To check existing student
      const studentEmail = await studentModel.findOne({
        _id: req.params.id,
        isDeleted: false,
      });

      if (!studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Student Doesn't exist",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const studentData = {
        isDeleted: true,
        updatedAt: new Date(),
        updatedBy,
      };

      const newStudent = await studentModel.updateOne(
        { _id: req.params.id },
        { $set: studentData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Student Data Moved To Trash Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * RESOTRE TEMPORARILY DELETED STUDENT PROFILE
   */

  async restoreStudent({ req }: any) {
    try {
      //To check existing student
      const studentEmail = await studentModel.findOne({
        _id: req.params.id,
        isDeleted: true,
      });

      if (!studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Student Doesn't exist to restore",
        };
        return response;
      }

      let updatedBy = utils.createdBy({ req });

      const studentData = {
        isDeleted: false,
        updatedAt: new Date(),
        updatedBy,
      };

      const newStudent = await studentModel.updateOne(
        { _id: req.params.id },
        { $set: studentData }
      );

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Student Data Restored Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * PERMENENTLY DELETE STUDENT PROFILE
   */

  async deleteStudent({ req }: any) {
    try {
      //To check existing student
      const studentEmail = await studentModel.findOne({
        _id: req.params.id,
      });

      if (!studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 400,
          message: "Student Email Doesn't exist",
        };
        return response;
      }

      await studentModel.deleteOne({ _id: req.params.id });

      let response = {
        status: "Success",
        statusCode: 200,
        message: "Student Deleted Successfully",
      };
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  /**
   * STUDENT LOGIN USING EMAIL AND PASSWORD
   */
  async login({ req }: any) {
    try {
      //To check existing student
      const studentEmail: any = await studentModel.findOne({
        email: req.body.email,
      });

      if (!studentEmail) {
        let response = {
          status: "Failure",
          statusCode: 404,
          message: "Email Id Not Found",
        };
        return response;
      }

      const verifyPassword = await bcrypt.compare(
        req.body.password,
        studentEmail.password
      );

      let token;
      if (!verifyPassword) {
        let response = {
          status: "Failure",
          statusCode: 403,
          message: "Password Incorrect",
        };
        return response;
      } else {
        token = await this.tokenGenerator(studentEmail, verifyPassword);
      }

      if (token == null) {
        let response = {
          status: "Failure",
          statusCode: 401,
          message: "Access Denied... Please Use Valid Credentials",
        };
        return response;
      }

      let response = {
        status: "Success",
        statusCode: 200,
        message: token,
      };
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * CREATE JWT TOKEN
   */
  async tokenGenerator(studentEmail: any, verifyPassword: boolean) {
    interface studentData {
      id: string;
      name: string;
      email: string;
      type: string;
    }
    const studentData: studentData = {
      id: studentEmail._id,
      name: studentEmail.name,
      email: studentEmail.email,
      type: studentEmail.type,
    };

    let issuedAt = Math.round(Date.now() / 1000);

    const tokenParams = {
      iat: issuedAt,
      jti: studentEmail._id,
      user: studentData,
    };

    let token = null;
    if (verifyPassword) {
      let secret = process.env.JWT_SECRET || "";
      console.log(secret);
      token = jwt.sign({ tokenParams }, secret, {
        expiresIn: "1h",
      });
    }
    return token;
  }
}

export const studentController = new StudentController();
