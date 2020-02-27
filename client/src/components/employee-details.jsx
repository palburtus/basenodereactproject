import React from 'react';

class EmployeeDetails extends React.Component{
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            firstName: this.getParameterByName('firstName'),
            lastName: this.getParameterByName('lastName'),
            title: this.getParameterByName('title'),
            project: this.getParameterByName('project')
        }
    }

    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    render(){
    
        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="../">Employees</a></li>
                        <li className="breadcrumb-item" aria-current="page">Details</li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.lastName}</li>
                    </ol>
                </nav>
                <h1>Employee Details</h1>
                <div className="card-body">
                        <h5 className="card-title">{this.state.firstName} {this.state.lastName}</h5>
                        <p>
                            {this.state.firstName} is a <strong>{this.state.title}</strong> currently
                            working on <strong>{this.state.project}</strong>.
                        </p>
                </div>
            </div>
        );
    }

    
}

export default EmployeeDetails;
