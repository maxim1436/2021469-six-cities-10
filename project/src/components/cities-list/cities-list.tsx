import { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCityName } from '../../store/action';

function CitiesList (): JSX.Element {
  const dispatch = useAppDispatch();
  const choosenCity = useAppSelector((state) => state.city);

  const onClick = (evt: MouseEvent<HTMLLIElement>) => {
    dispatch(changeCityName(evt.currentTarget.textContent));
  };
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Paris' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Paris</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Cologne' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Cologne</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Brussels' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Brussels</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Amsterdam' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Amsterdam</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Hamburg' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Hamburg</span>
          </a>
        </li>
        <li className="locations__item" onClick={onClick}>
          <a className={`locations__item-link tabs__item
              ${choosenCity === 'Dusseldorf' ? 'tabs__item--active' : ''}`}
          href="/#"
          >
            <span>Dusseldorf</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default CitiesList;
