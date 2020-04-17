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
class OverviewsUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            overviews: [],
            message: null
        }
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

    

    render() {
        return (
            <React.Fragment>
                <div className="clearfix"></div>
    <section className="spacer" id="about-me">
      <div className="">
        <div className="container">
          <div className="row">
                {this.state.overviews.map((overview) =>
                <div className="col-md-6" key={overview.id}>
              <div className="heading">
                <h2>{overview.title}</h2>
              </div>
              <div className="about_mission">
                <div>
                  <p> {overview.description} </p>
                
                </div>
              </div>
            </div>
  )}                
   </div>
          <br /><br /><br />
        </div>
      </div>
    </section>
            </React.Fragment>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default OverviewsUser;