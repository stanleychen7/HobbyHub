import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

const Search = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const { data, error } = await supabase
                    .from('Forum')
                    .select('title')
                    .ilike('title', `%${search}%`)
                    .limit(5); // Adjust the limit as needed

                if (error) {
                    console.error('Error fetching titles:', error);
                } else {
                    setSearchResults(data || []);
                }
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };
        if (search.trim() !== '') {
            fetchTitles();
        } else {
            setSearchResults([]);
        }
    }, [search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for post titles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
