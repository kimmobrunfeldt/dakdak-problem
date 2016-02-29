var _  = require('lodash');
var G = require('generatorics');

function main() {
  // Select all existing image IDs
  //   SELECT id from images;
  var images = [1, 2, 3, 4, 5];

  // Get all ratings made by user 1
  //   SELECT userId, firstImage, secondImage FROM ratings where userId=1;
  var ratings = [
    {firstImage: 1, secondImage: 2},
    {firstImage: 3, secondImage: 4},
    // One with ratings other way around, it still works
    {firstImage: 5, secondImage: 4}
  ];

  for (var pair of getPairs(ratings, images, ratings)) {
    console.log('Unrated pair:', pair);
  }
}

// Get N image pairs which user has not rated
function* getPairs(userRatings, images, ratings) {
  for (var tuple of G.combination(images, 2)) {
    if (!hasUserRated(userRatings, tuple[0], tuple[1])) {
      yield tuple;
    }
  }
}

function hasUserRated(userRatings, image1, image2) {
  var index = _.findIndex(userRatings, r => {
    // Test both ways
    var orderA = image1 === r.firstImage && image2 === r.secondImage;
    var orderB = image1 === r.secondImage && image2 === r.firstImage;
    return orderA || orderB;
  });

  return index !== -1;
}

main();
