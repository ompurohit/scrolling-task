import React, { useState, useEffect } from 'react'

import axios from "axios";

export default function App() {
    
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const styles = {
        display: 'inline',
        width: '30%',
        float: 'left',
        padding: 5,
        border: '0.5px solid black',
        marginBottom: 10,
        marginRight: 10,
    }

    function removeBackground() {
        const elements = document.getElementsByClassName('bgYellow');
        console.log(elements);
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "transparent";
        }
    }
    
    const handleSearch = (event) => {
        let value = +event.target.value;
        const obj = allData.find(item => item.id === value);
        const element = obj ? document.getElementById(obj.id) : false;
        // console.log(element, value);
        if (element){
            element.scrollIntoView({
                beementhavior: "smooth",
                block: "start",
                inline: "center",
            });
            element.classList.add("bgYellow");
        }else{
            removeBackground();
        }
    }


    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/albums/')
            .then(response => {
                setAllData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.log('Error getting fake data: ' + error);
            })
    }, []);
    return (
        <div className="App">
            <div style={{ margin: '0 auto', marginTop: '5%', marginLeft:'5px' }}>
                <label>Search:</label>
                <input type="text" onChange={(event) => handleSearch(event)} placeholder="Enter userId or title"/>
            </div>

            <div style={{
                padding: 10,
                height: '400px',
                overflowY: 'auto' }}>
                {filteredData.map((value, index) => {
                    return (
                        <div key={value.id}>
                            <div style={styles} id={value.id} className="transparent">
                                {value.id} - {value.title} ( {value.userId} )
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )

}