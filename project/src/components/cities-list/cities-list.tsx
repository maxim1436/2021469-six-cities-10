import { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCityName } from '../../store/action';

function CitiesList (): JSX.Element {
  const dispatch = useAppDispatch();
  const choosenCity = useAppSelector((state) => state.city);
  const classNamesForChoosenCity = (city: string) => `locations__item-link tabs__item ${choosenCity === city ? 'tabs__item--active' : ''}`;

  const onClick = (evt: MouseEvent<HTMLLIElement>) => {
    dispatch(changeCityName(evt.currentTarget.textContent));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Paris')} href="/#">
            <span>Paris</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Cologne')} href="/#">
            <span>Cologne</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Brussels')} href="/#">
            <span>Brussels</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Amsterdam')} href="/#">
            <span>Amsterdam</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Hamburg')} href="/#">
            <span>Hamburg</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={classNamesForChoosenCity('Dusseldorf')} href="/#">
            <span>Dusseldorf</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default CitiesList;
