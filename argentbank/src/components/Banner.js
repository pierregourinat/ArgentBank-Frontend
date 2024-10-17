function Banner() {
  return (
    <div id="banner">
      <div className="hero">
        <section className="heroContent">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <img
        src="/img/bank-tree.jpeg"
        alt="Faire pousser son épargne"
        className="bannerCover"
      ></img>
    </div>
  );
}

export default Banner;
