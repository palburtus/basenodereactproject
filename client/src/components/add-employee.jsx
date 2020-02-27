import React from 'react';
import Cookies from 'universal-cookie';
import $ from "jquery";

class AddEmployee extends React.Component{
    
    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            firstNameIsValid: true,
            lastName: '',
            lastNameIsValid: true,
            title: '',
            titleIsValid: true,
            project: '',
            projectIsValid: true,
            isValid: true,
            validationCount: 0
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        
        e.preventDefault();

        var isValid = true;
        var validationErrors = 0;

        if(!this.state.firstName){
            this.setState({ "firstNameIsValid" : false});
            validationErrors++;
            isValid = false;
        }else {
            this.setState({ "firstNameIsValid" : true});
        }

        if(!this.state.lastName){
            this.setState({ "lastNameIsValid" : false});
            validationErrors++;
            isValid = false;
        }else {
            this.setState({ "lastNameIsValid" : true});
        }

        if(!this.state.title){
            this.setState({ "titleIsValid" : false});
            validationErrors++;
            isValid = false;
        }else {
            this.setState({ "titleIsValid" : true});
        }

        if(!this.state.project){
            this.setState({ "projectIsValid" : false});
            validationErrors++;
            isValid = false;
        }else {
            this.setState({ "projectIsValid" : true});
        }

        if(validationErrors > 0){
            validationErrors++;
        }

        this.setState({ 
            "isValid" : isValid,
            "validationCount" : validationErrors
        });

        if(isValid){

            const cookies = new Cookies();

            var employees = cookies.get('wbmdqa_employees');
            
            let employee = {
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "jobTitle" : this.state.title,
                "currentProject" : this.state.project
            }
            
            employees.push(employee);

            cookies.set('wbmdqa_employees', employees, { path: '/' });

            window.location.href = '../';
            
        }
    }

    handleInputChange(event) {

        this.setState({ 
            "isValid" : true,
            "validationCount" : 0
        });

        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render(){
       
        if(!this.state.isValid){
            
            $(".toast").toast({
                delay: 3000
            })
            
            $(".toast").toast('show');

            
        }
        

        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="../">Employees</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <h1>Add New Employee</h1>

                <form onSubmit={this.handleSubmit}>
                    
                    <p><span className="red-text">All fields are required</span></p>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input value={this.state.firstName} name="firstName" type="text" className="form-control" id="firstName" onChange={this.handleInputChange} />
                        {!this.state.firstNameIsValid && ( <div className="red-text">First Name is required</div> )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input value={this.state.lastName} name="lastName" type="text" className="form-control" id="lastName" onChange={this.handleInputChange} />
                        {!this.state.lastNameIsValid && ( <div className="red-text">Last Name is required</div> )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Job Title</label>
                        <select value={this.state.title} name="title" type="text" className="form-control" id="title" onChange={this.handleInputChange} >
                            <option value=""></option>
                            <option value="Associate Developer">Associate Developer</option>
                            <option value="Developer">Developer</option>
                            <option value="Sr Developer">Sr Developer</option>
                            <option value="Lead Developer">Lead Developer</option>
                            <option value="Qa Tester">Qa Tester</option>
                            <option value="Qa Automation Engineer">Qa Automation Engineer</option>
                            <option value="Qa Lead">Qa Lead</option>
                        </select>
                        {!this.state.titleIsValid && ( <div className="red-text">Please select a title</div> )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="project">Current Project</label>
                        <select value={this.state.project} name="project" type="text" className="form-control" id="project" onChange={this.handleInputChange} >
                            <option value=""></option>
                            <option value="Professional">Professional</option>
                            <option value="Consumer">Consumer</option>
                        </select>
                        {!this.state.projectIsValid && ( <div className="red-text">Please select a project</div> )}
                    </div>

                    <button className="btn btn-primary" type="submit">Create Employee</button>

                </form>

                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="mr-auto">Could not Create Employee</strong>
                        <small>{this.state.validationCount} fields are incorrect</small>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Employee not created due, please enter a value for all fields
                    </div>
                </div>

            </div>
        );
    }

    
}

export default AddEmployee;