var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Notes = React.createClass({
	getInitialState : function(){

		return {  config : {} }
		//return { write : true , notesArray : [] , clear: false}
	},
	delete : function(key){
		var notes = this.state.notes;
		notes.splice(notes.indexOf(key) , 1);
		this.setState({ notes : notes})

	},
	edit : function(key){
		this.state.config = {}; //clearing previous state to prevent unidentified states mismatch.
		this.state.config[key]  = { write : true , clear : false}
		this.setState({config : this.state.config });
		//this.setState({write : true , clear : false});
	},
	clear : function(key){
		this.state.config = {};  //clearing previous state to prevent unidentified states mismatch.
		this.state.config[key]  = { write : true , clear : true}
		this.setState({config : this.state.config} );
		
	},
	componentWillReceiveProps : function(nextProps){
		//clearing the previous read and clear states.
		var notes = nextProps.notes || this.props.notes;
		this.state.notes = notes;
		this.state.config = {};
	},
	render : function(){
		var self = this;
		var notes = self.state.notes || this.props.notes;
		var allNotes = notes.map(function(note){
			  
				return <div className = "note" key={note}><NoteContent  states = {self.state.config[note]} /> <img onClick = {self.delete.bind(self , note)} className = "img-delete" src ='assets/icons/delete.png'/><img onClick = {self.clear.bind(self , note)} className = "img-clear" src ='assets/icons/clear.png'/><img  onClick = {self.edit.bind(self , note)}  className = "img-edit" src ="assets/icons/edit.png"/></div>
			})
		return <div className='notes-container'>{allNotes}</div>
	}

});

 var NoteContent = React.createClass({

 		getInitialState : function(){

 			return {   config  : {  write : true , clear : false , data : ""} }
 		},
 		
 		
		componentWillReceiveProps : function(nextProps){	
			var props = nextProps.states ;  
 
 			//updating states
 			if(props){
 				this.state.config.clear = props.clear;
 				this.state.config.write = props.write;	
 			}
 			
			
		},
 		render : function(){
 				if(this.state.config.clear === true) {  
 					return this.renderWriteMode() 
 			 	} 
 			 	else if(this.state.config.write === false) {
 			 		return this.renderReadMode(); 
 			 	}
 			 	else return this.renderWriteMode();
 			
 		},
 		renderWriteMode : function(){
 			if(this.state.config.clear == true) { this.state.config.data = "" ; }

 			return <textarea  placeholder= "Enter your note!" defaultValue = {this.state.config.data} onBlur = {this.onBlur} onChange = {this.handleChange}></textarea>
 		},
 		renderReadMode : function(){
 			return <div className = "note-text"><b>{this.state.config.data}</b></div>
 		},
 		handleChange : function(event){
 			var val = event.target.value;
 			if(val.length) {
 				this.state.config.data = val;
 			}else
 			{
 				this.state.config.data = "Enter your text";
 			}
 		},
 		onBlur : function(){
 			this.state.config.write = false;
 			this.state.config.clear = false;
 			this.setState({ config : this.state.config});
 		}

 });
var NoteIcon = React.createClass({
	
	createNote  : function(){

		var notes = this.props.object.state.notes;
		if(notes.length >=1 ){
			notes.push(notes[notes.length-1] +1 );	
		}else{
			notes.push(notes.length);
		}
		
		this.props.object.setState({notes : notes});
	},
	render : function(){
			
		return <img className = "addIcon right" onClick = {this.createNote} src = "assets/icons/add.png" />
	}

});

var Board = React.createClass({

	propTypes : {
		count : function(props , propsName){
			 
			if(typeof props[propsName] != 'number'){
				return new Error('Please enter only number');
			}else if(props[propsName] > 20){
				return new Error('The number should not be more than 10');
			}
		}
	},
	getInitialState : function(){
		return {notes : []}
	},
	
	render : function(){
			
			return (<div><NoteIcon object = {this} /><div className='board'><Notes notes = {this.state.notes}/></div></div>)
	}
	
});

ReactDOM.render( <Board count = {10} /> , document.getElementById('main'));
