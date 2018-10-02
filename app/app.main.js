var app = require('./app.module');

var Repository = require('./factories/repository.factory');
var Comment = require('./factories/comment.factory');

var RepositoryService = require('./services/repository.service');
var CommentsService = require('./services/comments.service');

var SearchFormController = require('./controllers/searchForm.controller');
var SearchResultsController = require('./controllers/searchResults.controller');
var ResultItemController = require('./controllers/resultItem.controller');
var CommentsSectionController = require('./controllers/commentsSection.controller');
var CommentController = require('./controllers/commentsSection.controller');

var MainController = require('./controllers/main.controller');

var styles = require('./styles/main.scss');
var views = [
    require('./views/comment.html'),
    require('./views/commentsSection.html'),
    require('./views/main.html'),
    require('./views/resultItem.html'),
    require('./views/searchForm.html'),
    require('./views/searchResults.html')
]

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './views/main.html',
            controller: ['$scope', MainController]
        })
        .otherwise('/');
}]);

app.service('Repository', [Repository]);
app.service('Comment', [Comment]);
app.service('RepositoryService', ['$http', 'Repository', RepositoryService]);
app.service('CommentsService', ['$http', 'Comment', CommentsService]);

app.component('searchForm', {
    templateUrl: './views/searchForm.html',
    controller: ['$scope', 'RepositoryService', SearchFormController]
});

app.component('searchResults', {
    templateUrl: './views/searchResults.html',
    controller: ['$scope', 'CommentsService', SearchResultsController],
    bindings: {
        results: '<'
    }
});

app.component('resultItem', {
    templateUrl: './views/resultItem.html',
    controller: [ResultItemController],
    bindings: {
        repository: '<'
    }
});

app.component('commentsSection', {
    templateUrl: './views/commentsSection.html',
    controller: [CommentsSectionController],
    bindings: {
        repository: '<',
        comments: '<'
    }
});

app.component('comment', {
    templateUrl: './views/comment.html',
    controller: CommentController,
    bindings: {
        comment: '<'
    }
});
