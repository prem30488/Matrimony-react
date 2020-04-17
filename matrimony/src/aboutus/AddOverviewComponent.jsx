import React, { Component } from 'react';
import {addOverview} from "../util/APIUtils";
import {getCurrentDate} from '../util/util';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from 'react-s-alert';
class AddOverviewComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: '',
            description: ''
        }
        this.saveOverview = this.saveOverview.bind(this);
    }

    saveOverview = (e) => {
        e.preventDefault();
        //const file = e.target.files[0];
        let overview = {title: this.state.title, description: this.state.description};
            console.log(overview);
            addOverview(overview)
            .then(res => {
                console.log(JSON.stringify(res));
                Alert.success("Overview added successfully.");
                this.setState({message : 'Overview added successfully.'});
                this.props.history.push('/overviews');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add Overview</Typography>
                <form style={formContainer}>

                <TextField type="text" placeholder="title" fullWidth margin="normal" name="title" value={this.state.title} onChange={this.onChange} required/>

                <TextField type="text" placeholder="description" fullWidth margin="normal" name="description" value={this.state.description} onChange={this.onChange} required/>

                <Button variant="contained" color="primary" onClick={this.saveOverview}>Save</Button>
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

export default AddOverviewComponent;

