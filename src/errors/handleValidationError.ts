import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../app/interfaces/common';
import { IGenericErrorMessage } from '../app/interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: el?.path,
      message: el?.message,
    })
  );

  const statusCode = 400;
  const response: IGenericErrorResponse = {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };

  if (
    err instanceof mongoose.Error.ValidationError &&
    err.errors &&
    Object.keys(err.errors).length === 1
  ) {
    const key = Object.keys(err.errors)[0];
    const value = err.errors[key].value;

    const duplicateEntryError: IGenericErrorMessage[] = [
      {
        path: key,
        message: `Duplicate entry: ${value}`,
      },
    ];

    response.statusCode = 409;
    response.message = 'Duplicate Entry Error';
    response.errorMessages = duplicateEntryError;
  }

  return response;
};

export default handleValidationError;
