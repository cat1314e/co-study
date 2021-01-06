// let arr = [1,0, 0, 1, 0,1,1,1]
// //
// // give_index = 5  // 给定的下标
// // var tmp_left = 0  // 左边不为0的下标
// // var tmp_right = 0  // 右边不为0的下标
// //
// // for(i=0;i<arr.length;i++){
// //     // 左边找到值不为0的下标开始找右边
// //     if(i<give_index && arr[give_index-i-1] !== 0){
// //         tmp_left = give_index-i-1
// //         i=give_index
// //     }
// //     // 右边找到值不为0的下标退出循环
// //     if(i>give_index && arr[i] !== 0){
// //         tmp_right = i
// //         break
// //     }
// // }
// // console.log(tmp_left,tmp_right)
// // console.log(arr[tmp_left],arr[tmp_right])

// f = function () {
//     return true;
// };
// g = function () {
//     return false
// };
// (function () {
//     g = function () {
//         return false
//     };
//     if (g() && [] == ![]){
//         f = function () {
//             return false
//         };
//         function g() {
//             return true
//         };
//     }
// })();
// console.log(f())

// var Obj = function (msg) {
//     this.msg = msg;
//     this.shout = function () {
//         console.log(this.msg);
//     }
//     this.waitAndShout=function () {
//         setTimeout(this.shout, 2000)
//     }
// }
// var aa = new Obj("abc")
// aa.waitAndShout();