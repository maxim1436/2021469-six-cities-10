
type FavoriteOfferBannerForPropertyScreenProps = {
  isOfferFavorite: boolean;
}

function FavoriteOfferBannerForPropertyScreen ({isOfferFavorite}: FavoriteOfferBannerForPropertyScreenProps): JSX.Element {
  if (isOfferFavorite) {
    return (
      <button className="property__bookmark-button  button" type="button">
        <svg className="property__bookmark-icon--active" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    );
  }

  return (
    <button className="property__bookmark-button  button" type="button">
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteOfferBannerForPropertyScreen;
