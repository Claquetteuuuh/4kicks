import React, { FC, useEffect, useState } from 'react';
import TextInput from '../SearchBar/SearchBar';
import axios from 'axios';
import { AfficheType } from '../../../types/home/Affiche';

const [motCles, setmotCles] = useState()
const [data, setdata] = useState()

    useEffect(() => {
        axios.get(`/api/recherches?motCles=${motCles}`)
            .then(e => {
                setdata(e.data.recherches)
            })
            .catch(err => {

            })
    }, [])

export default function Layout(){
    return <header>
        <TextInput placeholder='Rechercher...' state='motCles' setState={setmotCles} />
      </header>
}