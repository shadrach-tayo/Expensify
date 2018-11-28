import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'new expense',
    note: '',
    amount: 0,
    createdAt: 0
  },
  {
    id: '2',
    description: 'new expense2',
    note: '',
    amount: 109952,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'new expense3',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  }
];

export default expenses;
