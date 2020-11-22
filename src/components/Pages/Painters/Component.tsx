import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Unsplash, { toJson } from 'unsplash-js';

import './painters.scss';

import { Radio } from 'antd';
import { Avatar, Image } from 'antd';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import { Tabs } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Types } from './reducer';

import mok from './mok.json';
import { IGlobalState } from 'reducers';

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
const fetchPainters = ({ color }) => (dispatch) => {
    unsplash.search.photos("*", 1, 30, { color })
        .then(toJson)
        .then(res => dispatch(done(res)));
}

const colorTags = ['black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']

interface IProps {
    data: Array<any>
}
const Main = (props: IProps & IWithDispatched) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [color, setColor] = useState<string>('');
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }
    const handleColorChange = (e) => {
        setColor(e.target.value);
    }
    const updatePainters = () => {
        props.dispatch(fetchPainters({
            color
        }));
    }
    useEffect(updatePainters, []);

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
                        <Radio.Group value={color} onChange={handleColorChange}>
                            {colorTags.map(tag => (
                                <Radio.Button style={{ color: tag, borderColor: tag, margin: '0 5px', boxShadow: '2px 1px 8px black' }}  value={tag}>{tag}</Radio.Button>
                            ))}
                        </Radio.Group>
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
                            <img src={item.urls.small} width="140" height="140" />
                        </div>
                        <div className="painters-info">
                            <div className="painters-info_person">
                                <Avatar
                                    style={{ marginRight: '5px' }}
                                    src={<Image src={item.user.profile_image.small} />}
                                />
                                <Link to={`/painter/${item.user.username}`}>{item.user.name}</Link>
                            </div>
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

export default connect((state: IGlobalState) => ({
    ...state.painters
}))(Main);