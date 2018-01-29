const test = require('blue-tape');
const sinon = require('sinon');
const controller = require(`${__dirname}/../../app/controllers/searchForm.controller`);

const parentMock = () => ({
  updateResults: sinon.spy(),
  showError: sinon.spy()
})

test('should update parent results', function(t) {
  const scope = { $parent: parentMock() };
  const serviceMock = {
    search: () => Promise.resolve()
  }

  const _controller = new controller(scope, serviceMock);

  return _controller.searchClick().then(() => {
    t.ok(scope.$parent.updateResults.calledOnce)
  })
});

test('should update parent results', function(t) {
  const scope = { $parent: parentMock() };
  const serviceMock = {
    search: () => Promise.reject()
  }

  const _controller = new controller(scope, serviceMock);

  return _controller.searchClick().then(() => {
    t.ok(scope.$parent.showError.calledOnce)
  })
});
