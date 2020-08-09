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


//adding eventlistener on encode button to grab the message from input
encodeBtn.addEventListener('click',function(){
    //base64 encoding of the message
    const encodedMsg = btoa(encodeMsg.value);
    const url = `${window.location}#${encodedMsg}`;
    shareLink.value = url;

    //hiding the encode container and showing the share link container
    encodeContainer.classList.add("hide");
    shareLinkContainer.classList.remove("hide");
    shareLink.select();
})

decodeBtn.addEventListener("click",function(){
    //decode the base64 message from hash
    const decodedMsg = atob(hash.replace("#",''));
    decodeMsg.value = decodedMsg;  
})