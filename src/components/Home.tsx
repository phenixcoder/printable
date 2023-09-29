
/**
 * Home Component Whickl will be rendered when the user visits the root path
 */

import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <p>This is the home page</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>
    </div>
  );
}
