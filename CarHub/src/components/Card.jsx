import React, { useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const Card = ({ id, title, time_created, votes }) => {
    const [vote, setVote] = useState(0);

    const handleUpvote = async (event) => {
        event.preventDefault();

        await supabase
            .from('Forum')
            .update({ votes: vote + 1 })
            .eq('id', id);

        setVote((prevVote) => prevVote + 1);
    };

    return (
        <div className="card">
            <Link to = {`info/${id}`}><h2>{title}</h2></Link>
            <p>{time_created}</p>
            <button onClick={handleUpvote}>Up</button>
            <p>{votes}</p>
        </div>
    );
};

export default Card;