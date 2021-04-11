import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAlert } from 'react-alert';

const Feed = (props) => {
    const [feedItems, setFeedItems] = useState([]);
    const [isMoreFeed, setIsMoreFeed] = useState(true);
    const alert = useAlert();

    const FeedItem = p => <div>{props.feedItem(p)}</div>;
    const countOfItemsToLoad = props.countOfItemsToLoad || 10; // default 10

    const loadMore = async () => {
        try {
            let data = await props.loadMore(feedItems.length, countOfItemsToLoad);
            if (data) {
                setFeedItems(feedItems.concat(data));
            } else {
                setIsMoreFeed(false);
            }
        } catch (e) {
            alert.show('Unable to load feed');
            setIsMoreFeed(false);
        }
    };
    
    // works as a constructor
    useEffect(async () => {
        loadMore();
    }, []);
    let i = 0;
    return (
        <InfiniteScroll
        dataLength={feedItems.length}
        next={loadMore}
        hasMore={isMoreFeed}
        loader={<center><h5><Spinner color = 'success' /></h5></center>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
    >
        { feedItems.map(element => (
            <div key = {i++}>
                <FeedItem data = {element} />
                <br />
            </div>
        ))}
    </InfiniteScroll>
    );
};

export default Feed;