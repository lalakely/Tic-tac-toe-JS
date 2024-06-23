document.addEventListener("DOMContentLoaded", function() {
    const main = document.getElementById("main");
    const buttonNumber = 3;


    const tab = Array.from(
        {length : buttonNumber},  
        () => Array(buttonNumber).fill(null)
    );
    let counter = 0;
    
    for(let i = 0 ; i < buttonNumber ; i++){
        for (let j = 0 ; j < buttonNumber ; j++){
            
            const button = document.createElement("div");
            button.classList.add("button");

            main.appendChild(button);

            button.addEventListener("click", function(){
                counter ++;

                if (tab[i][j] === null) {
                    if(counter % 2 == 0){
                        tab[i][j] = 'x';
                        button.textContent = "x";
                        
                    }else {
                        button.textContent = "o";
                        tab[i][j] = 'o';
                        
                    }
                    if(checkWin(tab , tab[i][j])){
                        setTimeout (() => {
                            alert(`Joueur ${tab[i][j]} a gagné !!`);
                            resetGame();
                        }
                        ,100
                        );

                    }else if (counter === buttonNumber * buttonNumber){
                        setTimeout(() => {
                            alert('Égalité');
                            resetGame();
                        } , 100)
                    }
                }

                
            });
        }
    }

    function checkWin(tab, player){

        // Vérification des lignes 
        for(let i = 0 ; i < buttonNumber ; i++){
            if (tab[i].every(cell => cell === player)){
                return true;
            }
        }

        // Vérification des colonnes
        for(let j = 0 ; j < buttonNumber ; j++){
            if (tab.every(row => row[j] === player)){
                return true;
            }
        }

        // Vérification de la première diagonale
        if (tab.every((row , idx) => row[idx] === player)){
            return true;
        }
        
        // Vérification de la deuxième diagonale
        if (tab.every((row , idx) => row[buttonNumber - idx - 1] === player)){
            return true;
        }

        return false;

    }


    function resetGame(){
        tab.forEach((row, i) => row.forEach((cell, j) => tab[i][j] = null));
        document.querySelectorAll('.button').forEach(button => button.textContent = '');
        counter = 0;
    }
});