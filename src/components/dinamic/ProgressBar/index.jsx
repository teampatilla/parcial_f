import React from 'react';

const ProgressBar = ({color,colorBar,...props}) => (
    <div className="linear-progress" style={{backgroundColor: color ? color : null}}>
        Cargando...
        <div className="bar bar1" style={{backgroundColor: colorBar ? colorBar : null}}></div>
        <div className="bar bar2"style={{backgroundColor: colorBar ? colorBar : null}}></div>
    </div>
)

export default ProgressBar;