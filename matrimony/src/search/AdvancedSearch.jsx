import React, {Component} from 'react';
import ReactDOM from 'react-dom';
 import SolrFacetedSearch from "../components/solr-faceted-search";
 import defaultComponentPack from "../components/component-pack";
 import { SolrClient } from "../api/solr-client";


// export default SolrFacetedSearch;

 export {
 	SolrFacetedSearch,
 	defaultComponentPack,
 	SolrClient
 };

 // The search fields and filterable facets you want
const fields = [
    {label: "All text fields", field: "*", type: "text"},
    {label: "Name", field: "name", type: "text"},
    {label: "Gender", field: "sex", type: "list-facet"},
    {label: "Date of birth", field: "date_of_birth", type: "range-facet"},
    {label: "Age", field: "age", type: "range-facet"},
    {label: "Height", field: "height", type: "range-facet"},
    {label: "Religion", field: "religion", type: "list-facet"},
    {label: "Marital Status", field: "marital_status", type: "list-facet"},
    {label: "Country", field: "location", type: "list-facet"},
    {label: "State", field: "state", type: "text"},
    {label: "Education", field: "education", type: "text"},
    {label: "Diet", field: "diet", type: "list-facet"},
    {label: "Mother Tounge", field: "mother_toung", type: "list-facet"},
    {label: "Smoking", field: "smoke", type: "list-facet"},
    {label: "Drinking", field: "drink", type: "list-facet"},
  ];
  
  // The sortable fields you want
  const sortFields = [
    {label: "Name", field: "name"},
    {label: "Date of birth", field: "date_of_birth"},
    {label: "Age", field: "age"},
    {label: "Height", field: "height"}
  ];
  
  
class AdvancedSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            test: false,
        };
    }
    render() {
        return (                
                <div id="solrDiv2"></div>
        )
    }
    componentDidMount() { 
        this.timer = setInterval(
            () => this.setState(prevState => ({ test: !prevState.test })),
            2000,
        );
        //document.addEventListener("DOMContentLoaded", () => {
          // The client class
          new SolrClient({
              idField:"id",
              // The solr index url to be queried by the client
              url: "http://localhost:8983/solr/UserProfile/select",
              searchFields: fields,
              sortFields: sortFields,
              pageStrategy: "paginate",
        
              // The change handler passes the current query- and result state for render
              // as well as the default handlers for interaction with the search component
              onChange: (state, handlers) =>
                  // Render the faceted search component
                  ReactDOM.render(
                      <SolrFacetedSearch 
                          {...state}
                          {...handlers}
                          bootstrapCss={true}
                          onSelectDoc={(doc) => console.log(doc)}
                      />
                      ,
                      document.getElementById("solrDiv")
                  )
          }).initialize(); // this will send an initial search, fetching all results from solr
        //});
        }    
}


  
  export default AdvancedSearch;