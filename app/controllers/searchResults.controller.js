function SearchResultsController($scope, CommentsService) {
    var ctrl = this;

    ctrl.showComments = function (repository) {
        CommentsService.get(repository)
            .then(function (data) {
                CommentsService.sort(data);
                $scope.$parent.showComments(repository, data);
            });
    }
}

module.exports = SearchResultsController;