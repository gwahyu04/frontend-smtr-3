function jumlahkanSemuanya(...bilangan){
    let total = 0;

    for (let bil of bilangan)
        total += bil;

    return total;
}

let hasil1 = jumlahkanSemuanya(1,2,3,4,5,6);
let hasil2 = jumlahkanSemuanya(9,8,7);

alert(hasil1); // 21
alert(hasil2); // 24
