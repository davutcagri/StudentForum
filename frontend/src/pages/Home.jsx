import SendPost from "../components/SendPost.jsx";
import UserList from "../components/UserList.jsx";
import PostList from "../components/PostList.jsx";

function Home() {
    return (
        <div className="grid grid-cols-4 gap-20 text-center pt-[20px]">
            <UserList/>
            <div className="col-span-2">
                <SendPost/>
                <PostList/>
            </div>
            <UserList/>
        </div>
    );
}

export default Home;