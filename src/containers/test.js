import React from 'react';
import Upload from 'rc-upload';
import * as qiniu from 'qiniu-js'
import {getUploadToken} from 'api/user';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.uploaderProps = {
            // action: '/user/sendimg',
            // data: {a: 1, b: 2},
            // headers: {
            // Authorization: 'xxxxxxx',
            // },
            customRequest({action, file, onSuccess, onError, onProgress}) {

                //
                // beforeUpload(file) {
                //     console.log('beforeUpload', file.name);
                // },
                // onStart: (file) => {
                //     console.log('onStart', file.name);
                //     console.log(file);
                var config = {
                    useCdnDomain: true,
                    region: qiniu.region.z0
                };

                var putExtra = {};
                var observable = qiniu.upload(file, '1', '427X8jzc9TcUsSfs2utJLwYkIKBXKyGaXpR6u4WW:esl1X23O5rjFAUoU9h3klR2Oiao=:eyJzY29wZSI6ImNoYXRyb29tIiwiZGVhZGxpbmUiOjE1MjU0NTAwNTF9', putExtra, config);

                var observer = {
                    next(res) {
                        console.log(1);
                        console.log(res);
                    },
                    error(err) {
                        console.log(2);
                        console.log(err);
                    },
                    complete(res) {
                        console.log(3);
                        console.log(res);
                    }
                }

                var subscription = observable.subscribe(observer);// 上传开始
                // },
                // onSuccess(file) {
                //     console.log('onSuccess', file);
                // },
                // onProgress(step, file) {
                //     console.log('onProgress', Math.round(step.percent), file.name);
                // },
                // onError(err) {
                //     console.log('onError', err);
                // },
            },
            // multiple: false,
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
