import React, { Component } from 'react';
import {addUser} from "../util/APIUtils";
import {getCurrentDate} from '../util/util';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from 'react-s-alert';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            email: '',
            name: '',
            imageURL: '',
            provider: 'local',
            createdAt: null,
            updatedAt: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        //const file = e.target.files[0];
        let user = {username: this.state.username, password: this.state.password, 
            name: this.state.name, email: this.state.email, imageURL: this.state.imageURL,
            createdAt: getCurrentDate(), updatedAt: getCurrentDate(), provider : this.state.provider};
            //selectedFile: file};
            console.log(user);
            addUser(user)
            .then(res => {
                console.log(JSON.stringify(res));
                Alert.success("User added successfully.");
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>

                <TextField type="text" placeholder="username" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange} required/>

                <TextField type="password" placeholder="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange} required/>

                <TextField placeholder="name" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange} required/>

                <TextField placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange} required/>
                
                <div className="form-group">
                    <label>image:</label>
                    <input type="file" className="form-control" name="file" value={this.state.imageURL} onChange={this.onChange}/>
                </div>
                
                <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
            </form>
    </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddUserComponent;

