import React from 'react';
import Feed from '../../basic/Feed.js';
import BookFeedItem from './BookFeedItem.js';
import { AdminAgent } from '../../../agent.js';

const BookFeed = () => {
    const loadMore = async (itemCount, countOfItemsToLoad) => {
        let res = await AdminAgent.getBooks({offset: itemCount, count: countOfItemsToLoad});
        if (res.data.length) {
            return res.data;
        } else {
            return 0;
        }
    };
    return (
        <Feed feedItem = {BookFeedItem} loadMore = {loadMore} countOfItemsToLoad = {10}/>
    );
};

export default BookFeed;