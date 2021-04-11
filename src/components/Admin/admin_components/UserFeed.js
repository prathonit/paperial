import React from 'react';
import Feed from '../../basic/Feed.js';
import UserFeedItem from './UserFeedItem.js';
import { AdminAgent } from '../../../agent.js';

const UserFeed = () => {
    const loadMore = async (itemCount, countOfItemsToLoad) => {
        let res = await AdminAgent.getUsers({offset: itemCount, count: countOfItemsToLoad});
        if (res.data.length) {
            return res.data;
        } else {
            return 0;
        }
    };
    return (
        <Feed feedItem = {UserFeedItem} loadMore = {loadMore} countOfItemsToLoad = {10}/>
    );
};

export default UserFeed;