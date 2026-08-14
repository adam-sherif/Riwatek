import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

// items: [{ label, to }] — last item has no `to` (current page)
const Breadcrumbs = ({ items }) => (
  <nav className="breadcrumbs" aria-label="مسار التصفح">
    <ol>
      {items.map((item, i) => (
        <li key={item.label}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          {i < items.length - 1 && (
            <span className="breadcrumbs__sep" aria-hidden="true">
              /
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
