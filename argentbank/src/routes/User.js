import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import BankAccount from "../components/BankAccount";
import Footer from "../components/Footer";
import Header from "../components/Header";

function User() {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <Header />
      <main className="mainUser">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user ? `${user.firstName} ${user.lastName}!` : "Guest"}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <BankAccount />
        <BankAccount />
        <BankAccount />
      </main>
      <Footer />
    </>
  );
}

export default User;
