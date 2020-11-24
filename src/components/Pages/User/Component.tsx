import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Card } from 'antd';
import { Avatar, Image } from 'antd';
import { Row, Col } from 'antd';

import { unsplash, toJson } from '@utils/configureUnsplash';

const UserComponent = ({ match, ...props }) => {
    const {
        params: { painterName }
    } = match;
    const [photos, setPhotos] = useState<Array<any>>([]);
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        unsplash.users.profile(painterName).then(toJson).then(setUser);
        unsplash.users.photos(painterName, 1, 20, "latest").then(toJson).then(setPhotos);
    }, []);

    return (
        <section className="container">
            {user && <div className="painters-item">
                <div className="painters-info">
                    <div className="painters-info_person">
                        <Image src={user.profile_image.small} style={{ marginRight: '5px' }} />
                        <p>{user.name}</p>
                    </div>
                    {user.bio && user.bio != '' && <p>{user.bio}</p>}
                </div>
            </div>}
            {photos && <section>
                <h3>User photos</h3>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={photos}
                    renderItem={photo => (
                        <List.Item>
                            <Image src={photo.urls.small} />
                        </List.Item>
                    )}
                />
            </section>}
        </section>
    );
}

export default UserComponent;