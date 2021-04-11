import React from 'react';
import Feed from '../../basic/Feed.js';
import OrderFeedItem from './OrderFeedItem.js';
import { AdminAgent } from '../../../agent.js';

const OrderFeed = () => {
    const loadMore = async (itemCount, countOfItemsToLoad) => {
        let res = await AdminAgent.getOrders({offset: itemCount, count: countOfItemsToLoad});
        if (res.data.length) {
            return res.data;
        } else {
            return 0;
        }
    };
    return (
        <Feed feedItem = {OrderFeedItem} loadMore = {loadMore} countOfItemsToLoad = {10}/>
    );
};

export default OrderFeed;