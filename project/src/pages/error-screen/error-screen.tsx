import { Link } from 'react-router-dom';

function ErrorScreen (): JSX.Element {
  return (
    <section>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </section>
  );
}

export default ErrorScreen;
