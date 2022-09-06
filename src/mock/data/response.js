export const success = {
  status: "success",
  code: 200,
};
export const successWithMessage = {
  status: "success",
  code: 200,
  message: "the success info",
};
export const successWithData = {
  status: "success",
  code: 200,
  data: {},
};
export const successWithDataAndMessage = {
  status: "success",
  code: 200,
  message: "the success info",
  data: {},
};

export const failed = {
  status: "error",
  code: 400,
};

export const failedWithMessage = {
  status: "error",
  code: 400,
  message: "the error info",
};

export const failedWithMessageAndErrors = {
  status: "error",
  code: 400,
  message: "the error info",
  errors: [{}],
};