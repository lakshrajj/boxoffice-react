/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import { apiGet } from '../misc/config';
import { useParams } from 'react-router';
import ShowMainData from '../components/show/ShowMainData';
import Seasons from '../components/show/Seasons';
import Details from '../components/show/Details';
import Cast from '../components/show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { error: null, isLoading: false, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, error: action.error, isLoading: false };
    }
    default:
      return prevState;
  }
};

const initState = {
  show: null,
  isLoading: null,
  error: null,
};

const Show = () => {
  const { id } = useParams();
  // eslint-disable-next-line
  const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    let isMounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', show: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(show);

  if (isLoading) {
    return <div>Data is being Loading</div>;
  } else if (error) {
    return <div>Error Ouccerd :</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};
export default Show;
