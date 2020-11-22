import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Unsplash, { toJson } from 'unsplash-js';

import './painters.scss';

import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import { Tabs } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Types } from './reducer';

import mok from './mok.json';

const { CheckableTag } = Tag;
const tagsData = ['Terassit', 'Katot', 'Puujulkisivut', 'Tasoitustyöt', 'Efektimaalaus', 'Sisämaalaukset', 'Lattiat', 'Kivijulkisivut ja sokkelit', 'Ovet ikkunat ja kalusteet'];
const { TabPane } = Tabs;
const { Search } = Input;

function callback(key: string) {
    console.log(key);
}

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = (value: string) => console.log(value);

export interface IWithDispatched {
    // tslint:disable-next-line:no-any
    dispatch: (...args: any[]) => void;
}

const done = (data) => ({
    type: Types.FETCH_PAINTERS,
    data
})

const UNSPLASH_ACCESS_KEY = 'Yf46BuMEQjA-V2zGrYEXuDdizetbzPuqBeV788K2_Nk';
const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });
const fetchPainters = () => (dispatch) => {
    unsplash.photos.listPhotos(1, 30, "latest")
        .then(toJson)
        .then(res => dispatch(done(res)));
}

interface IProps {
    data: Array<any>
}
const Main = (props: IProps & IWithDispatched) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }
    useEffect(() => { props.dispatch(fetchPainters()); }, []);

    return (
        <main>
            <section>
                <section className="container">
                    <Row>
                        <Col span={4}>
                            <p className="font-bold">Hae</p>
                        </Col>
                        <Col span={12}>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                        </Col>
                        <Col span={8}>
                            <p className="font-bold">LAJITTELUPERUSTE</p>
                            <Tabs className="test-class" defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Työnäytteet" key="1" />
                                <TabPane tab="Nimi" key="2" />
                                <TabPane tab="Palaute" key="3" />
                            </Tabs>
                        </Col>
                    </Row>
                </section>
                <section className="container">
                    <Row>
                        <p className="font-bold" >VALITSE MAALAUSTYÖ</p>
                    </Row>
                    <Row>
                        {tagsData.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => handleChange(tag, checked)}
                                className="search-tag"
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </Row>
                </section>
                <Divider />
                <section className="container font-normal" style={{ textAlign: 'center' }}>
                    <p className="font-normal">Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
                </section>
            </section>
            <section className="container">
                {mok.map((item, i) => (
                    <div key={i} className="painters-item">
                        <div className="painters-avatar-container">
                            <img src={item.urls.small} width="140" height="140"/>
                        </div>
                        <div className="painters-info">
                            <p>{item.user.name}</p>
                            <img className="painters-info_icon" src={item.user.profile_image.small}/>
                            <p>{item.user.bio}</p>
                            <p>{item.alt_description}</p>
                        </div>
                        <div className="painters-action"><button className="painters-action_btn">Action</button></div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default React.memo(connect(state => ({
    ...state.painters
}))(Main));