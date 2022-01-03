import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServiceRequest } from '../actions/actionCreators.js';

export default function ServiceList(props) {
  const { match, history} = props;
  const { items, loading, error } = useSelector((state) => state.serviceList);
  
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchServiceRequest());
  },[dispatch])

  const handleChange = (id) => {
    history.push(`${match.url}/${id}`);
  };

  const handleRefresh = () => {
    dispatch(fetchServiceRequest());
  };

  if (loading) {
    return <div className='loading'></div>
  }

  if (error) {
    return (
      <div className="error-fetch">
        <div className="error-msg">Произошла ошибка!</div>
        <div className="error-refresh" onClick={handleRefresh}>Повторить запрос</div>
      </div>
    );
  }

console.log(match.url)

  return (
    <React.Fragment>
      <ul>
        {items && items.map((o) => <li key={o.id} onClick={() => handleChange(o.id)}>
          {o.name} {o.price}
        </li>)}
      </ul>
    </React.Fragment>
  );
}