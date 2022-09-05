import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CommentData } from '../../types/comment-data';
import { addComment } from '../../services/api-actions';
import { setCommentAddedStatus } from '../../store/action';

type ReviewFormProps = {
  offerId: number;
}

function ReviewForm ({offerId}: ReviewFormProps): JSX.Element {
  const {isCommentAdded, reviews} = useAppSelector((state) => state);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });
  const [prevReviews, setPrevRevies] = useState(reviews);

  if (prevReviews.length < reviews.length) {
    formRef.current?.reset();
    setFormData({
      rating: 0,
      review: '',
    });
    setPrevRevies(reviews);
  }

  const dispatch = useAppDispatch();

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const isFormCorrect = () => {
    if (!formData.rating || formData.review.length < 50 || formData.review.length > 300) {
      return false;
    } else {
      return true;
    }
  };

  const radioInputClassName = 'reviews__rating-label form__rating-label';

  const onSubmit = (commnetData: CommentData) => {
    dispatch(setCommentAddedStatus(true));
    dispatch(addComment(commnetData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      commentText: formData.review,
      commentRating: formData.rating,
      offerId: offerId,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" disabled={isCommentAdded}/>
        <label htmlFor="5-stars" className={isCommentAdded ? '' : radioInputClassName} title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" disabled={isCommentAdded}/>
        <label htmlFor="4-stars" className={isCommentAdded ? '' : radioInputClassName} title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" disabled={isCommentAdded}/>
        <label htmlFor="3-stars" className={isCommentAdded ? '' : radioInputClassName} title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" disabled={isCommentAdded}/>
        <label htmlFor="2-stars" className={isCommentAdded ? '' : radioInputClassName} title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" disabled={isCommentAdded}/>
        <label htmlFor="1-star" className={isCommentAdded ? '' : radioInputClassName} title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={fieldChangeHandle} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" disabled={isCommentAdded}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormCorrect() || isCommentAdded}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;


