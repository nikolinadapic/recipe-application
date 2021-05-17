import React, { Component } from 'react';
import classes from './ImageForm.module.css';
import Spinner from '../UI/Spinner/Spinner';

class ImageForm extends Component {
    state = {
        loading: false,
        image: []
    };

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            image: event.target.files[0],
            loading: true
        });
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        fetch('http://localhost:8080/recipe/' + this.props.match.params.id + '/image', {
            method: 'post',
            body: formData
        }).then(res => {
            this.setState({ loading: false });
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
                {this.state.loading ? <Spinner /> : <input className={classes.ImageForm} type='file' onChange={this.onChange} />}
            </React.Fragment>
        );
    }
}

export default ImageForm;