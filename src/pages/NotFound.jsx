import { Link } from "react-router-dom";
import { MillWheel } from "../components/BrandArt";

export default function NotFound() {
  return (
    <div className="container not-found">
      <MillWheel size={72} />
      <h1>This page has wandered off the path.</h1>
      <p>The page you're looking for doesn't exist — let's get you back on track.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
