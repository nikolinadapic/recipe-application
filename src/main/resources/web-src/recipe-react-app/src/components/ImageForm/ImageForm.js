import React, { Component } from 'react';
import classes from './ImageForm.module.css';

class ImageForm extends Component {
    state = {
        loading: false,
        image: []
    };

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            image: event.target.files[0]
        });
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        fetch('http://localhost:8080/recipe/' + this.props.match.params.id + '/image', {
            method: 'post',
            body: formData
        }).then(res => {
            if(res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
      }

    render() {
        return (
            <React.Fragment>
                <h3 className={classes.Title}>Add an image to your recipe.</h3>
                <input className={classes.ImageForm} type='file' onChange={this.onChange} />
            </React.Fragment>
        );
    }
}

export default ImageForm;