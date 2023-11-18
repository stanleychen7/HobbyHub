import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const UpdatePost = () => {
    const {id} = useParams();

    const [post, setPost] = useState[{title: "", description:"", upvotes:""}];

}