import React, { Component }from 'react';

function Square(props){
    return(

        <button onClick={()=> props.onClick()} className="square"> {props.value} </button>

    );
}

export default Square;