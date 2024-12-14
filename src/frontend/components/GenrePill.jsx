import React from 'react';

const GenrePill = ({ genre }) => (
    <div style={{
        padding: '15px',
        borderRadius: '50px',
        width: '180px',
        background: 'transparent',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: '1.5px',
        textAlign: 'center'
    }}>
        <p style={{ margin: '0', color: "white"}}>{genre}</p>
    </div>
);

export default GenrePill;