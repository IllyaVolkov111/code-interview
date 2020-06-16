import React from "react";
import { postAppointment } from "../../api/index";
import "./styles.scss";

export default class Appointments extends React.Component {
  state = {
    hasError: [],
    searchParams: {
      name: "Roland Deschain",
      date: "1571569200000"
    }
  };

  setSearchParams = (type, value) => {
    this.setState({
      ...this.state,
      searchParams: {
        ...this.state.searchParams,
        [type]: value
      },
      hasError: !value.length
        ? [...this.state.hasError, type]
        : [
            ...this.state.hasError.filter(e => {
              return e !== type;
            })
          ]
    });
  };

  book = async () => {
    const { searchParams } = this.state;
    try {
      let res = await postAppointment(searchParams);
      console.log(res);
      alert("The appointment is scheduled");
    } catch (err) {
      alert("The providing name and date don't have an availability");
    }
  };

  validateFields = ({ type, value }) => {
    switch (type) {
      case "name":
        if (!value.length)
          return { error: true, message: `${type} should be required` };

        const stringPattern = new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

        if (!stringPattern.test(value))
          return {
            error: true,
            message: `${type} should contain only letters`
          };
        return { error: false };

      case "date":
        if (!value.length)
          return { error: true, message: `${type} should be required` };
        if (!new Date(+value).getTime() > 0)
          return {
            error: true,
            message: `Invalid ${type} format`
          };
        return { error: false };
      default:
        return { error: false };
    }
  };

  render() {
    const {
      searchParams: { name, date },
      hasError
    } = this.state;

    return (
      <div className="appointments">
        <div className="appointments__title">
          Please provide name, date to schedule appointment
        </div>
        <div className="appointments__input-group">
          <div className="appointments__input-group__wrapper">
            <span className="appointments__input-group__label">Name:</span>
            <input
              onChange={e => this.setSearchParams("name", e.target.value)}
              value={name}
              type="text"
            />
            {this.validateFields({ type: "name", value: name }).error && (
              <span className="appointments__input-group__error">
                {this.validateFields({ type: "name", value: name }).message}
              </span>
            )}
          </div>
          <div className="appointments__input-group__wrapper">
            <span className="appointments__input-group__label">Date:</span>
            <input
              onChange={e => this.setSearchParams("date", e.target.value)}
              value={date}
              type="number"
            />
            {this.validateFields({ type: "date", value: date }) && (
              <span className="appointments__input-group__error">
                {this.validateFields({ type: "date", value: date }).message}
              </span>
            )}
          </div>
        </div>
        <button
          disabled={hasError.length}
          onClick={this.book}
          className={`appointments__btn appointments__btn--${true}`}
        >
          Book
        </button>
      </div>
    );
  }
}
