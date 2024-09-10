import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BookTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card');
    useEffect(() => {
        setLoading(true);
        axios
            .get('https://bookstore-mernstack-gx4f.onrender.com/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button onClick={() => setShowType('table')} className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
                    Table
                </button>
                <button onClick={() => setShowType('card')} className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
                    Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                   <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (<Spinner />):showType === 'table' ? (<BookTable books={books} />): (<BookCard books={books} />)}
    </div>
    )
}

export default Home