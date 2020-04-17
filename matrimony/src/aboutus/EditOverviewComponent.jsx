import React, { Component } from 'react'
import {updateOverview,fetchOverviewById} from "../util/APIUtils";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getCurrentDate} from '../util/util';
import Alert from 'react-s-alert';
class EditOverviewComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            title: '',
            description: ''
        }
        this.saveOverview = this.saveOverview.bind(this);
        this.loadOverview = this.loadOverview.bind(this);
    }

    componentDidMount() {
        this.loadOverview();
    }

    loadOverview() {
        fetchOverviewById(window.localStorage.getItem("overviewId"))
            .then((res) => {
                console.log(res);
                let overview = res;
                this.setState({
                    id: overview.id,
                    title: overview.title,
                    description: overview.description
                })
                console.log("overview :",overview);
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveOverview = (e) => {
        e.preventDefault();
        //let overview = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        let overview = {id: this.state.id,title: this.state.title, description: this.state.description}
            console.log(JSON.stringify(overview));
        updateOverview(overview)
            .then(res => {
                Alert.success("Overview updated successfully.");
                this.setState({message : 'Overview updated successfully.'});
                this.props.history.push('/overviews');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit Overview</Typography>
                <form>

                        <TextField type="text" placeholder="title" fullWidth margin="normal" name="title" value={this.state.title} onChange={this.onChange} required/>

                        <TextField type="text" placeholder="description" fullWidth margin="normal" name="description" value={this.state.description} onChange={this.onChange} required/>

                        <Button variant="contained" color="primary" onClick={this.saveOverview}>Save</Button>

                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditOverviewComponent;