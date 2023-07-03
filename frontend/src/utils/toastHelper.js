import { toast } from 'react-toastify';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  toast(message, {
    type: 'error',
  });
};

const handleDuplicateFieldDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  toast(message, {
    type: 'error',
  });
};

const handleValidationErrorDB = (err) => {
  toast(err.message, {
    type: 'error',
  });
};

export const toastHelper = (err) => {
  if (err.name === 'CastError') handleCastErrorDB(err);
  if (err.code === 11000) handleDuplicateFieldDB(err);
  if (err.name === 'ValidationError') handleValidationErrorDB(err);
};