import moment from 'moment';

// Get Visible Expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      const startDateMatch = startDate
        ? moment(startDate).isSameOrBefore(createdAtMoment)
        : true;
      const endDateMatch = endDate
        ? moment(endDate).isSameOrAfter(createdAtMoment)
        : true;
      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return a.createdAt < b.createdAt ? 1 : -1;
      if (sortBy === 'amount') return a.amount < b.amount ? 1 : -1;
    });
};
