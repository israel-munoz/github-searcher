function MainController($scope) {
    var ctrl = this;
    $scope.results = [];
    $scope.currentRepository;
    $scope.comments;

    $scope.updateResults = function (data) {
        $scope.results = data;
        $scope.currentRepository = null;
        $scope.comments = null;
        $scope.$apply();
    };

    $scope.showComments = function (repository, data) {
        $scope.currentRepository = repository;
        $scope.comments = data;
        $scope.$apply();
    }

    $scope.showError = function (message) {
        $scope.error = message;
        $scope.errorVisible = true;
        $scope.$apply();
        window.setTimeout(function () {
            $scope.errorVisible = false;
            $scope.$apply();
        }, 3000);
    }
}

module.exports = MainController;