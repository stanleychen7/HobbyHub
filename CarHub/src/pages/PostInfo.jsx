import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

const PostInfo = () => {
    const {id} = useParams();

    const [post, setPost] = useState({title:"", description:"", votes:0 });

    useEffect(() => {
        const fetchPostInfo = async() => {
            const {data, error} = await supabase
            .from("Forum")
            .select()
            .eq("id", id);

            if(error) {
                console.error("Error", error)
            } else if (data && data.length > 0) {
                const fetchPost = data[0];
                setPost ({
                    title: fetchPost.title,
                    description: fetchPost.description,
                    votes: fetchPost.votes
                });
            }
        }
        fetchPostInfo();
    },[id]);

    return (
        <div className="Post-info">
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.votes}</p>
        </div>
    )
}

export default PostInfo;