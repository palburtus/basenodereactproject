import React from 'react';

class Ad extends React.Component{
    
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return(
            <div className="advertisement">
                <h5>Advertisement</h5>
            </div>
        )
    }
}

export default Ad;