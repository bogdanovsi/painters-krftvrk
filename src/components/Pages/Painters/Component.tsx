import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Unsplash, { toJson } from 'unsplash-js';

import './painters.scss';

import { Empty } from 'antd';
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

const fetchPainters = ({ search, color, orientation, selectedTags }) => (dispatch) => {
    unsplash.search.photos(search, 1, 30, { color, orientation })
        .then(toJson)
        .then(res => {
            res.results && dispatch(done(res.results))
        });
}

const colorTags = ['black_and_white', 'black', 'white', 'yellow', '#ffa500', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']
export type Orientation = 'portrait' | 'landscape' | 'squareish';

interface IProps {
    data: Array<any>
}
const Main = (props: IProps & IWithDispatched) => {
    const [orientation, setOrientation] = useState<Orientation | string>('portrait');
    const [color, setColor] = useState<string>('');
    const [search, setSearch] = useState<string>('photos');
    const onSearch = (text: string) => {
        setSearch(text || 'photo');
    }

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }

    const handleColorChange = (e) => {
        setColor(e.target.value);
    }
    const updatePainters = () => {
        props.dispatch(fetchPainters({
            search,
            color,
            orientation,
            selectedTags
        }));
    }
    useEffect(updatePainters, [color, orientation, selectedTags, search]);

    return (
        <main>
            <section style={{ background: '#f7f7f7'}}>
                <section className="search-panel">
                    <div className="container">
                        <Row align={'middle'}>
                            <Col span={4}>
                                <p className="m0 tt-upper font-bold">Hae</p>
                            </Col>
                            <Col span={10}>
                                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                            </Col>
                            <Col span={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p className="m0 tt-upper font-bold" style={{ marginRight: '5px' }}>LAJITTELUPERUSTE</p>
                                <Tabs className="tab-list" defaultActiveKey={orientation} onChange={setOrientation}>
                                    <TabPane tab="portrait" key="portrait" />
                                    <TabPane tab="landscape" key="landscape" />
                                    <TabPane tab="squareish" key="squareish" />
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section className="section-block container">
                    <Row>
                        <p className="font-bold" >VALITSE MAALAUSTYÖ</p>
                    </Row>
                    <Row>
                        <Radio.Group value={color} onChange={handleColorChange}>
                            {colorTags.map(tag => (
                                <Radio.Button style={{ margin: '0 5px', boxShadow: `${tag} 0px 0px 6px 1px, black 0px 1px 4px 0px` }} value={tag}>{tag}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </Row>
                </section>
                {/* <section className="section-block container">
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
                </section> */}
                <Divider />
                <section className="container font-normal" style={{ textAlign: 'center' }}>
                    <p className="font-normal">Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
                </section>
            </section>
            <section className="section-block container">
                {props.data.length > 0 ? props.data.map((item, i) => (
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
                )) : <Empty />}
            </section>
        </main>
    );
}

export default connect((state: IGlobalState) => ({
    ...state.painters
}))(Main);