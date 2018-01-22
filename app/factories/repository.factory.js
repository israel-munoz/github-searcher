function Repository($log) {
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

        return rep;
    }

    function DoSomething() {
        $log.info('aaa');
    }

    return {
        create: create
    };
}

module.exports = Repository;