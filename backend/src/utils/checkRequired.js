const checkRequiredFields = (receivedFields, requiredFields) => {
    const missingFields = requiredFields.filter((field) => !(field in receivedFields));
    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.map((field) => 
      `"${field}" is required`).join(', ');
      return missingFieldsMessage;
    }
  };
  
  module.exports = checkRequiredFields;
