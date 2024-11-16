const accountList = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: 2082.79,
    description: "Available Balance",
  },
  {
    title: "Argent Bank Checking (x3948)",
    amount: 6584.21,
    description: "Available Balance",
  },
  {
    title: "Argent Bank Checking (x4398)",
    amount: 1352,
    description: "Available Balance",
  },
];

const BankAccounts = () => {
  return accountList.map((account) => (
    <section key={account.title} className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title"> {account.title} </h3>
        <p className="account-amount"> ${account.amount} </p>
        <p className="account-amount-description"> {account.description} </p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  ));
};

export default BankAccounts;
