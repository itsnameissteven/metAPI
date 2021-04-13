import React from "react";
import "./App.css";
import { getApis, Api } from "../../apiCalls";
import { CardContainer } from "../CardContainer/CardContainer";
import { FeaturedCard } from "../FeaturedCard/FeaturedCard";
import { FilterForm } from "../FilterForm/FilterForm";
import { FilterState } from "../FilterForm/FilterForm";
import { Route } from "react-router-dom";
import { getEnabledCategories } from "node:trace_events";
import { isCompositeComponentWithType } from "react-dom/test-utils";

type Props = {};

class App extends React.Component<Props> {
  state: {
    apiList: Api[];
    currentApis: Api[];
    favorites: Api[];
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      apiList: [],
      currentApis: [],
      favorites: [],
    };
  }

  componentDidMount() {
    getApis().then((data) =>
      this.setState({ apiList: data.entries, currentApis: data.entries })
    );
  }

  filter = (stateObj: FilterState): any => {
    let matchingCards: Api[] = [];
    matchingCards = this.state.apiList.filter((api) => {
      return api.API.includes(stateObj.search);
    });
    stateObj.Categories &&
      (matchingCards = matchingCards.filter((api) => {
        return api.Category === stateObj.Categories;
      }));

    stateObj.Auth !== "Empty" &&
      (matchingCards = matchingCards.filter((api) => {
        return api.Auth.toLowerCase() === stateObj.Auth.toLowerCase();
      }));

    stateObj.HTTPS !== "" &&
      (matchingCards = matchingCards.filter((api) => {
        return api.HTTPS === stateObj.HTTPS;
      }));

    stateObj.Cors !== "" &&
      (matchingCards = matchingCards.filter((api) => {
        return api.Cors.toLowerCase() === stateObj.Cors.toLowerCase();
      }));

    console.log(matchingCards);
    if (matchingCards.length) {
      this.setState({ ...this.state, currentApis: matchingCards });
      return matchingCards;
    } else return this.state.apiList;
  };

  addToFavorites = (ApiCard: Api) => {
    this.setState({ favorites: ApiCard });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <FilterForm filter={this.filter} apiList={this.state.apiList} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <CardContainer apiList={this.state.currentApis}></CardContainer>
            );
          }}
        />
        <Route
          path="/:title"
          render={({ match }) => {
            const data = this.state.apiList.find(
              (api) => api.API === match.params.title
            );
            return (
              <FeaturedCard {...data} addToFavorites={this.addToFavorites} />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
