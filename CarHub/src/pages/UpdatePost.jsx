import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const UpdatePost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({title:"", description:""});

    useEffect(() => {
        const fetchPost = async() => {
            const {data, error} = await supabase
            .from("Forum")
            .select()
            .eq("id", id);

            if(error) {
                console.error("Error fetching post", error);
            } else if (data && data.length > 0) {
                const fetchedPost = data[0]
                setPost({
                    title: fetchedPost.title,
                    description: fetchedPost.description
                });
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
        .from("Forum")
        .update({
            title: post.title,
            description: post.description
        })
        .eq("id", id);
        console.log("Success");
        window.location = '/';
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label>
                    Title:
                    <input type="text" name="title" value={post.title} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="description" value={post.description} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdatePost;
