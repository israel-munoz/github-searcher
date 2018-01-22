function CommentsService($http, Comment) {
    function get(repository) {
        return new Promise(function (resolve, reject) {
            if (!repository || !repository.owner || !repository.name) {
                throw new Error('Missing repository data!');
            }
            $http.get(`https://api.github.com/repos/${repository.owner}/${repository.name}/comments`)
                .then(function (response) {
                    var data = response.data.map(Comment.create);
                    resolve(data);
                }).catch(function (err) {
                    reject(
                        'Could not retrieve repository comments. '
                        + (err.description || err.statusText));
                });
        });
    }

    function sort(comments) {
        comments.sort((a, b) =>
            a.date < b.date);
    }

    return {
        get: get,
        sort: sort
    };
}

module.exports = CommentsService;