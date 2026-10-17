import { creator } from "@/data/portfolio";

export function About() {
  return (
    <div className="about" id="about" aria-labelledby="about-title">
      <div className="about-copy">
        <div className="reveal">
          <p className="editorial-label">About me</p>
          <h3 className="about-subtitle" id="about-title">
            A business mind. A creator's eye.
          </h3>
        </div>
        <p className="about-intro">{creator.biography}</p>
        <dl className="about-strengths">
          <div>
            <dt>Market research</dt>
            <dd>Understanding the audience behind the brief.</dd>
          </div>
          <div>
            <dt>Marketing</dt>
            <dd>A business perspective on each brand story.</dd>
          </div>
          <div>
            <dt>Data analysis</dt>
            <dd>Experience with the numbers behind the decisions.</dd>
          </div>
          <div>
            <dt>Content creation</dt>
            <dd>Everyday stories with a clear brand purpose.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
