import React from 'react';
import Feed from '../../basic/Feed.js';
import ReviewFeedItem from './ReviewFeedItem';
import { ReviewAgent } from '../../../agent.js';

const ReviewFeed = (props) => {
    const loadMore = async (itemCount, countOfItemsToLoad) => {
        let res = await ReviewAgent.getReviews({offset: itemCount, count: countOfItemsToLoad, b_id: props.b_id});
        if (res.data.length) {
            return res.data;
        } else {
            return 0;
        }
    };
    return (
        <Feed feedItem = {ReviewFeedItem} loadMore = {loadMore} countOfItemsToLoad = {5}/>
    );
};

export default ReviewFeed;
