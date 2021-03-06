import { useState, useContext, useRef } from 'react';

import { GlobalContext } from '../context/GlobalState';

import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  z-index: 999;
`;

const ModalContent = styled.div`
  max-width: 500px;
  background: #f0f2f5;
  padding: 2.4rem;
  position: relative;
  z-index: 1;
  h2 {
    margin-top: 0%;
  }
`;

const InputWrapper = styled.div`
  margin-top: 0.8rem;
  & small {
    opacity: 0.4;
    color: #363f5f;
  }
  &:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:last-child button {
    width: 48%;
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 0.2rem;
  padding: 0.8rem;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  background: #49aa26;
  cursor: pointer;
  &:hover {
    background: #3dd705;
  }
  &:first-child {
    color: #e92929;
    border: 2px #e92929 solid;
    background: transparent;
    opacity: 0.6;
  }
  &:first-child:hover {
    opacity: 1;
  }
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      description,
      amount: +amount,
      date,
    };

    addTransaction(newTransaction);
    openModal();
  };

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalContent>
            <h2>New Transaction</h2>
            <form onSubmit={onSubmit}>
              <InputWrapper>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                />
              </InputWrapper>

              <InputWrapper>
                <label className="sr-only" htmlFor="amount">
                  Value
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                />
                <small className="help">
                  (negative - expense, positive - income)
                </small>
              </InputWrapper>

              <InputWrapper>
                <label className="sr-only" htmlFor="date">
                  Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </InputWrapper>

              <InputWrapper>
                <Button type="button" onClick={openModal}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </InputWrapper>
            </form>
          </ModalContent>
        </Background>
      ) : null}
    </>
  );
};
