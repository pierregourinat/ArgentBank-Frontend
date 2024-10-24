import BankAccount from "../components/BankAccount";
import Footer from "../components/Footer";
import Header from "../components/Header";

function User() {
  return (
    <>
      <Header />
      <main className="mainUser">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <BankAccount />
      </main>
      <Footer />
    </>
  );
}

export default User;
