import { createdBy } from "../modules/common";

export default {
  createdBy: ({ req }: any) => {
    let info: createdBy = {
      requestMethod: req.method,
      userAgent: req.headers["user-agent"],
      remoteAddress:
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress,
      pathInfo: req.orignialUrl,
      user: req.hasOwnProperty("user") ? req.user : "user",
    };
    return JSON.stringify(info);
  },
};
