import PropTypes from 'prop-types';
import React from "react";
import cx from "classnames";

class Result extends React.Component {

	constructor(props) {
		super(props);
		this.editUser = this.editUser.bind(this);
	}

	renderValue(field, doc) {
		const value = [].concat(doc[field] || null).filter((v) => v !== null);

		return value.join(", ");
	}
	editUser(id) {
        //window.localStorage.setItem("profileId", id);
		//this.props.history.push('/viewProfile');
    }  
	render() {
		const { bootstrapCss, doc, fields } = this.props;

		return (
			<div>
				
			<li className={cx({"list-group-item": bootstrapCss})} onClick={() => this.props.onSelect(doc)}>
				<ul>
				{fields.filter((field) => field.field === "id").map((field, i) =>
						<li key={i} >
							<div className="col-sm-3 profile_left-top" style={{cursor:"pointer"}} 
							//onClick={() => this.editUser(this.renderValue(field.field, doc))}
							>
	    						<img src={`images/${this.renderValue(field.field, doc)}.jpg`} className="img-responsive" alt="profile_image"
								style={{height:"300px"}}
								/>
	    					</div>
						</li>						
					)}
					{fields.filter((field) => field.field !== "*").map((field, i) =>
						<li key={i}>
							<label>{field.label || field.field}</label>
							{this.renderValue(field.field, doc)}
						</li>
					)}
					
				</ul>
			</li>
			</div>
		);
	}
}

Result.propTypes = {
	bootstrapCss: PropTypes.bool,
	doc: PropTypes.object,
	fields: PropTypes.array,
	onSelect: PropTypes.func.isRequired
};

export default Result;