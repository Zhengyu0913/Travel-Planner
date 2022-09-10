import React, { Component, createRef , useState, useEffect} from "react";
import { useTransition, animated, config } from 'react-spring'
import Container from "@material-ui/core/container"

import SearchBar from "./SearchBar"
import img1 from '../assets/images/10708211.jpg'
import img2 from '../assets/images/20220829190804.jpg'
import img3 from '../assets/images/20220829190821.jpg'
import img4 from '../assets/images/20220829190830.jpg'

function Home(props) {
    const handleSearch = (option) => {
        const {keyword} = option;
    };
    const images = [
        {id:0, img: img1},
        {id:1, img: img2},
        {id:3, img: img3},
        {id:4, img: img4},
    ];

    const Imagechange = () => {
        const [value, setValue] = useState(0)
        const transition = useTransition(images[value],item => item.id, {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
            config: config.molasses,
        })
        useEffect(() => {
            const timer = setInterval(() => {
                setValue((V) => {
                    return (V + 1) % images.length;
                });
            }, 6000);
            return () => clearInterval(timer);
        }, [])
        return transition.map(({item, props, key}) => (
            <animated.div key={key} className="bg-image" style={{...props, backgroundImage: `url(${item.img})`}} />
        ))
    }

    return (
        <Container maxWidth={false} style={{padding: "0px"}}>
            <Imagechange />
            <div className="home">
                <SearchBar handleSearch={handleSearch} />
            </div>
        </Container>
    )
}

export default Home;