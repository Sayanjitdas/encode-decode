const { hash } = window.location;

const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');
const encodeMsg = document.getElementById('encode-msg');
const decodeMsg = document.getElementById('decode-msg');
const encodeContainer = document.getElementById('encode-msg-container');
const decodeContainer = document.getElementById('decode-msg-container');
const shareLinkContainer = document.getElementById('share-link-container');
const shareLink = document.getElementById('share-link');

//rendering content according to hash value 
if(hash !== ""){
    //hide the encode message container and show decode container
    encodeContainer.classList.add('hide');
    decodeContainer.classList.remove('hide');

    //show the encrypted message (hash) on input section decode-msg
    decodeMsg.value = hash.replace("#",'');
}

//algorithm of encryption and decryption
function algoEncodeDecode(hashKey){
        //summing up the character to get the number
        let summation = 0;
        for(let index in hashKey){
            summation += hashKey.charCodeAt(index);
        }
        if(summation > 127){
            summation = Math.round(summation/127);
        }
    return summation    
}


function encryption(str,hashKey){

    //returning encoded string
    return btoa(str+String.fromCharCode(algoEncodeDecode(hashKey)));
}

function decryption(str,hashKey){

    //returning decryption string
    return atob(str+String.fromCharCode(algoEncodeDecode(hashKey)));

}

//adding eventlistener on encode button to grab the message from input
encodeBtn.addEventListener('click',function(){
    //base64 encoding of the message   
    const hashKeyVal = prompt("Enter 5 random characters");
    const encodedMsg = encryption(encodeMsg.value,hashKeyVal);
    const url = `${window.location}#${encodedMsg}`;
    shareLink.value = url;

    //hiding the encode container and showing the share link container
    encodeContainer.classList.add("hide");
    shareLinkContainer.classList.remove("hide");
    shareLink.select();
})

decodeBtn.addEventListener("click",function(){

    //get the hash key from prompt
    const hashKey = prompt("Enter the hash key");
    if(hashKey === null || hashKey === ""){
        window.location.reload();
    }else{
        
        //decode the base64 message from hash
        let decodedMsg = atob(hash.replace("#",''));  
        decodeMsg.value = decodedMsg.slice(0,decodedMsg.length - 1);
    }  
})