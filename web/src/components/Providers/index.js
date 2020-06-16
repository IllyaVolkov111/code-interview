import React from "react";
import { getProviders } from "../../api/index";
import "./styles.scss";

export default class Providers extends React.Component {
  state = {
    providers: [],
    hasError: [],
    searchParams: {
      specialty: "Cardiologist",
      date: "1571637660000",
      minScore: "0"
    }
  };

  componentDidMount = async () => {
    this.search();
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

  search = async () => {
    const { searchParams } = this.state;
    try {
      let { data } = await getProviders(searchParams);

      this.setState({ providers: data });
    } catch (err) {
      console.log(err.message);
    }
  };

  validateFields = ({ type, value }) => {
    switch (type) {
      case "specialty":
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

      case "minScore":
        if (!value.length)
          return { error: true, message: `${type} should be required` };
        return { error: false };
      default:
        return { error: false };
    }
  };

  render() {
    const {
      searchParams: { specialty, minScore, date },
      hasError,
      providers
    } = this.state;

    return (
      <div className="providers">
        <div className="providers__title">
          Please provide specialty, date and minScore to obtain a provider
        </div>
        <div className="providers__input-group">
          <div className="providers__input-group__wrapper">
            <span className="providers__input-group__label">Specialty:</span>
            <input
              onChange={e => this.setSearchParams("specialty", e.target.value)}
              value={specialty}
              type="text"
            />
            {this.validateFields({ type: "specialty", value: specialty })
              .error && (
              <span className="providers__input-group__error">
                {
                  this.validateFields({ type: "specialty", value: specialty })
                    .message
                }
              </span>
            )}
          </div>
          <div className="providers__input-group__wrapper">
            <span className="providers__input-group__label">Date:</span>
            <input
              onChange={e => this.setSearchParams("date", e.target.value)}
              value={date}
              type="number"
            />
            {this.validateFields({ type: "date", value: date }) && (
              <span className="providers__input-group__error">
                {this.validateFields({ type: "date", value: date }).message}
              </span>
            )}
          </div>
          <div className="providers__input-group__wrapper">
            <span className="providers__input-group__label">Min Score:</span>
            <input
              onChange={e => this.setSearchParams("minScore", e.target.value)}
              value={minScore}
              type="number"
            />
            {this.validateFields({ type: "minScore", value: minScore }) && (
              <span className="providers__input-group__error">
                {
                  this.validateFields({ type: "minScore", value: minScore })
                    .message
                }
              </span>
            )}
          </div>
        </div>
        <button
          disabled={hasError.length}
          onClick={this.search}
          className={`providers__btn providers__btn--${true}`}
        >
          Search
        </button>

        <div className="providers__list">
          <span className="providers__list__title">Providers:</span>
          <ul>
            {providers.map(item => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
