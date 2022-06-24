import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const renderResults = results => {
  if (results && results.length === 0) {
    return <div>No Results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  // eslint-disable-next-line
  const [input, setinput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState(`shows`);

  const isShowSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setinput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  return (
    <MainPageLayout>
      <SearchInput
        onKeyDown={onKeyDown}
        type="text"
        onChange={onInputChange}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
