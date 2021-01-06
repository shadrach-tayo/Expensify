import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../slices/expenses";
import { getExpenses } from "../selectors";

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: "10px 20px",
  },
};

ReactModal.setAppElement(document.getElementById("app"));

function EditExpense(props) {
  // selectors
  const { expenses } = useSelector(getExpenses);
  const expense = expenses.find(
    (expense) => expense.id === props.match.params.id
  );

  // dispatch
  const dispatch = useDispatch();
  const _removeExpense = (data) => dispatch(removeExpense(data));
  const _editExpense = (updates) => dispatch(editExpense({id: expense.id, updates }));

  // state
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (expense) => {
    _editExpense(expense);
    props.history.push("/");
  };

  const onRemove = () => {
    setShowModal(false);
    let id = expense.id;
    _removeExpense({ id });
    props.history.push("/");
  };

  const confirmDelete = () => {
    console.log("showmodal ", showModal, setShowModal, typeof setShowModal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Edit Expense</h1>
        </div>
      </div>
      <div className="container">
        <ReactModal
          aria={{ label: "Confirm expense delete modal" }}
          isOpen={showModal}
          shouldFocusAfterRender={true}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={handleCloseModal}
          style={modalStyle}
        >
          <p>
            <strong>{expense.description}</strong> will be permanently deleted
          </p>
          <button className="btn btn--delete delete" onClick={onRemove}>
            delete
          </button>
        </ReactModal>
        <ExpenseForm onSubmit={onSubmit} expense={expense} />
        <div className="container">
          <div className="input-group">
            <button
              className="btn btn--delete confirm-delete"
              onClick={() => confirmDelete()}
              style={{ justifySelf: "right" }}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state, props) => ({
//   expense: state.expenses.find(
//     (expense) => expense.id === props.match.params.id
//   ),
// });

// const mapDispatchToProps = (dispatch) => ({
//   startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
//   startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
// });

export default EditExpense;
