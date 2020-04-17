import React, { Component } from 'react'
import {updateUser,fetchUserById} from "../util/APIUtils";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getCurrentDate} from '../util/util';
import Alert from 'react-s-alert';
class EditUserComponent extends Component {

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
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    email: user.email,
                    imageURL: user.imageURL,
                    provider: user.provider,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                })
                console.log("user :",user);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        //let user = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        let user = {id: this.state.id,username: this.state.username, password: this.state.password, 
            name: this.state.name, email: this.state.email, imageURL: "no image",
            createdAt: this.state.createdAt, updatedAt: getCurrentDate(), provider : this.state.provider};
            //selectedFile: file};
            console.log(JSON.stringify(user));
        updateUser(user)
            .then(res => {
                Alert.success("User updated successfully.");
                this.setState({message : 'User updated successfully.'});
                this.props.history.push('/users');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>

                        <TextField type="text" placeholder="username" fullWidth margin="normal" name="username" value={this.state.username} required/>

                        <TextField placeholder="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange} required/>

                        <TextField placeholder="name" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange} required/>

                        <TextField type="text" placeholder="email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange} required/>

                        <TextField type="text" placeholder="provider" fullWidth margin="normal" name="provider" value={this.state.provider} onChange={this.onChange} required/>

                        <TextField type="text" placeholder="createdAt" fullWidth margin="normal" name="createdAt" value={this.state.createdAt} onChange={this.onChange}/>

                        <TextField type="text" placeholder="updatedAt" fullWidth margin="normal" name="updatedAt" value={getCurrentDate()} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;