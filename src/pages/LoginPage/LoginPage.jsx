import Login from "../../components/Login/Login";

const LoginPage = ({ setIsLoggedIn }) => {
    return (
        <>
            <Login setIsLoggedIn={setIsLoggedIn} />
        </>
    );
};

export default LoginPage;
