import { useState } from 'react';
import { MouseEvent } from 'react';
import { SortType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sortByPopular, sortByLowToHigh, sortByHighToLow, sortByTopRatedFirst } from '../../store/action';

function PlacesSortingForm (): JSX.Element {

  const [isChoosing, setIsChoosing] = useState(false);
  const [currentSortType, setCurrentSortType] = useState('Popular');
  const [humanizeSortType, setHumanizeSortType] = useState('Popular');
  const dispatch = useAppDispatch();

  const updateIsChoosingState = () => setIsChoosing(true);

  const chooseSortType = (evt: MouseEvent<HTMLLIElement>) => {
    setIsChoosing(!isChoosing);

    if (currentSortType === evt.currentTarget.id) {
      return;
    }
    switch (evt.currentTarget.id) {
      case SortType.Popular:
        dispatch(sortByPopular());
        break;
      case SortType.HighToLow:
        dispatch(sortByHighToLow());
        break;
      case SortType.LowToHigh:
        dispatch(sortByLowToHigh());
        break;
      case SortType.TopRatedFirst:
        dispatch(sortByTopRatedFirst());
        break;
      default:
        dispatch(sortByPopular());
    }
    setCurrentSortType(evt.currentTarget.id);

    if (evt.currentTarget.textContent) {
      setHumanizeSortType(evt.currentTarget.textContent);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={updateIsChoosingState}>
        {
          humanizeSortType
        }
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom
            ${isChoosing ? 'places__options--opened' : ''}`}
      >
        <li className="places__option" id={SortType.Popular} tabIndex={0} onClick={chooseSortType}>Popular</li>
        <li className="places__option" tabIndex={0} id={SortType.LowToHigh} onClick={chooseSortType}>Price: low to high</li>
        <li className="places__option" tabIndex={0} id={SortType.HighToLow} onClick={chooseSortType}>Price: high to low</li>
        <li className="places__option" tabIndex={0} id={SortType.TopRatedFirst} onClick={chooseSortType}>Top rated first</li>
      </ul>
    </form>
  );
}

export default PlacesSortingForm;

