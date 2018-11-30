const selectExpenseTotal = expenses => {
  if (expenses.length === 0) return 0;
  return expenses.reduce((amount, expense) => amount + expense.amount, 0);
  // return expenses.map(expense => expense.amount).reduce((a, b) => a + b, 0);
};

export default selectExpenseTotal;
