import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {getOverviewList} from '../util/APIUtils'
import TablePagination from '@material-ui/core/TablePagination';
class Overview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            overviews: [],
            message: null
        }
        this.deleteOverview = this.deleteOverview.bind(this);
        this.editOverview = this.editOverview.bind(this);
        this.addOverview = this.addOverview.bind(this);
        this.reloadOverviewList = this.reloadOverviewList.bind(this);
    }

    componentDidMount() {
        this.reloadOverviewList();
    }

    reloadOverviewList() {
      getOverviewList()
            .then((res) => {
                this.setState({overviews: res.content})
            });
    }

    deleteOverview(overviewId) {
        // ApiService.deleteOverview(overviewId)
        //    .then(res => {
        //        this.setState({message : 'Overview deleted successfully.'});
        //        this.setState({overviews: this.state.overviews.filter(overview => overview.id !== overviewId)});
        //    })
    }

    editOverview(id) {
        window.localStorage.setItem("overviewId", id);
        this.props.history.push('/edit-overview');
    }

    addOverview() {
        window.localStorage.removeItem("overviewId");
        this.props.history.push('/add-overview');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Overview Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addOverview()}>
                    Add Overview
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Overview Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.overviews.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right" onClick={() => this.editOverview(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteOverview(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default Overview;