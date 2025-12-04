function tri(numbers, order) {
    if (order === "asc") {
        return numbers.sort(function(a, b) {
            return a - b;
        });
    } else if (order === "desc") {
        return numbers.sort(function(a, b) {
            return b - a;
        });
    }
    return numbers;
}

// comment tester la fonction
let tableau1 = [5, 2, 9, 1, 7, 3];
console.log(tri(tableau1, "asc"));  // [1, 2, 3, 5, 7, 9]

let tableau2 = [5, 2, 9, 1, 7, 3];
console.log(tri(tableau2, "desc")); // [9, 7, 5, 3, 2, 1]