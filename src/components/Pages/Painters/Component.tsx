import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';

import './painters.scss';

import { Empty, Spin } from 'antd';
import { Radio } from 'antd';
import { Link } from 'react-router-dom';
import { Avatar, Image } from 'antd';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import { Tabs } from 'antd';
import { Tag } from 'antd';

import mok from './mok.json';
import { IGlobalState } from 'reducers';
import { fetchPainters } from './api';
import { IPaintersState } from './reducer';
import { choosePainterState, clearPhotos } from './actions';

import PhotoItem from '@components/PhotoItem';

const { CheckableTag } = Tag;
const tagsData = ['Terassit', 'Katot', 'Puujulkisivut', 'Tasoitustyöt', 'Efektimaalaus', 'Sisämaalaukset', 'Lattiat', 'Kivijulkisivut ja sokkelit', 'Ovet ikkunat ja kalusteet'];
const { TabPane } = Tabs;
const { Search } = Input;

export interface IWithDispatched {
    // tslint:disable-next-line:no-any
    dispatch: (...args: any[]) => void;
}
const colorTags = ['black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']
export type Orientation = 'portrait' | 'landscape' | 'squareish';

interface IProps extends IPaintersState { }
const Main = (props: IProps & IWithDispatched) => {
    const [orientation, setOrientation] = useState<Orientation | string>('portrait');
    const [color, setColor] = useState<string>('');
    const [search, setSearch] = useState<string>('photos');
    const [page, setPage] = useState<number>(1);
    const onSearch = (text: string) => {
        setSearch(text || 'photo');
    }

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }

    const handleColorChange = (e) => { setColor(e.target.value); }
    useEffect(() => {
        props.dispatch(clearPhotos());
        setPage(1);
        props.dispatch(fetchPainters({
            search,
            color,
            orientation
        }, 1));
    }, [color, orientation, search])

    // useEffect(() => {
    //     props.dispatch(fetchPainters({
    //         search,
    //         color,
    //         orientation
    //     }, page));
    // }, [page]);

    const observer = useRef<IntersectionObserver>()
    const lastBookElementRef = useCallback(node => {
        if (props.isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && (props.total_page - page) !== 0) {
                setPage(prevPage => ++prevPage)
            }
        })
        if (node) observer.current.observe(node)
    }, [props.isLoading])

    return (
        <main>
            <section style={{ background: '#f7f7f7' }}>
                <section className="search-panel">
                    <div className="container">
                        <Row wrap={true} align={'middle'}>
                            <Col span={4}>
                                <p className="m0 tt-upper font-bold">Hae</p>
                            </Col>
                            <Col span={10}>
                                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                            </Col>
                            <Col span={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p className="m0 tt-upper font-bold" style={{ marginRight: '5px', padding: '12px 0' }}>LAJITTELUPERUSTE</p>
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
                                <Radio.Button key={tag} style={{ margin: '0 5px', marginBottom: '10px', boxShadow: `${tag} 0px 0px 6px 1px, black 0px 1px 4px 0px` }} value={tag}>{tag}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </Row>
                </section>
                <Divider />
                <section className="container font-normal" style={{ textAlign: 'center' }}>
                    <p className="font-normal">Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
                </section>
            </section>
            <section className="section-block container">
                {props.photos && props.photos.length > 0 ? props.photos.map((photo, i, data) => (
                    <div key={photo.id} ref={node => { ++i === data.length && lastBookElementRef(node) }} className="painters-item">
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
                        <div className="painters-action"><button onClick={(ev) => {
                            props.dispatch(choosePainterState(photo))
                        }} className={`painters-action_btn  ${props.choosePhotosId.indexOf(photo.id) !== -1 ? 'painters-action_btn__choosed' : '' }`}>Action</button></div>
                    </div>
                )) : (!props.isLoading && <Empty />)}
                {props.isLoading && <Spin size="large" style={{ width: '100%' }} />}
            </section>
        </main>
    );
}

export default connect((state: IGlobalState) => ({
    ...state.painters
}))(Main);