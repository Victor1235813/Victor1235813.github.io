let number = 50;
let nums1 =[1];
const nums2 = [2]

function print() {
  let square = number * number;

  if (number < 60) {
    var largerNumber = 80;
    let anotherLargerNumber = 100;

    console.log(square);
  }

  console.log(largerNumber);
  try {
    console.log(anotherLargerNumber);
  } catch (error) {
    console.error(error);
  }
  
  nums2[0] = 4;
  console.log(nums2);
}


print();