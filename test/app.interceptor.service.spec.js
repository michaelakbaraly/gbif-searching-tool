describe("Interceptor: AppHttpInterceptor", function () {
  beforeEach(module("gbif-tool"));
  var rootScope, AppHttpInterceptor;

  beforeEach(inject(function ($rootScope, _AppHttpInterceptor_) {
    rootScope = $rootScope.$new();
    AppHttpInterceptor = _AppHttpInterceptor_;
  }));
  describe("the request method", function () {
    it("should set the spinner to true", function () {
      AppHttpInterceptor.request();
      expect(rootScope.spinner).toBe(true);
    });
  });
  describe("the request method", function () {
    it("should set the spinner to true", function () {
      AppHttpInterceptor.response();
      expect(rootScope.spinner).toBe(false);
    });
  });
  describe("the request method", function () {
    it("should set the spinner to true", function () {
      AppHttpInterceptor.responseError();
      expect(rootScope.spinner).toBe(false);
    });
  });
});
