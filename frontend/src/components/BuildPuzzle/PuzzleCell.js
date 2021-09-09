import React from "react";
import _ from "lodash";

export function PuzzleCell (props) {
    const size = Math.min(props.boxHeight, props.boxWidth) / 3;

    const cellLocation = {
        box: props.box,
        cell: props.cell
    };

    const showToggle = showContexts();

    // let borderClasses = '';
    // function styleCell(){
    //     switch (props.cell) {
    //         case 1:
    //             borderClasses = 'border-top border-left border-dark';
    //         case 2:
    //             borderClasses = 'border-top border-dark';
    //         case 3:
    //             borderClasses = 'border-top border-right border-dark';
    //         case 4:
    //             borderClasses = 'border-left border-dark';
    //         case 6:
    //             borderClasses = 'border-right border-dark';
    //         case 7:
    //             borderClasses = 'border-left border-bottom border-dark';
    //         case 8:
    //             borderClasses = 'border-bottom border-dark';
    //         case 8:
    //             borderClasses = 'border-bottom border-dark';
    //     }
    // }
    return(
        <div style={{width:size, height:size, border:'black'}} className='border border-1 border-dark' onClick={() => props.onClick(cellLocation)}>
            {props.value}
        </div>
    );
}

export default PuzzleCell;