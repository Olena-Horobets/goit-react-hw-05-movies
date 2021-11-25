import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Loader from 'react-loader-spinner';

export default (
  <div className="loaderContainer">
    <Loader
      type="Circles"
      color="#FFFFFF"
      height={120}
      width={120}
      radius={130}
      timeout={3000}
    />
  </div>
);
