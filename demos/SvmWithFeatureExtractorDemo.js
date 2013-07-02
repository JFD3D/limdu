/**
 * Demonstrates using an SVM (from the svmjs package) wrapped with a feature extractor and a feature lookup table.
 * 
 * @author Erel Segal-Halevi
 * @since 2013-06
 */

var FeatureExtractor = require('../FeatureExtractor');
var EnhancedClassifier = require('../EnhancedClassifier');
var SVM = require('../svmjs').SVM;

var serialize = require('../serialize');

console.log("SVM with feature extractor demo start");

var classifier = new EnhancedClassifier({
	classifierType:   SVM,
	classifierOptions: {
		C: 1.0,
	},
	featureExtractor: FeatureExtractor.CollectionOfExtractors([
	    FeatureExtractor.WordsFromText(1),
	    FeatureExtractor.WordsFromText(2),
	    //FeatureExtractor.LettersFromText(2), 
	    FeatureExtractor.LettersFromText(3),
	]),
	featureLookupTable: new FeatureExtractor.FeatureLookupTable(),
});

classifier.trainBatch([
	{input: "cheap replica watches", output: 1},
	{input: "cheap store", output: 0},
]);
//console.dir(classifier.featureLookupTable);

console.dir(classifier.classify("watches in replica"));
console.dir(classifier.classify("store for replica watches"));
console.dir(classifier.classify("store for everything you need"));


console.log("SVM with feature extractor demo end");
