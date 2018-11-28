import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({
  dispatch,
  id,
  description,
  amount,
  createdAt,
  ...props
}) => (
  <div>
    <Link to={`/edit/${id}`}>{description}</Link>
    <p>{numeral(amount / 100).format('$0,0.00')}</p>
    <p>{moment(createdAt).format('Do MMMM YYYY')}</p>
  </div>
);

export default ExpenseListItem;
