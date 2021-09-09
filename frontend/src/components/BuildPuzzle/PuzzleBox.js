import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import PuzzleCell from "./PuzzleCell";

export function PuzzleBox (props) {
    const size = Math.min(props.height, props.width) / 3
    return(
        <div style={{width:size, height:size, className:'border border-dark border-3'}}>
            <div className='row g-0'>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={1} onClick={props.onClick} value={props.value.charAt(0)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={2} onClick={props.onClick} value={props.value.charAt(1)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={3} onClick={props.onClick} value={props.value.charAt(2)}/>
              </div>
              <div className='row g-0'>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={4} onClick={props.onClick} value={props.value.charAt(3)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={5} onClick={props.onClick} value={props.value.charAt(4)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={6} onClick={props.onClick} value={props.value.charAt(5)}/>
              </div>
              <div className='row g-0'>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={7} onClick={props.onClick} value={props.value.charAt(6)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={8} onClick={props.onClick} value={props.value.charAt(7)}/>
                <PuzzleCell boxHeight={size} boxWidth={size} box={props.box} cell={9} onClick={props.onClick} value={props.value.charAt(8)}/>
              </div>
        </div>
    );
}

export default PuzzleBox;