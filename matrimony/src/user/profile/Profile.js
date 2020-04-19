import React, { Component, useState,useEffect,useCallback } from 'react';
import './Profile.css';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';
function MyDropzone({id}) {
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      console.log(file);
      const formdata = new FormData();
      formdata.append("file",file);
      axios.post(`http://localhost:8090/api/user/${id}/image/upload`,
      formdata,
      {
          headers: {
              "Content-Type" : "multipart/form-data",
              "Authorization" : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          }
      })
      .then(()=>{
                console.log("File uploaded successfully");
            }
        ).catch(err=>{
            console.log(err);
        });
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop file here, or click to select file</p>
        }
      </div>
    )
  }


class Profile extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        console.log("currentUser"+this.props);
        this.state = {
            data : ''
        }
    }
    
    getData(){        
        axios.get(`http://localhost:8090/api/user/${this.props.currentUser.id}/image/download`,{
                 responseType:"blob",
                 headers: {
                    "Authorization" : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }).then(res=>
                {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(res.data); 
                    reader.onload = function() {
                        var imageElement = document.getElementById("profileImg");
                        var imageDataUrl = reader.result;
                        imageElement.setAttribute("src", imageDataUrl);
                    }
                });
          console.log('Our data is fetched');
      }
    
      componentDidMount(){
        this.getData();
        
      }
    

    render() {
        return (
            <div className="profile-container"><br></br>
                <div className="container">
                    <div className="profile-info">
                        <MyDropzone {...this.props.currentUser}/>
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    //<img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                    <img id="profileImg" src={this.state.data} alt={"image not found"} />
                                ) : (
                                    <div className="text-avatar">
                                        {/* <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span> */}
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                        
                    </div>
                </div>    
            </div>
        );
    }
}

export default Profile;