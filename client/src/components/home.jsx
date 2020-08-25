import React from 'react';
import data from '../data.json';
import $ from "jquery";
import { Modal, Button } from 'react-bootstrap';

class Home extends React.Component{
    
    constructor(props, context) {
        super(props, context);
        let dataObj = JSON.parse(data);
        this.state = {
            isEditingNotes: false,
            currentNotePlayer: '',
            currentNote: '',
            playerSearchValue: '',
            filterPosition: 'ALL',
            dataObj: dataObj
        }
        
        this.openNotes = this.openNotes.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.dismissNote = this.dismissNote.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.setDrafted = this.setDrafted.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
          isError: false
        });
     }

     handlePositionChange(e){
        var position = e.target.value;
        this.setState({ filterPosition: position });
     }

    openNotes(playerName, note){        
        this.setState({
            isEditingNotes: true,
            currentNotePlayer: playerName,
            currentNote: note
        });       
     
    }    

    saveNote(){
        this.setState({
            isEditingNotes: false
        });

        let node = this.state.currentNote;
        let player = this.state.currentNotePlayer;
        
        //let path = 'C:\Users\patri\source\notes.json';
        //await writeJsonFile(path, {foo: true});
        
    }

    setDrafted(playerName){
        let data = this.state.dataObj;
        
        data.map((item, i) => {
            if(item.player_name === playerName){
                item.is_available = !item.is_available;
                
            }
        });
        
        this.setState({
            dataObj : data
        });

    }
  

    dismissNote(){
        this.setState({
            isEditingNotes: false
        });
    }

    render(){
        
        
        

        return(
            <div>
                
                <form>
                    <div className="form-row">
                        <div className="col-4">
                            <input type="text" className="form-control" name="playerSearchValue" onChange={this.handleInputChange} placeholder="Player Name" value={this.state.playerSearchValue}/>
                        </div>
                        <div className="col-2">
                            <select className="form-control"  value={this.state.filterPosition} onChange={this.handlePositionChange }>
                                <option value="ALL">ALL</option>
                                <option value="RB">RB</option>
                                <option value="WR">WR</option>
                                <option value="QB">QB</option>
                                <option value="TE">TE</option>
                            </select>
                        </div>
                    </div>
                </form>

                <table className="table tableFixHead">
                    <thead>
                        <tr>
                            <th scope="col" className="table-col-sm">#</th>
                            <th scope="col">Player</th> 
                            <th scope="col">POS</th>
                            <th scope="col">Team</th>
                            <th scope="col">ADP</th>
                            <th scope="col">'19 Cost</th>
                            <th scope="col">'19 Drafted Team</th>
                            <th scope="col">Air Yards</th>
                            <th scope="col">WOPR</th>
                            <th scope="col">Rush Attps</th>
                            <th scope="col">YPC</th>
                            <th scope="col">TDs</th>
                            <th scope="col">Note</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.dataObj.map((item, i) => {
                                
                                if(item.player_name.toLowerCase().includes(this.state.playerSearchValue.toLowerCase())){
                                    
                                    if(item.position === this.state.filterPosition || this.state.filterPosition === 'ALL'){
                                        
                                    

                                    let costCell = item.cost;
                                    let rowClassName = ''
                                    
                                    if(item.is_2019_keeper === "True"){
                                        costCell = item.cost + ' (k)' 
                                    }
    
                                    let buttonText = 'Draft';
                                    let buttonClass = 'btn btn-info';

                                    if(!item.is_available){
                                        rowClassName = "keeper";
                                        buttonClass = 'btn btn-light';
                                        buttonText = "Undo";
                                    }

                                    if(item.is_2020_keeper === "True"){
                                        rowClassName = "keeper";
                                        buttonClass = 'hidden';
                                        buttonText = '';
                                    }
    
                                    return  <tr className={rowClassName}>
                                                <td  className="table-col-sm" scope="row">{(i + 1)}</td>
                                                <td>{item.player_name}</td>
                                                <td>{item.position}</td>
                                                <td>{item.nfl_team}</td>
                                                <td>{item.adp}</td>
                                                <td>{costCell}</td>
                                                <td>{item.drafted_by}</td>
                                                <td>{item.air_yards}</td>
                                                <td>{item.wopr}</td>
                                                <td>{item.rush_attempts}</td>
                                                <td>{item.yards_per_carry}</td>
                                                <td>{item.TDs}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <button type="button" onClick={() => this.setDrafted(item.player_name)} className={buttonClass}>{buttonText}</button>
                                                </td>
                                            </tr>
                                
                                    }
                                }
                            })
                                
                        }
                    
                    </tbody>
                </table>
                
                <Modal show={this.state.isEditingNotes} onHide={this.dismissNote}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.state.currentNotePlayer}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <textarea className="form-control" id="message-text" value={this.state.currentNote} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.dismissNote}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveNote}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
}

export default Home;