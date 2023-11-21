import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../client";
import { formatDistanceToNow } from "date-fns";

const ShowPost = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Forum')
                    .select()
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error("Error fetching posts:", error);
                } else {
                    setPost(data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPost();
    }, []);

    const timeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    return (
        <div>
            {post && post.length > 0 ? (
                post.map((singlePost, index) => (
                    <Card
                        key={singlePost.id}
                        id={singlePost.id}
                        title={singlePost.title}
                        time_created={timeAgo(singlePost.created_at)}
                        votes = {singlePost.votes}
                    />
                ))
            ) : (
                <h2>No Posts Yet 😞</h2>
            )}
        </div>
    );
};

export default ShowPost;
