import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error('Frontend Error', error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage;