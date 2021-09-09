import React, { useState, useReducer, createContext, useContext } from "react";
import PuzzleGrid from "./PuzzleGrid";
import _ from "lodash";

export function BuildPuzzle (props) {

    return(
            <div className='d-flex justify-content-center'>
                <PuzzleGrid value={state.cells} onClick={onClick} />
            </div>
    );
}

export default BuildPuzzle;