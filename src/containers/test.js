import React from 'react';
import Upload from 'rc-upload';


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.uploaderProps = {
            action: '/user/sendimg',
            // data: {a: 1, b: 2},
            headers: {
                // Authorization: 'xxxxxxx',
            },
            multiple: false,
            beforeUpload(file) {
                console.log('beforeUpload', file.name);
            },
            onStart: (file) => {
                console.log('onStart', file.name);
                // this.refs.inner.abort(file);
            },
            onSuccess(file) {
                console.log('onSuccess', file);
            },
            onProgress(step, file) {
                console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError(err) {
                console.log('onError', err);
            },
        };
        this.state = {
            destroyed: false,
        };
    }

    destroy = () => {
        this.setState({
            destroyed: true,
        });
    };

    render() {
        if (this.state.destroyed) {
            return null;
        }
        return (<div
            style={{
                margin: 100,
            }}
        >

            <div>
                <Upload {...this.uploaderProps} ref="inner"><a>开始上传</a></Upload>
            </div>


            <button onClick={this.destroy}>destroy</button>
        </div>);
    }
}

export default Test;
