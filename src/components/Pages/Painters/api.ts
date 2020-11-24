import Unsplash, { toJson } from 'unsplash-js';
import { done, isError, isLoading } from './actions';

const UNSPLASH_ACCESS_KEY = 'Yf46BuMEQjA-V2zGrYEXuDdizetbzPuqBeV788K2_Nk';
const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });

export const fetchPainters = ({ search, color, orientation }, page = 1) => (dispatch) => {
    dispatch(isLoading(true));
    unsplash.search.photos(search, page, 30, { color, orientation }).then(toJson)
        .then(res => dispatch(done({ photos: res.results, page, total_page: res.total_pages })))
        .catch(err => dispatch(isError(err)));
} 