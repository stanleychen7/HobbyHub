import React, { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", description: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('Forum')
                .insert({title: post.title, description: post.description});
            
            if (error) {
                console.error("Error creating post:", error);
            } else {
                console.log("Post created successfully");
                window.location = "/";
            }
        } catch (error) {
            console.error("Error creating Post:", error);
        }
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label id="title">
                    Title:
                    <input type="text" name="title" value={post.title} onChange={handleChange} />
                </label>
                <br />
                <label id="description">
                    Description:
                    <input type="text" name="description" value={post.description} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;
