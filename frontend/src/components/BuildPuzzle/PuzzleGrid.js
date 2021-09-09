import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import PuzzleBox from "./PuzzleBox";

export function PuzzleGrid (props) {
    const [state, setState] = useState({
        viewPort: {height:0, width:0}
    });
    let gridDiv = useRef(null);

    useEffect(() => {
        const reportWindowSize = _.throttle(() => {
          console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`);
          let n = window.innerWidth * .33
          setState({...state, viewPort: {width: n, height: n}});
        }, 100);
    
        reportWindowSize();
        window.addEventListener('resize', reportWindowSize);
        
        return () => {window.removeEventListener('resize', reportWindowSize);}
      }, []);

    useEffect(() => {
        if (state.viewPort) {
          let n = state.viewPort.width;
          gridDiv.current.style.height = `${n}px`;
          gridDiv.current.style.width = `${n}px`;
        }
      });

    return(
        <div ref={gridDiv} value={props.value.slice(0, 9)} style={{
            background: 'skyblue',
            top: '0',
            left: '0',
            height: '0',
            width: '0' } } className='d-flex'>
              <div>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={1} onClick={props.onClick} value={props.value.slice(0, 9)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={4} onClick={props.onClick} value={props.value.slice(9, 18)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={7} onClick={props.onClick} value={props.value.slice(18, 27)}/>
              </div>
              <div>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={2} onClick={props.onClick} value={props.value.slice(27, 36)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={5} onClick={props.onClick} value={props.value.slice(36, 45)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={8} onClick={props.onClick} value={props.value.slice(45, 54)}/>
              </div>
              <div>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={3} onClick={props.onClick} value={props.value.slice(54, 63)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={6} onClick={props.onClick} value={props.value.slice(63, 72)}/>
                <PuzzleBox height={state.viewPort.height} width={state.viewPort.width} box={9} onClick={props.onClick} value={props.value.slice(72, 81)}/>
              </div>
        </div>
    );
}

export default PuzzleGrid;