

document.addEventListener("DOMContentLoaded", pageLoadedFunc());


const checkBox = document.getElementById("zorluk");
 /* Select option */
 var optCK = document.createElement("option");
 optCK.innerHTML = "Çok Kolay";
 optCK.value = 80;
 checkBox.append(optCK);

var opt = document.createElement("option");
opt.innerHTML = "Kolay";
opt.value = 60;
checkBox.append(opt);

var opt1 = document.createElement("option");
opt1.innerHTML = "Orta";
opt1.value = 50;
checkBox.append(opt1);

var opt2 = document.createElement("option");
opt2.innerHTML = "Zor";
opt2.value = 30;
checkBox.append(opt2);

var opt3 = document.createElement("option");
opt3.innerHTML = "Çok Zor";
opt3.value = 20;
checkBox.append(opt3);


function pageLoadedFunc() {
    fillSudokuGrid(null, true, "sudoku-board");
}

function fillTable() {

    var sudokuDataArr = null;
    do {
        sudokuDataArr = generateSudokuData();
    }while(sudokuDataArr == null);

    fillSudokuGrid(sudokuDataArr, null, "sudoku-board");
    fillSudokuGrid(sudokuDataArr, true, "sudoku-board-solve");
}

function generateSudokuData() {
    var arr = [ ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""]];
    for(x=0; x<9; x++) {
        var availableRow = [1,2,3,4,5,6,7,8,9];
        for(y=0; y<9; y++) {

            var avaialbleNumbers = [];

            availableRow.forEach(e => avaialbleNumbers.push(e));
            
            
            for(xi=0; xi<x; xi++) {
                avaialbleNumbers = removeItemOnce(avaialbleNumbers, arr[xi][y]);
            }

            //Kare icindeki degerler
            var bloktakiDegerler = [];
            for(startX=Math.floor(x/3)*3; startX<Math.floor(x/3)*3+3; startX++) {
                for(startY=Math.floor(y/3)*3; startY<Math.floor(y/3)*3+3; startY++) {
                    if(arr[startX][startY] != "")
                        bloktakiDegerler.push(arr[startX][startY]);
                }
            }

            bloktakiDegerler.forEach(e => avaialbleNumbers=removeItemOnce(avaialbleNumbers, e));

            var randomNumber = Math.floor(Math.random() * avaialbleNumbers.length);
            arr[x][y]=avaialbleNumbers[randomNumber];
            if(arr[x][y] == undefined) {
                return null;
            }
            availableRow = removeItemOnce(availableRow, avaialbleNumbers[randomNumber]);
        }
    }

    return arr;
}

function fillSudokuGrid(sudokuDataArr, fillEmpty, gridId){
    
    var table = document.createElement("table");
    for(x=0; x<9; x++) {
        var tr = document.createElement("tr");
        for(y=0; y<9; y++) {

            var td = document.createElement("td");
            td.style.width = "75px";
            td.style.height = "75px";
            td.style.border = "1px solid";
            td.style.textAlign = "center";

            var p = document.createElement("p");
            p.style = "margin-bottom: 0px;";

            

           

            if(y==0 || y==3 || y==6) {
                td.style.borderLeft = "5px solid";
            }

            if(x==0 || x==3 || x==6) {
                td.style.borderTop = "5px solid";
            }

            if(x==8) {
                td.style.borderBottom = "5px solid";
            }
            if(y==8) {
                td.style.borderRight = "5px solid";
            }

            if(fillEmpty != true) {
                var zorlukYuzde = document.getElementById("zorluk").value;
                if((Math.floor(Math.random() * 100)+1) < zorlukYuzde) {
                    td.style.backgroundColor = "#DCDCDC";
                    p.innerHTML = sudokuDataArr[x][y];
                }
            } else {
                td.style.backgroundColor = "#DCDCDC";
                if(sudokuDataArr != null) {                
                    p.innerHTML = sudokuDataArr[x][y];
                }    
            }

            td.append(p);
            tr.append(td);
        }
        table.append(tr);
    }
    document.getElementById(gridId).innerHTML = "";
    document.getElementById(gridId).append(table);
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }