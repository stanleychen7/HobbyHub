import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";
import CreateComment from "../components/CreateComment";

const CommentSection = ({ post_id }) => {
    const [commentSection, setCommentSection] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('Comments')
                    .select()
                    .eq('post_id', post_id);

                if (error) {
                    setError(error.message);
                } else {
                    setCommentSection(data || []);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchComments();
    }, [post_id]);

    return (
        <div>
            <h2>Comments:</h2>
            {error && <p>Error fetching comments: {error}</p>}
            {commentSection.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.comment_text}</p>
                </div>
            ))}
        </div>
    );
};

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

    const deletePost = async(event) => {
        event.preventDefault();

        await supabase
        .from("Forum")
        .delete()
        .eq("id", id);

        window.location = '/';
    }



    return (
        <div className="Post-info">
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.votes}</p>
            <Link to={`/update/${id}`}>
                <button>Update</button>
            </Link>
            <button onClick={deletePost}>Delete</button>
            <CreateComment post_id={id}/>
            <CommentSection post_id ={id}/>
        </div>
    )
}

export default PostInfo;