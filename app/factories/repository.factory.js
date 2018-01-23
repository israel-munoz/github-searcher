function Repository() {
    function create(src) {
        let rep = {};
        src = src || {};
        rep.id = src.id || 0;
        rep.name = src.name || '';
        rep.fullName = src.full_name || '';
        rep.owner = (src.owner || {}).login || '';
        rep.description = src.description || '';
        rep.url = src.html_url || '';
        rep.commentsUrl = src.comments_url || '';
        rep.avatar = (src.owner || {}).avatar_url || '';

        return rep;
    }

    return {
        create: create
    };
}

module.exports = Repository;