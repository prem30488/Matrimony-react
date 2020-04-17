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
import {getUserList} from '../util/APIUtils'
import TablePagination from '@material-ui/core/TablePagination';

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            page: 0,
            rowsPerPage:5,
            count: 0
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);   
    }

    setPage(page){
        console.log('setpage called',page);
        this.setState({
            page: page
      });
      this.reloadUserList();
    }

    setRowsPerPage(rowsPerPage){
        console.log('setRowsPerPage called',rowsPerPage);
        this.setState({
            rowsPerPage: rowsPerPage
      });
      this.reloadUserList();
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
      getUserList(this.state.page,this.state.rowsPerPage)
            .then((res) => {
                this.setState({users: res.content, count: res.totalElements })
            });
            console.log(JSON.stringify(this.state.users));
    }

    deleteUser(userId) {
        // ApiService.deleteUser(userId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({users: this.state.users.filter(user => user.id !== userId)});
        //    })
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
      };

      handleChangeRowsPerPage = event => {
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
      };

      componentDidUpdate() {
        this.reloadUserList();
        console.log(JSON.stringify(this.state.users));
      }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>User Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                    Add User
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Userame</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users
                        //.slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage)
                        .map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={this.state.count}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;