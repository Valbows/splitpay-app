// backend/src/utils/receiptParser.js

/**
 * Parses raw text extracted from a receipt to identify key expense details.
 * @param {string} rawText - The raw text string from OCR.
 * @returns {{amount: number|null, merchant: string|null, date: string|null}} - Extracted details.
 */
const parseReceiptText = (rawText) => {
  const parsedDetails = {
    amount: null,
    merchant: null,
    date: null,
  };

  // TODO: Implement robust parsing logic here to extract amount, merchant, and date from rawText.
  // Consider using regex, keyword matching, and handling variations in receipt formats.

  return parsedDetails;
};

module.exports = {
  parseReceiptText,
};
