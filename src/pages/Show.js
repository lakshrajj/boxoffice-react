import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

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

  if (isLoading) {
    return <div>Data is being Loading</div>;
  }
  if (error) {
    return <div>Error Ouccerd :</div>;
  }

  return <div>This is Show Page</div>;
};

export default Show;
