import { Mark } from "./logo";

export function HeroArt() {
  return (
    <div
      className="hero-art"
      role="img"
      aria-label="The NISIMIN mark: blue for people, yellow for learning, green for growth, and red for action, connected around an open center."
    >
      <div className="hero-grid" />
      <Mark className="hero-brand-mark" />
      <div className="art-coordinate coord-top">
        PEOPLE. LEARNING. GROWTH. ACTION.
      </div>
      <div className="art-coordinate coord-bottom">
        <span>CONNECTED BY PURPOSE.</span>
        <span>NISIMIN.</span>
      </div>
      <div className="art-cross">+</div>
    </div>
  );
}
