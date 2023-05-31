import articuno from '../../images/articuno.gif';
import './loading.css';

export default function Loader() {
  return (
    <div className="loading-container">
      <img src={articuno} alt="Loading img" className="loading-img" />
    </div>
  );
}
