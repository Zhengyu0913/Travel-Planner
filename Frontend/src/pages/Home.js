import React, {useState, useEffect} from "react";
import {useTransition, animated, config} from "react-spring";

import img1 from "../assets/images/10708211.jpg";
import img2 from "../assets/images/20220829190804.jpg";
import img3 from "../assets/images/20220829190821.jpg";
import img4 from "../assets/images/20220829190830.jpg";
import {Container} from "@mui/material";

function Home(props) {
    const images = [
        {id: 0, img: img1, quote: "“The journey of a thousand miles begins with a single step.”"},
        {id: 1, img: img2, quote: "“Dare to live the life you’ve always wanted.”"},
        {id: 3, img: img3, quote: "“Adventures are the best way to learn.”"},
        {id: 4, img: img4, quote: "“Leave nothing but footprints, take nothing but photos, kill nothing but time.”"},
    ];

    const Imagechange = () => {
        const [value, setValue] = useState(0);
        const transition = useTransition(images[value], (item) => item.id, {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0},
            config: config.molasses,
        });
        useEffect(() => {
            const timer = setInterval(() => {
                setValue((V) => {
                    return (V + 1) % images.length;
                });
            }, 7000);
            return () => clearInterval(timer);
        }, []);
        return transition.map(({item, props, key}) => (
                <animated.div
                    key={key}
                    className="bg-image"
                    style={{...props, backgroundImage: `url(${item.img})`}}
                >
                    <h1 className="quote"><span>{item.quote}</span></h1>
                </animated.div>
        ));
    };

    return (
        <Container maxWidth={false} style={{padding: "0px"}}>
            <Imagechange/>
        </Container>
    );
}

export default Home;
