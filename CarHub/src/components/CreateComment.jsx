import React, { useState } from 'react';
import { supabase } from '../client';

const CreateComment = ({ post_id }) => {
    const [comment, setComment] = useState({ comment_text: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createComment = async (event) => {
        event.preventDefault();

        try {
            // Include the post_id when inserting the comment into the 'Comments' table
            await supabase
                .from('Comments')
                .insert([{ ...comment, post_id }]);
            
            console.log('Comment created successfully');
            
            // Optionally, you can clear the input field or take other actions
            setComment({ comment_text: '' });
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <div>
            <form onSubmit={createComment}>
                <label>
                    Comment:
                    <input
                        type="text"
                        name="comment_text"
                        value={comment.comment_text}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input type="submit" value="Add Comment" />
            </form>
        </div>
    );
};

export default CreateComment;
