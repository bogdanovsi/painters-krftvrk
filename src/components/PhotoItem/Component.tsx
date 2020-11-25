import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Avatar, Image } from 'antd';
import { IGlobalState } from 'reducers';
import { choosePainterState } from '@components/Pages/Painters/actions';
import { IWithDispatched } from '@components/Pages/Painters/Component';

interface IProps {
    photo: any;
    refCb: ((node: any) => void) | null;
}

const mapPropsToState = (state: IGlobalState) => ({
    ...state.painters
})

const PhotoItem = ({photo, refCb, ...props}: IProps & IWithDispatched) => {
    const onActionClick = (ev) => {
        props.dispatch(choosePainterState(photo))
    }

    return (
        <div ref={node => { refCb != null && refCb(node); }} className="painters-item">
            <div className="painters-avatar-container">
                <img src={photo.urls.small} width="140" height="140" />
            </div>
            <div className="painters-info">
                <div className="painters-info_person">
                    <Avatar
                        style={{ marginRight: '5px' }}
                        src={<Image src={photo.user.profile_image.small} />}
                    />
                    <Link to={`/painter/${photo.user.username}`}>{photo.user.name}</Link>
                </div>
                <p>{photo.user.bio}</p>
                <p>{photo.alt_description}</p>
            </div>
            <div className="painters-action"><button onClick={onActionClick} className="painters-action_btn">Action</button></div>
        </div>
    );
}

export default connect(mapPropsToState)(PhotoItem);