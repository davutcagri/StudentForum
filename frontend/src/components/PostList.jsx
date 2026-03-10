import {useEffect, useState} from "react";
import {getPosts} from "../apiCalls.js";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            setPosts(response.data.content);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {posts?.map((post) => (
                <div className="bg-gray-50 rounded-2xl mt-10" key={post.id}>
                    <div className="bg-gray-100 justify-between flex p-1">
                        <h2 className="text-left text-lg">{post.title}</h2>
                        <p className="text-right text-md">{post.author.username}</p>
                    </div>
                    <div className="p-5 text-left">
                        {post.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;