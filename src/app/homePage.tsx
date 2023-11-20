import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AfficheType } from '../../types/home/Affiche';
import Layout from '@/components/Layout/Layout';

export default function Home() {

    const [affiches, setAffiches] = useState<AfficheType>()

    useEffect(() => {
        axios.get("/api/affiches")
            .then(e => {
                setAffiches(e.data.affiches)
            })
            .catch(err => {

            })
    }, [])

return (
    <Layout>

    </Layout>
)
};