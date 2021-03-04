import { studentInterface } from "../modules/studentInterface";

export const validateCreateStudent = ({
  name,
  email,
  phone,
  password,
  address,
  college,
  company,
  internPeriod,
  dateOfJoining,
  internRole,
}: studentInterface): boolean => {
  let resultFlag = true;

  if (
    name === undefined ||
    name.length === 0 ||
    email === undefined ||
    email.length === 0 ||
    phone === undefined ||
    phone.length === 0 ||
    password === undefined ||
    password.length === 0 ||
    address === undefined ||
    address.length === 0 ||
    college === undefined ||
    college.length === 0 ||
    company === undefined ||
    company.length === 0 ||
    internPeriod === undefined ||
    internPeriod.length === 0 ||
    dateOfJoining === undefined ||
    dateOfJoining.length === 0 ||
    internRole === undefined ||
    internRole.length === 0
  ) {
    resultFlag = false;
  }
  console.log(resultFlag);
  return resultFlag;
};
