import React from 'react';
import Button from '../button/Button';

import './Controls.css';

export default function Controls(props) {
    let buttons = props.buttons.map(button => {
        return (
            <Button {...button} key={button.label} />
        );
    });

    return (
        <div className="controls">
            {buttons}
            <div className="generation">Generation: <strong>{props.generation}</strong></div>
        </div>
    );
}