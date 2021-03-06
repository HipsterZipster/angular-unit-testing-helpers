function someDirective() {
  var directive = {
    restrict: 'E',
    replace: true,
    template: '<div> {{ text | capitalize }}</div>'
  };
  return directive;
}

function capitalize() {
  var directive = {
    restrict: 'EA',
    replace: true,
    template: '<div></div>'
  };
  return directive;
}

angular
.module('AnotherModule4', [])
.directive('capitalize', anotherElement);

angular
.module('filterWithoutDummy', ['AnotherModule4'])
.directive('someDirective', someDirective);



describe('someDirective', function() {
  var
    element, $compile, $rootScope, $scope;

  beforeEach(module('filterWithoutDummy', {
    capitalizeFilter: function() {
      return function(input) {
        return input;
      };
    }
  }));

  beforeEach(function() {
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope;
      element = angular.element('<some-directive></some-directive>');
      $compile(element)($scope);
      angular.element(document.body).append(element);
      $scope.$apply();
    });
  });

  it('should not be null', function() {
    expect(element).toBeTruthy();
  });
});

