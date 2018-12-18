import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: '10px 20px'
  }
};

ReactModal.setAppElement(document.getElementById('app'));

export class EditExpense extends React.Component {
  state = {
    showModal: false
  };
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.setState({ showModal: false });
    let id = this.props.expense.id;
    this.props.startRemoveExpense({ id });
    this.props.history.push('/');
  };

  confirmDelete = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Edit Expense</h1>
          </div>
        </div>
        <div className="container">
          <ReactModal
            aria={{ label: 'Confirm expense delete modal' }}
            isOpen={this.state.showModal}
            shouldFocusAfterRender={true}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.handleCloseModal}
            style={modalStyle}
          >
            <p>
              <strong>{this.props.expense.description}</strong> will be
              permanently deleted
            </p>
            <button className="btn btn--delete" onClick={this.onRemove}>
              delete
            </button>
          </ReactModal>
          <ExpenseForm onSubmit={this.onSubmit} expense={this.props.expense} />
          <div className="container">
            <div className="input-group">
              <button
                className="btn btn--delete"
                onClick={this.confirmDelete}
                style={{ justifySelf: 'right' }}
              >
                Delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpense);
