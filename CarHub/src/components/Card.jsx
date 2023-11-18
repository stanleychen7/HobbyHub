//Cards used to display the post on the home page
import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import { useState } from 'react';

const Card = ({ id, title,time_created, votes })  => {

    const [vote, setVote] = useState(0);

    const handleUpvote = async(event) => {
        event.preventDefault();

        await supabase
        .from("Forum")
        .update({votes: vote + 1})
        .eq("id", id);

        setVote((vote) + vote + 1)
    }

  return (
    <div className="card">
        <h2>{title}</h2>
        <p>{time_created}</p>
        <p>{votes}</p>
    </div>
  );
};

export default Card;