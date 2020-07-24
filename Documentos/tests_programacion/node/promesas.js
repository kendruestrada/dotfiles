//promesas y los scope de las variables externas
//================================================
function test1(){
    let x = 1;
    let resultado = new Promise((resolver,rechazar)=> 
            {
                setTimeout( () =>{
                    console.log("Voy a ejecutar la promesa");
                    if( x == 1){
                        resolver(1);
                    }else{
                        resolver(2);
                    }
                },1000)

            }
        );
    x = 2;
    console.log("Le cambie el valor a x");
    return resultado;    
}
p = test1();
p.then( (data) => console.log(data) );

//conclusion :
//===========
//si se accede a una variable externa dentro de la promesa
//esa variable tendra el valor mas actualizado. 

//promesas encadenamiento y return
//=================================

let resEncadenamientoConReturn = p.then( (data) => { return data} );
let resEncadenamientoConReturn2 = p.then( () => { return 5} );
let resEncadenamientoConReturn3 = p.then( () => { return 5} ).then( () => { return 8} );
console.log(resEncadenamientoConReturn);
//resEncadenamientoConReturn es un objeto del tipo promesa

Promise.all([resEncadenamientoConReturn]).then(() => 
{
    console.log(resEncadenamientoConReturn); //Promise { 2 }
    console.log(resEncadenamientoConReturn2); //Promise { 5 }
    console.log(resEncadenamientoConReturn3); //Promise { 8 }
    console.log(p);//Promise { 2 }

}
);
//conclusion :
//===========
// lo que recibe el then es la funcion resolver. 
// por lo tanto el return es el valor con el que se resuelve 
//la promesa devuelta por el metodo them

//acceso al valor de una promesa.
//=================================

// solo se puede accreder con el metodo then y con await

async function  test2(){
     let p1 = test1();
     valor = await p1;
     console.log("valor en test2:" + valor);

} 

test2();

//promesas que retornan otras promesas en el ecadenamiento.
//========================================================

async function  test3(){
    let p2 = test1();
    let p3 = test1();
    //se ejecutan ambas promesas i a valor se le asigna el resultado de p3
    valor = await p2.then(() => {return p3});;
    console.log("valor en test3:" + valor);

} 
test3();