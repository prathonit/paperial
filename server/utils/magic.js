const reqlib = require('app-root-path').require;
const bookController = reqlib('./controllers/book.js');
const orderController = reqlib('./controllers/order.js');

let prepareOrderMap = (orders) => {
    let orderMap = {};
    orders.forEach(order => {
        orderMap[order.u_id] = [];
    });
    orders.forEach(order => {
        if (orderMap[order.u_id][orderMap[order.u_id].length - 1] !== order.b_id) {
            orderMap[order.u_id].push(order.b_id);
        }
    });
    return orderMap;
};

let prepareGenreMap = (orders, u_id, books) => {
    let genreMap = {};
    let userReads = orders[u_id] || [];
    userReads.forEach(b_id => {
        let genre = books[b_id].b_genre;
        genreMap[genre] = genreMap[genre] || 0;
        genreMap[genre]++;
    });
    for (key in genreMap) {
        genreMap[key] = (genreMap[key] / userReads.length) * 100;
    }
    return genreMap;
};

let findMatch = (list1, list2) => {
    let freq = {};
    list1.forEach(book => {
        freq[book] = freq[book] || 0;
        freq[book]++;
    });
    list2.forEach(book => {
        freq[book] = freq[book] || 0;
        freq[book]++;
    });
    let count = 0;
    let books = [];
    for (key in freq) {
        if (freq[key] >= 2) {
            count++;
        } else if (!list1.includes(parseInt(key))) {
            books.push(parseInt(key));
        }
    }
    return [(count / list1.length) * 100, books];
};

let main = async (u_id) => {
    let books = await bookController.book_get_book_ratings();
    let orders = await orderController.order_get_all_orders();
    let orderMap = prepareOrderMap(orders);
    let genreMap = prepareGenreMap(orderMap, u_id, books);
    
    let suggestions = {};
    for (let [user, userReads] of Object.entries(orderMap)) {
        if (user === u_id) {
            continue;
        }
        orderMap[u_id] = orderMap[u_id] || [];
        userReads = userReads || [];
        let result = findMatch(orderMap[u_id], userReads);
        let similarity = result[0];
        let suggestedBooks = result[1];
        suggestedBooks.forEach(b_id => {
            suggestions[b_id] = suggestions[b_id] || 0;
            suggestions[b_id] = (books[b_id].b_rating + genreMap[books[b_id].b_genre] + 1) * similarity;
        });
    }
    let suggestionsList = [];
    for (let [key, value] of Object.entries(suggestions)) {
        suggestionsList.push({b_id: parseInt(key), recommend: value});
    }
    suggestionsList = suggestionsList.sort((a, b) => {
        return b.recommend - a.recommend;
    });
    let finalSuggestions = [];
    for (let i=0; i<Math.min(10, suggestionsList.length); i++) {
        finalSuggestions.push(suggestionsList[i]['b_id']);
    }
    let bookResult = await bookController.book_fetch_from_list(finalSuggestions);
    return bookResult;
};

module.exports = main;