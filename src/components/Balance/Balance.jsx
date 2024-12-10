import "./Balance.css";

function Balance({ balance }) {
  return (
    <section className="balance">
      <h2>Account Balance</h2>
      <div className="balance__card">
        <p className="balance__amount">${balance}</p>
        <p className="balance__info">Last updated: Just now</p>
      </div>
    </section>
  );
}

export default Balance;
