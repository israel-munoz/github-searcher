function RepositoryService($http, Repository) {

    function search(query) {
        return new Promise(function (resolve, reject) {
            if (!query) {
                throw new Error('Missing search query!');
            }

            $http
                .get(`https://api.github.com/search/repositories?q=${query}`)
                .then(function (result) {
                    resolve(result.data.items.map(function (item) {
                        return Repository.create(item);
                    }));
                }).catch(function (err) {
                    reject(
                        'Could not retrieve repositories. '
                        + (err.description || err.statusText));
                });
        });
    }

    return {
        search: search
    }
}

module.exports = RepositoryService;