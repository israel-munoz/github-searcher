function Comment() {
    function create(src) {
        let comment = {};
        src = src || {};
        comment.id = src.id;
        comment.text = src.body || '';
        comment.date = new Date(Date.parse(src.updated_at || src.created_at)).format();
        comment.url = src.html_url || '';
        comment.user = src.user.login;

        return comment;
    }

    return {
        create: create
    };
}

module.exports = Comment;