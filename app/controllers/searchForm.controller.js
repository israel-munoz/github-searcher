function SearchFormController($scope, RepositoryService) {
    var ctrl = this;

    this.searchClick = function () {
        let parent = $scope.$parent;
        RepositoryService.search(ctrl.searchField)
            .then(function (data) {
                parent.updateResults(data);
            }).catch(function (err) {
                parent.showError(err);
            });
    }
}

module.exports = SearchFormController;