describe('$materialToast service', function() {
  beforeEach(module('material.components.toast', 'ngAnimateMock', function($provide) {
  }));

  function setup(options) {
    var hideToast;
    inject(function($materialToast, $rootScope, $animate) {
      options = options || {};
      $materialToast(options).then(function(fn) {
        hideToast = fn;
      });
      $rootScope.$apply();
      $animate.triggerCallbacks();
    });
    return hideToast;
  }

  describe('options', function() {

    it('should hide after duration', inject(function($timeout, $animate, $rootElement) {
      var parent = angular.element('<div>');
      setup({
        template: '<material-toast>',
        duration: 1234
      });
      expect($rootElement.find('material-toast').length).toBe(1);
      $timeout.flush();
      expect($rootElement.find('material-toast').length).toBe(0);
    }));

    it('should have template', inject(function($timeout, $rootScope, $rootElement) {
      var parent = angular.element('<div>');
      setup({
        template: '<material-toast>{{1}}234</material-toast>',
        appendTo: parent
      });
      var toast = $rootElement.find('material-toast');
      $timeout.flush();
      expect(toast.text()).toBe('1234');
    }));

    it('should have templateUrl', inject(function($timeout, $rootScope, $templateCache, $rootElement) {
      $templateCache.put('template.html', '<material-toast>hello, {{1}}</material-toast>');
      setup({
        templateUrl: 'template.html',
      });
      var toast = $rootElement.find('material-toast');
      expect(toast.text()).toBe('hello, 1');
    }));
  });

  describe('lifecycle', function() {

    it('should hide current toast when showing new one', inject(function($rootElement) {
      setup({
        template: '<material-toast class="one">'
      });
      expect($rootElement[0].querySelector('material-toast.one')).toBeTruthy();
      expect($rootElement[0].querySelector('material-toast.two')).toBeFalsy();
      expect($rootElement[0].querySelector('material-toast.three')).toBeFalsy();

      setup({
        template: '<material-toast class="two">'
      });
      expect($rootElement[0].querySelector('material-toast.one')).toBeFalsy();
      expect($rootElement[0].querySelector('material-toast.two')).toBeTruthy();
      expect($rootElement[0].querySelector('material-toast.three')).toBeFalsy();

      setup({
        template: '<material-toast class="three">'
      });
      expect($rootElement[0].querySelector('material-toast.one')).toBeFalsy();
      expect($rootElement[0].querySelector('material-toast.two')).toBeFalsy();
      expect($rootElement[0].querySelector('material-toast.three')).toBeTruthy();
    }));
  });
});
