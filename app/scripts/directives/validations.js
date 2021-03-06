'use strict';
/**
 * directive to check that value is alpha numeric or not
 */
myApp.directive('checkname', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.checkname = function(modelValue, viewValue) {

				if (/^[a-z0-9]+$/i.test(viewValue)) {
					// it is valid
					return true;
				}
				// it is invalid
				return false;
			};
		}
	};
});
/**
 * Directive to check the value is numeric.
 * It also checks that is selling price is greater then product cost
 */
myApp.directive('checkprice', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.checkprice = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					// consider empty models to be valid
					return true;
				}

				if (!isNaN(parseFloat(viewValue)) && isFinite(viewValue)) {
					// it is valid
					return true;
				}
				if(viewValue < attrs.checkprice){
					ctrl.$setValidity('costIsLess', false);
					return false;
				}
				// it is invalid
				return false;
			};
			var validate = function(viewValue) {
				var comparisonModel = attrs.checkprice;
				if(!comparisonModel || !viewValue){
					// It's valid because we have nothing to compare against
					ctrl.$setValidity('costIsLess', true);

				}else {
					// It's valid if model is lower than the model we're comparing against
					ctrl.$setValidity('costIsLess', parseInt(viewValue, 10) > parseInt(comparisonModel, 10) );
					return viewValue;
				}
			};

			ctrl.$parsers.unshift(validate);

			attrs.$observe('checkprice', function(comparisonModel){
				return validate(ctrl.$viewValue);
			});
		}
	};
});
