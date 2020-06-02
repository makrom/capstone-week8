(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdCurrentTags", {
      templateUrl: tagsTemplateUrl,
      controller: CurrentTagsController,
    })
    ;

  tagsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function tagsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_tags_html;
  }    

  CurrentTagsController.$inject = ["$scope",
                                     "spa-demo.subjects.currentSubjects"];
  function CurrentTagsController($scope, currentSubjects) {
    var vm=this;
    vm.tagClicked = tagClicked;
    vm.isCurrentTag = currentSubjects.isCurrentTagIndex;

    vm.$onInit = function() {
      console.log("CurrentTagsController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentSubjects.getTags(); },
        function(tags) { vm.tags = tags; }
      );
    }
    return;
    //////////////
    function tagClicked(index) {
      currentSubjects.setCurrentTag(index);
    }
  }
})();
