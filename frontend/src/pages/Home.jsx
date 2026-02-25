import UserList from "../components/UserList.jsx";

function Home() {
    return (
        <div className="grid grid-cols-3 gap-20 text-center">
            <UserList />
            <UserList />
            <UserList />
        </div>
    );
}

export default Home;