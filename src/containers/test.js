import React from 'react';
// import Upload from 'material-ui-upload/Upload';
import Button from 'material-ui/Button';

const foo = {
    border: '1px solid red'
};

class Test extends React.Component {

    // onFileLoad = (e, file) => console.log(e.target.result, file.name);

    handleFileChange = event => {
        console.log(event.target.files[0]);
    };

    render() {
        return (
            <div>
                <input
                    accept="image/*"
                    id="raised-button-file"
                    type="file"
                    value=''
                    className={foo}
                    onChange={this.handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        Upload
                    </Button>
                </label>
            </div>
        );
    }
}

export default Test;
