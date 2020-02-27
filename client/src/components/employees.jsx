import React from 'react';
import EmployeeListItem from './employee-list-item'
import Ad from './ad'
import Cookies from 'universal-cookie';

class Employees extends React.Component{
    
    constructor(props, context) {
        super(props, context);
        
        const cookies = new Cookies();
        
        var employees = cookies.get('wbmdqa_employees');

        if(!employees){
            employees = [
                {
                    "firstName" : "Greg",
                    "lastName" : "Nettles",
                    "jobTitle" : "Sr Mobile Developer",
                    "currentProject" : "Medscape"
                },
                {
                    "firstName" : "Carl",
                    "lastName" : "Pavano",
                    "jobTitle" : "Lead Mobile Developer",
                    "currentProject" : "WebMD"
                },
            ];

            cookies.set('wbmdqa_employees', employees, { path: '/' });
        }

        this.state = {
            employees: employees
        }
    }

    viewEmployeeDetails(employee) {

        window.location.href = './employees/details?firstName=' + employee.firstName 
            + "&lastName=" + employee.lastName
            + "&title=" + employee.jobTitle
            + "&project=" + employee.currentProject
    }

    deleteEmployee(employeeIndex){
        
        // eslint-disable-next-line no-restricted-globals
        var r = confirm("Are you sure you want to delete this employee");
        if (r == true) {
            this.state.employees.map((e, i) => {
                if(employeeIndex === i){
                    const cookies = new Cookies();
                    this.state.employees.splice(i, 1);
                    cookies.set('wbmdqa_employees', this.state.employees, { path: '/' });
                }
            });
        } 
    }

    render(){

        var adIndex = 0;
        var employees = this.state.employees.map((e, i) => {
            if(adIndex < 2){
                adIndex++;
                return (
                    
                        <div className="card employee-list-card" key={i}>
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => this.viewEmployeeDetails(e)}>{e.firstName} {e.lastName}</h5>
                                <p><strong>{e.jobTitle}</strong></p>
                                <a href="#" onClick={() => this.viewEmployeeDetails(e)} class="btn btn-primary">View Details</a>
                                <a href="#" onClick={() => this.deleteEmployee(i)} class="btn btn-danger employee-list-button"><span>Delete Employee</span></a>
                            </div>
                        </div>
                        
                        
                    )
            }else {
                adIndex = 1;
                return (
                    <div>
                        <Ad/>
                        <div className="card employee-list-card" key={i}>
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => this.viewEmployeeDetails(e)}>{e.firstName} {e.lastName}</h5>
                                <p><strong>{e.jobTitle}</strong></p>
                                <a href="#" onClick={() => this.viewEmployeeDetails(e)} class="btn btn-primary">View Details</a>
                                <a href="#" onClick={() => this.deleteEmployee(e)} class="btn btn-danger employee-list-button"><span>Delete Employee</span></a>
                            </div>
                        </div>
                    </div>
                )
            }
                
        });

        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Employees</li>
                    </ol>
                </nav>
                <h1>Axis Chemicals Employee Directory</h1>

                <a href="./employees/add" className="btn btn-success">Add Employee</a>

                {employees}
            </div>
        );
    }
}

export default Employees;