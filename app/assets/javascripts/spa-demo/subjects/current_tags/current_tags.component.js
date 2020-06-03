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

  CurrentTagsController.$inject = [
    "$scope",
    "$stateParams",
    "spa-demo.subjects.currentSubjects",
    "spa-demo.subjects.Tag",
    "spa-demo.subjects.TagThing",
  ];
  function CurrentTagsController($scope, $stateParams, currentSubjects, Tag, TagThing) {
    var vm=this;
    vm.tagClicked = tagClicked;
    vm.currentTagId = -1;
    vm.isCurrentTag = isCurrentTag;

    vm.$onInit = function() {
      console.log("CurrentTagsController",$scope);
      var result = Tag.query();
      result.$promise.then(
        function(tags) {
          vm.tags = tags;
        }
      );
      // console.log(vm.tags);
    }
    return;
    //////////////
    function isCurrentTag(tag_id) {
      return tag_id==vm.currentTagIdx;
    }
    function tagClicked(tag_id) {
      vm.currentTagId = tag_id;
      var result = TagThing.query({tag_id:tag_id});
      result.$promise.then(
        function(things) {
          var selectedThings = [];
          for (var i = 0; i < things.length; i++) {
            selectedThings.push(things[i].thing_id);
          }
          currentSubjects.showOnlyThings(selectedThings);
        }
      );
    }
  }
})();
